from flask_smorest import Blueprint, abort
from marshmallow import Schema, fields
from flask.views import MethodView
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from flask import jsonify
from ..models import Language
from ..extensions import db
from ..schemas import LanguageInputSchema, LanguageOutputSchema

bp = Blueprint("languages", __name__, url_prefix="/languages", description="Endpoints related to languages")


@bp.route('/')
class LanguageList(MethodView): #klasa do obslugi /languages
    @bp.response(200, LanguageOutputSchema(many=True)) #many=True serializacja/deserializacja wielu obiektu
    def get(self):
        """Pobiera wszystkie języki"""
        languages = Language.query.all()
        return languages
    
    @bp.arguments(LanguageInputSchema)
    @bp.response(201, LanguageOutputSchema)
    def post(self, language_data):
        """Dodaje nowy obsługiwany jezyk"""
        new_language = Language(**language_data)
        db.session.add(new_language)
        try:
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()  # cofamy zmiany w sesji
            return jsonify({"error": "Język o tym kodzie już istnieje"}), 400
        return new_language
    
@bp.route("/<string:code>")
class LanguageDetail(MethodView):
    @bp.response(200, LanguageOutputSchema)
    def get(self, code):
        """Pobiera jeden język po jego kodzie"""
        language = Language.query.filter_by(code=code).first()
        if not language:
            abort(404, message = "Language not found")
        return language

    def delete(self, code):
        """Usuwa obsługiwany jezyk"""
        language = Language.query.filter_by(code=code).first()

        if not language:
            return abort(404, message = "Language not found")
        
        try:
            db.session.delete(language)
            db.session.commit()
        except SQLAlchemyError:
            db.session.rollback()  # cofamy zmiany w sesji
            abort(500, message = "Nie udało się usunąć języka")
        return {"message": f"Language '{language.name}' deleted successfully"}