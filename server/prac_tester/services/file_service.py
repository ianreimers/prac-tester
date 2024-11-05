from typing import Dict
from flask import current_app
from prac_tester.db import get_db
from prac_tester.types import Choice, Question, Collection, ContentDict
#from prac_tester.models.schema import ParseChoice, ParseCollection, ParseGroup, ParseQuestion
from prac_tester.repositories import FileRepository
from werkzeug.datastructures import FileStorage
import pprint
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
        # pprint.pp(content_dict, indent=2, width=160)
        # return "test"


        # remove the file after processing
        try:
            os.remove(filepath)
        except OSError as e:
            print(f"Erro removing file: {e}")

        try:
            self.file_repo.save_to_db(content_dict)
            print(db.execute('SELECT * FROM question').fetchall()[0][1])
        except db.Error as e:
            print(f"Error adding dict to db: {e}")
            return f"Error adding dict to db"

        return f'File added successfully'


    def _convert_markdown_to_dict(self, markdown_text: str):
        """
        content_dict: {
            collection_name1: {
                group_name1: [
                    { 
                        question_test, 
                        choices: [{
                            choice_text,
                            is_correct

                        }] 
                    }
                ],
            }
        }

        # Collection
        ## Group
        1. question_text
        - [x] choice1
        - choice2
        """

        lines = markdown_text.splitlines()
        content_dict: ContentDict = {
            'Uncollected': {
                'Ungrouped': []
            }
        }

        collection_name: str = 'Uncollected'
        group_name: str = 'Ungrouped'
        question_text: str = ''


        for line in lines:
            # check for a collection name that bundles groups
            if line.startswith('# '):
                collection_name = line[2:]
                content_dict[collection_name] = {}
                continue

            # check for a group header that groups questions
            if line.startswith('## '):
                group_name = line[3:].strip()
                content_dict[collection_name][group_name] = []
                continue

            # check for a question
            question_match = re.match(r'^\d+\.', line)
            if line.startswith('### ') or question_match:
                question_text = line[3:].strip()
                question: Question = {
                    'question_text': question_text,
                    'choices': [],
                }
                content_dict[collection_name][group_name].append(question)
                continue

            # check for choices
            choice_match = re.match(r'^(-|\*)\s', line)
            if choice_match:
                choice_text = line[2:].strip()
                choice: Choice = {
                    'choice_text': choice_text,
                    'is_correct': False
                }

                answer_match = re.match(r'^\[x\]\s', choice_text)
                if answer_match:
                    choice['is_correct'] = True
                    choice['choice_text'] = choice_text[3:].strip()

                group = content_dict[collection_name][group_name]
                if len(group) == 0:
                    continue

                curr_question = group[-1]
                curr_question['choices'].append(choice)
                continue

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


    def _allowed_file(self, filename: str):
        return '.' in filename and \
            filename.rsplit('.', 1)[1].lower() in current_app.config["ALLOWED_EXTENSIONS"]
