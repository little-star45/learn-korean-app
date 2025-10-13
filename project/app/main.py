from flask import Flask
import dotenv
import os

import flask_migrate as f_mig
from .routes.routes_utils import bp as utils_bp
from .routes.routes_users import bp as users_bp
from .routes.routes_languages import bp as languages_bp
from .routes.routes_auth import bp as auth_bp
# from .routes.routes_words import bp as words_bp
from .routes.routes_translations import bp as translations_bp

from .extensions import db, migrate, api

dotenv.load_dotenv()

def create_app():
    #u mnie __name__ bedize rowne app.main - przy uruchamianiu z run.py
    app = Flask(__name__)

    # Konfiguracja PostgreSQL
    app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{os.getenv("DB_USER")}:{os.getenv("DB_PASSWORD")}@{os.getenv("DB_HOST")}:{os.getenv("DB_PORT")}/{os.getenv("DB_NAME")}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Flask-Smorest konfiguracja (dla dokumentacji OpenAPI / Swagger)
    app.config["API_TITLE"] = "Korean App API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/docs"
    app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"

    #konfiguracja widocznosci bledow
    app.config["DEBUG"] = False
    app.config["PROPAGATE_EXCEPTIONS"] = True  # lub użyj własnego error handlera

    db.init_app(app)
    migrate.init_app(app, db)
    api.init_app(app)

    #endpoints
    api.register_blueprint(utils_bp)
    api.register_blueprint(users_bp)
    api.register_blueprint(auth_bp)
    api.register_blueprint(languages_bp)
    api.register_blueprint(translations_bp)

    return app