from flask import Blueprint
import requests, json, re, sys
import dotenv
import os
from flask_smorest import Blueprint
from flask.views import MethodView
from ..schemas import SpellcheckInputSchema, SpellcheckOutputSchema


dotenv.load_dotenv()
bp = Blueprint("spellcheck", __name__, url_prefix="/spellcheck", description="Endpoints send query to Ollama LLM models")


def check_korean_jamo(word: str):
    prompt = f"""
    You are a Korean spelling checker. Focus only on jamo composition of each syllable.
    Check if the word doesn't has small letters mistakes. If provided word with mistakes fit to some other word please return it in suggestion and return  valid as false.
    - If the word is full correct-word must exist in korean dictionary, return JSON: {{"isValid": true, "suggestion": "..."}}
    - If the word has a typo, return JSON: {{"isValid": false, "suggestion": "<corrected word>"}}
    Return ONLY JSON, nothing else.

    Word: "{word}"
    """

    try:
        response = requests.post(
            os.getenv("OLLAMA_URL")+'/api/generate',
            json={"model": os.getenv("OLLAMA_MODEL"), "prompt": prompt}
        )
        raw_lines = response.text.splitlines()
        # sklej wszystkie response po kolei
        response_text = ''.join(json.loads(line).get("response","") for line in raw_lines if line.strip())

        print("Full response:", response_text, file=sys.stderr, flush=True)

        # parsujemy JSON z odpowiedzi modelu
        try:
            result = json.loads(response_text)
        except json.JSONDecodeError:
            # wyciągamy JSON ręcznie jeśli coś się nie uda
            match = re.search(r"{.*}", response_text, re.DOTALL)
            if match:
                result = json.loads(match.group(0))
            else:
                result = {"isValid": False, "suggestion": word, "error": "Invalid JSON from model"}

        return result
    except Exception as e:
        return {"isValid": False, "suggestion": word, "error": str(e)}
        
@bp.route("/")
class SpellcheckWord(MethodView):
    @bp.arguments(SpellcheckInputSchema)
    @bp.response(200, SpellcheckOutputSchema)
    def post(self, args):
        word = args["word"]
        language_code = args["language_code"]

        if language_code == "ko":
            result = check_korean_jamo(word)
        else:
            result = {"isValid": True, "suggestion": word}

        return result