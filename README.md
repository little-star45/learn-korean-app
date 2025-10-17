# 🇰🇷 Korean App — Fullstack Vocabulary Trainer

A fullstack web application for learning and managing Korean vocabulary.

It allows users to add, translate, and practice words between different languages — starting with Polish ↔ Korean and English ↔ Korean directions.

## ✨ Features

* 🗣️ **Add new words** in multiple languages with automatic handling of duplicates
* 🔁 **Create translations** between existing or new words
* 🎲 **Get random words** for quick learning sessions
* 👤 **User system** with password hashing (secure authentication ready for JWT)
* 🌐 **API** built with Flask and SQLAlchemy
* 💅 **Frontend** built with React + TailwindCSS for a clean, minimal UI
* ⚙️ **CORS integration** between backend and frontend for seamless communication

## 🧱 Tech Stack

**Backend**

* Python 3 / Flask
* Flask-Smorest (for REST API structure + schema validation)
* SQLAlchemy + Alembic (ORM + migrations)
* PostgreSQL (database)

**Frontend**

* React (Vite setup)
* TailwindCSS
* Fetch API (communication with Flask backend)

## 🧩 Example API Endpoints

| Method   | Endpoint                 | Description                                                 |
| -------- | ------------------------ | ----------------------------------------------------------- |
| `GET`  | `/languages/`          | Fetch all available languages                               |
| `POST` | `/translations/`       | Add a new translation (creates missing words automatically) |
| `GET`  | `/translations/random` | Get a random translation for a user & direction             |
| `POST` | `/auth/token`          | Simple login (hashed password check)                        |

## 🚀 How to Run

1. **Backend**
   ```bash
   cd project 
   flask run 
   ```
2. **Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

---

💡 **Future ideas:**

* JWT-based authentication
* Progress tracking (mark words as known/unknown)
* Korean virtual keyboard integration (`hangul-js` / `es-hangul`)
* Practice mode with spaced repetition
