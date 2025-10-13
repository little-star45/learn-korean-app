from flask_smorest import Blueprint
from marshmallow import Schema, fields
from flask.views import MethodView

bp = Blueprint("utils", __name__, url_prefix="/utils", description="Endpoints for testing and utils")
users = []

class MessageSchema(Schema):
    message = fields.String()

@bp.route('/hello')
class HelloWorld(MethodView):
    @bp.response(200, MessageSchema)
    def get(self):
        """Returns a hello world message"""
        return {"message": "Hello, world!"}