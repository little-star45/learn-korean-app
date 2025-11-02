from flask_smorest import Blueprint, abort
from flask.views import MethodView
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.sql.expression import func

from flask import jsonify
from ..models import Language, Word, Translation
from ..extensions import db
from ..schemas import TranslationCreateSchema, TranslationOutputSchema, TranslationQueryAllSchema, TranslationQueryRandomSchema


bp = Blueprint("translations", __name__, url_prefix="/translations", description="Endpoints related to translations")

@bp.route('/')
class TranslationsList(MethodView): #klasa do obslugi /translations
    @bp.arguments(TranslationQueryAllSchema, location="query")
    @bp.response(200, TranslationOutputSchema(many=True)) #many=True serializacja/deserializacja wielu obiektu
    def get(self, args):
        """Pobiera wszystkie pary słów dla danego użytkownika- direction query, opcjonalnie filtrowane po direction_code"""
        query = Translation.query.filter_by(user_id=args['user_id'])
        if 'direction_code' in args:
            query = query.filter_by(direction_code=args['direction_code'])
        return query.all()
    
    @bp.arguments(TranslationCreateSchema, location='json')
    @bp.response(201, TranslationOutputSchema)
    def post(self, data):
        """Dodaje nowe tłumaczenie"""

        #pobieramy id jezyka
        from_lang = Language.query.filter_by(code=data['from_word']['language_code']).first()
        to_lang = Language.query.filter_by(code=data['to_word']['language_code']).first()

        #sprawdzamy, czy uzytkownik ma juz takie slowa w bazie
        from_word = Word.query.filter_by(text=data['from_word']['text'],language_id=from_lang.id, user_id=data['user_id']).first()
        to_word = Word.query.filter_by(text=data['to_word']['text'],language_id=to_lang.id, user_id=data['user_id']).first()

        #sprawdzamy, czy taka translacja jest juz w bazie
        if from_word and to_word:
            if Translation.query.filter_by(user_id=data['user_id'], from_word_id=from_word.id, to_word_id=to_word.id).first():
                return jsonify({"error": "Translacja tych słów już istnieje"}), 400
        
        #jak nie ma to tworzymy slowo zrodlowe
        if not from_word:
            from_word = Word(
                text=data['from_word']['text'],
                romanization=data['from_word'].get('romanization'),
                language_id=from_lang.id,
                is_public=data.get('is_public', False),
                user_id=data["user_id"]
            )
            db.session.add(from_word)
            db.session.flush() #przypisujemy id ale nie commit

        #jak nie ma to tworzymy slowo przetlumaczone
        if not to_word:
            to_word = Word(
                text=data['to_word']['text'],
                romanization=data['to_word'].get('romanization'),
                language_id=to_lang.id,
                is_public=data.get('is_public', False),
                user_id=data["user_id"]
            )
            db.session.add(to_word)
            db.session.flush() #przypisujemy id ale nie commit

        direction_code = from_lang.code+'_'+to_lang.code

        translation = Translation(
            from_word_id=from_word.id,
            to_word_id=to_word.id,
            direction_code=direction_code,
            user_id=data["user_id"],
            is_public=data.get('is_public', False)
        )

        translation_opposite = Translation(
            from_word_id=to_word.id,
            to_word_id=from_word.id,
            direction_code=('_').join(direction_code.split('_')[::-1]),
            user_id=data["user_id"],
            is_public=data.get('is_public', False)
        )

        db.session.add(translation)
        db.session.add(translation_opposite)
        
        try:
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()  # cofamy zmiany w sesji
            return jsonify({"error": "Język o tym kodzie już istnieje"}), 400
        return {"message": "Translation added successfully"}

@bp.route("/random")
class RandomTranslation(MethodView):
    @bp.arguments(TranslationQueryRandomSchema, location="query")
    @bp.response(200, TranslationOutputSchema)
    def get(self, query_args):
        """Zwraca jedno losowe słowo dla użytkownika w danym kierunku"""
        query_translation = Translation.query.filter_by(user_id=query_args['user_id'], direction_code=query_args['direction_code'])
        random_translation = query_translation.order_by(func.random()).first()
        if not random_translation:
            abort(404, message="No words found for this user/direction")
        return random_translation

@bp.route("/random-multiple")
class RandomTranslations(MethodView):
    @bp.arguments(TranslationQueryRandomSchema, location="query")  # user_id, direction_code, limit
    @bp.response(200, TranslationOutputSchema(many=True))
    def get(self, query_args):
        """Zwraca losową listę słów dla użytkownika w danym kierunku"""
        return 