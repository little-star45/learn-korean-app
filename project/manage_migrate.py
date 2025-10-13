from app.main import create_app
from app.extensions import db

app = create_app()

# (venv) PS C:\Users\doman\Desktop\Projekty_prywatnie\korean_app\project> $env:FLASK_APP = "manage_migrate.py"
# (venv) PS C:\Users\doman\Desktop\Projekty_prywatnie\korean_app\project> flask db migrate -m "change password_hash length"