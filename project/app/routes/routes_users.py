from flask_smorest import Blueprint, abort
from flask.views import MethodView
from ..schemas import UserCreateSchema, UserOutputSchema
from ..extensions import db
from ..models import User
from sqlalchemy.exc import IntegrityError

bp = Blueprint("users", __name__, url_prefix="/users", description="User endpoints")

# Rejestracja
@bp.route("/")
class UserList(MethodView):

    @bp.arguments(UserCreateSchema, location="json")
    @bp.response(201, UserOutputSchema)
    def post(self, user_data):
        """Register a new user"""
        # user_data contains username, email, password (password is load_only)
        password = user_data.pop("password_hash")
        user = User(**user_data)
        user.set_password(password)
        db.session.add(user)
        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            abort(400, message=f"User with this username:{user.username} or email:{user.email} already exists")
        return user