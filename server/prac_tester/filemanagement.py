from flask import Blueprint, request, current_app
from sqlite3 import Connection
from prac_tester.db import get_db
import os
import pprint
import re

bp = Blueprint('filemanagement', __name__, url_prefix='/api')

@bp.route('/upload', methods=['POST'])
def upload_file():
    db = get_db()

    f = request.files['file']

    if f is None:
        return "No file was found"
    if f.filename is None:
        return "No file name was found"

    filename = f.filename

    # invalid filename so return early
    if not allowed_file(filename):
        print(f"{filename} was not allowed")
        return f"The name {filename} is not allowed"

    filepath = os.path.join(current_app.config['UPLOAD_PATH'], filename)
    # TODO: save with safe filename using the secure function
    f.save(filepath)

    # extract contents for process
    with open(filepath, 'r') as f:
        content = f.read()

    content_dict = convert_markdown_to_dict(content)

    # print(db.execute('SELECT * FROM question').fetchall()[0][1])
    # return "File was submitted"

    # remove the file after processing
    try:
        os.remove(filepath)
    except OSError as e:
        print(f"Erro removing file: {e}")

    try:
        save_to_db(content_dict, db)
    except db.Error as e:
        print(f"Error adding dict to db: {e}")
        return f"Error adding dict to db"

    return "File was submitted"


def save_to_db(content_dict: dict, db: Connection):
    cursor = db.cursor()

    for group_name, question_arr in content_dict.items():
        # add the question group first to get the id
        cursor.execute('INSERT INTO question_group (name) VALUES (?)', (group_name,))
        qg_id = cursor.lastrowid

        if qg_id is None:
            print("Question Group ID was None")

        for question_dict in question_arr:
            question = question_dict['question']
            choices: dict = question_dict['choices']
            answer = question_dict['answer']

            # add the question and get the question id for choices
            cursor.execute('INSERT INTO question (question, question_group_id) VALUES (?, ?)', (question, qg_id))
            question_id = cursor.lastrowid

            if question_id is None:
                print("Question ID was None")

            # add each choice
            for symbol, description in choices.items():
                cursor.execute('INSERT INTO choice (description, is_correct, question_id) VALUES (?, ?, ?)', (description, symbol == answer, question_id))

    db.commit()
    return


def convert_markdown_to_dict(markdown_text: str):
    lines = markdown_text.splitlines()
    content_dict = {}

    group_name: str | None = None
    question: str | None = None
    choices = dict()
    answer = None


    for line in lines:
        # check for group/chapter/section header
        if line.startswith('# '):

            # next group found
            if group_name != None:
                add_content_to_dict(content_dict, group_name, question, choices, answer)
                group_name = None
                question = None
                choices = dict()
                answer = None

            group_name = line[2:].strip()
            continue

        # check for a question
        question_match = re.match(r'^\d+\.', line)
        if line.startswith('## ') or question_match:

            if question != None:
                add_content_to_dict(content_dict, group_name, question, choices, answer)
                question = None
                choices = dict()
                answer = None

            question = line[3:].strip()
            continue

        # check for choices
        choice_match = re.match(r'^(-|\*)\s', line)
        if choice_match:
            letter_or_num = line[2:3]
            potential_answer = line[4:].strip()
            choices[letter_or_num] = potential_answer
            continue

        # check for answer
        answer_match = re.match(r'^(\*\*Answer:*\*\*)|(Answer:)', line)
        if answer_match:
            answer = line.split(':')[1].strip()


    if group_name is not None:
        add_content_to_dict(content_dict, group_name, question, choices, answer)

    return content_dict

def add_content_to_dict(content_dict: dict, group_name, question, choices: dict, answer):
    curr_dict = {
        "question": question,
        "choices": choices,
        "answer": answer
    }

    if group_name in content_dict:
        content_dict[group_name].append(curr_dict)
    else:
        content_dict[group_name] = [curr_dict]

    return



def allowed_file(filename: str):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in current_app.config["ALLOWED_EXTENSIONS"]


