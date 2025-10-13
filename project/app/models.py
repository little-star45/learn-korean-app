from datetime import datetime
from .extensions import db
from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Enum as SQLEnum
from .enums import DirectionEnum
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    id: Column[Integer] = db.Column(db.Integer, primary_key=True)
    username: Column[String] = db.Column(db.String(80), unique=True, nullable=False)
    email: Column[String] =  db.Column(db.String(100), unique=True, nullable=False)
    password_hash: Column[String] = db.Column(db.String(255), unique=True, nullable=False)
    created_at: Column[DateTime] = db.Column(db.DateTime, default=datetime.now, nullable=False)

    def set_password(self, password: str):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password: str) -> bool:
        return check_password_hash(self.password_hash, password)

class Language(db.Model):
    __tablename__ = 'languages'
    id: Column[Integer] = db.Column(db.Integer, primary_key=True)
    code: Column[String] = db.Column(db.String(10), unique=True, nullable=False)
    name: Column[String] =  db.Column(db.String(50), unique=True, nullable=False)

    language = db.relationship('Language', backref='words')

class Word(db.Model):
    __tablename__ = 'words'
    id: Column[Integer] = db.Column(db.Integer, primary_key=True)
    language_id: Column[Integer] = db.Column(ForeignKey('languages.id'), unique=False, nullable=False)
    user_id: Column[Integer] =  db.Column(ForeignKey('users.id') , unique=False, nullable=False)
    text: Column[String] = db.Column(db.String(1000), unique=False, nullable=False)
    romanization: Column[String] =  db.Column(db.String(1000), unique=False, nullable=False)
    is_public: Column[Boolean] =  db.Column(db.Boolean, default=False, unique=False, nullable=False)
    created_at: Column[DateTime] = db.Column(db.DateTime, default=datetime.now, nullable=False)

class Translation(db.Model):
    __tablename__ = 'translations'
    id: Column[Integer] = db.Column(db.Integer, primary_key=True)
    from_word_id: Column[Integer] = db.Column(ForeignKey('words.id'), unique=False, nullable=False)
    to_word_id: Column[Integer] = db.Column(ForeignKey('words.id'), unique=False, nullable=False)
    direction_code: Column[SQLEnum] = db.Column(db.Enum(DirectionEnum, name='direction_enum'), unique=False, nullable=False)
    user_id: Column[Integer] =  db.Column(ForeignKey('users.id'), unique=False, nullable=False)
    is_public: Column[Boolean] =  db.Column(db.Boolean, default=False, unique=False, nullable=False)
    created_at: Column[DateTime] = db.Column(db.DateTime, default=datetime.now, nullable=False)

    from_word = db.relationship('Word', foreign_keys=[from_word_id])
    to_word = db.relationship('Word', foreign_keys=[to_word_id])

    
    