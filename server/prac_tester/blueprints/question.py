from flask import ( Blueprint, request)
from prac_tester.db import get_db
from prac_tester.services import QuestionService

bp = Blueprint('question', __name__, url_prefix='/api/question')

question_service = QuestionService()

@bp.route('/')
def get_all_questions_with_choices():
    questions = question_service.map_questions_with_choices()
    return questions


@bp.route('/', methods=['POST'])
def create_question():
    db = get_db()
    data = request.json

    if data is None:
        return "No json was received"

    answer = data['answer']
    explanation = data['explanation']
    question_id = data['questionId']

    try:
        db.execute(
            'INSERT INTO question VALUES (?, ?, ?)',
            (answer, explanation, question_id)
        )
    except db.Error:
        return "Error inserting question"

    return "Successfully inserted question"


