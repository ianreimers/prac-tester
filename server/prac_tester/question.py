import functools
from os import sep
import pprint
import json

from flask import (
    Blueprint, g, jsonify, redirect, render_template, request, session, url_for
)
from prac_tester.db import get_db
from prac_tester.service import map_questions_with_choices

bp = Blueprint('question', __name__, url_prefix='/api/question')

@bp.route('/')
def get_all_questions_with_choices():
    questions = map_questions_with_choices()
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


