FROM python:3.11-slim

# Włącz tryb nieinteraktywny i ustaw folder roboczy
WORKDIR /app

# Skopiuj plik zależności i zainstaluj
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Zainstaluj netcat
RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

# Skopiuj całą resztę kodu backendu
COPY . .

# Flask uruchomi się na porcie 5000
EXPOSE 5000

# Domyślne polecenie (run.py jak w Twoim kodzie)
CMD ["python", "run.py"]
