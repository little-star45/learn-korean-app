from marshmallow import Schema, fields, validate
from .enums import DirectionEnum

# ------------------------
# Schematy dla API
# ------------------------
#dump_only - pole tylko do wyswietlania
#load_only - pole tylko do zapisu
#validate.OneOf([...]) – zapewnia, że enum ma poprawną wartość.

class UserCreateSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True, validate=validate.Length(min=1, max=80))
    email = fields.Email(required=True, validate=validate.Length(max=100))
    password_hash = fields.Str(load_only=True, required=True, validate=validate.Length(max=100))
    created_at = fields.DateTime(dump_only=True)

class UserOutputSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str()
    email = fields.Email()
    created_at = fields.DateTime()

# Schemat danych wejściowych (walidacja JSON)
class LanguageInputSchema(Schema):
    code = fields.String(required=True) #, description="Language code, np. 'ko' lub 'en'"
    name = fields.String(required=True) #, description="Language name, np. 'Korean'"

class LoginSchema(Schema):
    username = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)

class TokenSchema(Schema):
    access_token = fields.Str()

# Schemat danych wyjściowych
class LanguageOutputSchema(Schema):
    id = fields.Integer()
    code = fields.String()
    name = fields.String()

class WordSchema(Schema):
    id = fields.Int(dump_only=True)
    language_id = fields.Int(required=True)
    user_id = fields.Int(required=True)
    text = fields.Str(required=True, validate=validate.Length(max=1000))
    romanization = fields.Str(required=True, validate=validate.Length(max=1000))
    is_public = fields.Bool(load_default=False)
    created_at = fields.DateTime(dump_only=True)

class WordInputSchema(Schema):
    text = fields.Str(required=True)
    romanization = fields.Str(required=False)
    language_code = fields.Str(required=True)

class WordOutputSchema(Schema):
    id = fields.Int()
    text = fields.Str()
    romanization = fields.Str()
    language_code = fields.Str(attribute="language.code")

class TranslationCreateSchema(Schema):
    from_word = fields.Nested(WordInputSchema, required=True)
    to_word = fields.Nested(WordInputSchema, required=True)
    is_public = fields.Bool(load_default=False)
    user_id = fields.Int(required=True)

class TranslationOutputSchema(Schema):
    id = fields.Int(dump_only=True)
    from_word_id = fields.Int(required=True)
    to_word_id = fields.Int(required=True)
    from_word = fields.Nested(WordOutputSchema)
    to_word = fields.Nested(WordOutputSchema)
    direction_code = fields.Str(required=True, validate=validate.OneOf([e.value for e in DirectionEnum]))
    created_at = fields.DateTime(dump_only=True)

class TranslationQueryAllSchema(Schema):
    user_id = fields.Int(required=True)
    direction_code = fields.Str(
        required=False,
        validate=validate.OneOf([e.value for e in DirectionEnum])
    )

class TranslationQueryRandomSchema(Schema):
    user_id = fields.Int(required=True)
    direction_code = fields.Str(
        required=True,
        validate=validate.OneOf([e.value for e in DirectionEnum])
    )
    limit = fields.Int(load_default=1)

class SpellcheckInputSchema(Schema):
    word = fields.Str(required=True)
    language_code = fields.Str(required=True)

class SpellcheckOutputSchema(Schema):
    isValid = fields.Bool(required=True)
    suggestion = fields.Str(required=True)
    error = fields.Str(required=False)