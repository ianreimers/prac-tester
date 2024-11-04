from flask import current_app
from prac_tester.db import get_db
from prac_tester.repositories import FileRepository
from werkzeug.datastructures import FileStorage
import os
import re

class FileService:
    def __init__(self):
        self.file_repo = FileRepository()

    def file_to_db(self, file: FileStorage):
        if file.filename is None:
            raise RuntimeError("No file name was found in the received file")

        db = get_db()
        filename = file.filename

        # check filename is allowed
        if not self._allowed_file(filename):
            raise RuntimeError(f"The name {filename} is not allowed")

        filepath = os.path.join(current_app.config['UPLOAD_PATH'], filename)
        # TODO: save with safe filename using the secure function
        file.save(filepath)

        # extract saved file contents for processing
        with open(filepath, 'r') as f:
            content = f.read()

        content_dict = self._convert_markdown_to_dict(content)

        # print(db.execute('SELECT * FROM question').fetchall()[0][1])
        # return "File was submitted"

        # remove the file after processing
        try:
            os.remove(filepath)
        except OSError as e:
            print(f"Erro removing file: {e}")

        try:
            self.file_repo.save_to_db(content_dict)
        except db.Error as e:
            print(f"Error adding dict to db: {e}")
            return f"Error adding dict to db"

    def _allowed_file(self, filename: str):
        return '.' in filename and \
            filename.rsplit('.', 1)[1].lower() in current_app.config["ALLOWED_EXTENSIONS"]

    def _convert_markdown_to_dict(self, markdown_text: str):
        lines = markdown_text.splitlines()
        content_dict = {}

        group_name: str | None = None
        question_text: str | None = None
        choices = dict()
        answer = None


        for line in lines:
            # check for group/chapter/section header
            if line.startswith('# '):

                # next group found
                if group_name != None:
                    self._add_content_to_dict(content_dict, group_name, question_text, choices, answer)
                    group_name = None
                    question_text = None
                    choices = dict()
                    answer = None

                group_name = line[2:].strip()
                continue

            # check for a question
            question_match = re.match(r'^\d+\.', line)
            if line.startswith('## ') or question_match:

                if question_text != None:
                    self._add_content_to_dict(content_dict, group_name, question_text, choices, answer)
                    question_text = None
                    choices = dict()
                    answer = None

                question_text = line[3:].strip()
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
            self._add_content_to_dict(content_dict, group_name, question_text, choices, answer)

        return content_dict


    def _add_content_to_dict(self, content_dict: dict, group_name, question_text, choices: dict, answer):
        curr_dict = {
            "question": question_text,
            "choices": choices,
            "answer": answer
        }

        if group_name in content_dict:
            content_dict[group_name].append(curr_dict)
        else:
            content_dict[group_name] = [curr_dict]

        return


