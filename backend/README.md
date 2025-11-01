### **Oddzielenie logiki aplikacji od punktu startowego**

* W folderze `app/` trzymasz całą logikę aplikacji:
  * konfigurację Flaska,
  * modele bazodanowe,
  * blueprinty, widoki itp.
* `run.py` jest tylko **entrypointem** – uruchamia aplikację

project/
 ├─ app/
 │   ├─ main.py      # fabryka aplikacji, konfiguracja Flask, routing; create_app, db, migrate
 │   └─ models.py    # definicje modeli SQLAlchemy

│   └─ routes.py    # endpointy
 └─ run.py           # punkt startowy aplikacji


extensions.py - trzymamy tam wszystkie rozszerzenia ktore sa inicjalizaowane globalnie

init migrations:

cmd /C "set FLASK_APP=project.app.main:create_app && flask db init"

* To **jednorazowy sposób ustawienia zmiennej środowiskowej** i wywołania komendy w jednym kroku.
* `set FLASK_APP=project.app.main:create_app` → mówi Flaskowi, gdzie jest Twoja aplikacja i fabryka `create_app()`.
* `&& flask db init` → od razu uruchamia komendę `flask db init`.
* `cmd /C` → uruchamia to w podkomendzie Windows CMD, a nie w PowerShell.
* **folder `migrations/` został utworzony** , a Flask-Migrate jest poprawnie podpięty. Teraz kolejne kroki są proste.

flask db init           # tylko raz, jeśli jeszcze nie masz folderu migrations
flask db migrate -m "Initial migration"   # tworzy nową migrację
flask db upgrade        # stosuje migrację w bazie

## Jak to naprawić w PowerShell

1️⃣ Ustaw zmienną środowiskową dla tej sesji:

$env:FLASK_APP = "project.app.main:create_app"

* `project.app.main` → moduł `main.py` w folderze `project/app/`
* `create_app` → funkcja fabrykująca aplikację

2️⃣ (Opcjonalnie) sprawdź, czy Flask ją widzi:

flask --app project.app.main:create_app run

* Albo, jeśli zmienna środowiskowa jest już ustawiona:
  flask run

3️⃣ Teraz możesz używać  **Flask-Migrate** :

flask db migrate -m "Initial migration"
flask db upgrade

---

### **Marshmallow**

> **Do czego służy:** serializacja, deserializacja i walidacja danych.

#### 🔹 Czyli:

* **Waliduje dane wejściowe** (np. z JSON w żądaniu POST).
* **Konwertuje obiekty Pythona ↔ JSON** (czyli dane dla API).
* Używamy go do tworzenia tzw. **schemas** (`UserSchema`, `WordSchema`, itd.).

#### 🧠 Przykład:

Jeśli użytkownik wyśle:

<pre class="overflow-visible!" data-start="506" data-end="560"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-json"><span><span>{</span><span></span><span>"username"</span><span>:</span><span></span><span>"Dom"</span><span>,</span><span></span><span>"email"</span><span>:</span><span></span><span>"dom@x.pl"</span><span></span><span>}</span><span>
</span></span></code></div></div></pre>

to Marshmallow:

* sprawdzi, czy `username` i `email` są wymagane,
* zamieni JSON → obiekt Pythona,
* przy wysyłaniu odpowiedzi zrobi odwrotnie: obiekt → JSON.

---

### ⚙️ **Flask-Smorest**

> **Rozszerzenie dla Flask** , które łączy:

* **Marshmallow** (walidacja danych),
* **OpenAPI/Swagger** (automatyczna dokumentacja),
* **Blueprinty** (czyste, modułowe API).

#### 🔹 Czyli:

Flask-Smorest sprawia, że możesz:

* łatwo tworzyć endpointy z dokumentacją i walidacją w jednym miejscu,
* mieć automatyczny  **Swagger UI (/docs)** ,
* nie pisać osobno dokumentacji API — generuje się sama z kodu.
