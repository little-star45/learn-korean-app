from flask_smorest import Blueprint, abort
from flask.views import MethodView
from marshmallow import Schema, fields
from ..models import User  # Twój model User
from ..schemas import LoginSchema, TokenSchema

bp = Blueprint("auth", __name__, url_prefix="/auth", description="Auth endpoints")

@bp.route("/token")
class TokenResource(MethodView):
    @bp.arguments(LoginSchema, location="json")
    @bp.response(200, TokenSchema)
    def post(self, credentials):
        """Simple login endpoint returning a fake token (replace with JWT)"""
        username = credentials["username"]
        password = credentials["password"]

        user = User.query.filter_by(username=username).first()
        if not user or not user.check_password(password):
            abort(401, message="Invalid credentials")

        fake_token = f"token-for-{user.id}"
        return {"access_token": fake_token}
