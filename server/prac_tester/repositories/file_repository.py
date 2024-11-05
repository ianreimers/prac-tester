import pprint
from prac_tester.db import get_db
from prac_tester.types.types import ContentDict

class FileRepository:
    def __init__(self):
        pass

    def save_to_db(self, content_dict: ContentDict):
        db = get_db()
        cursor = db.cursor()

        for collection_name, group_dict in content_dict.items():
            cursor.execute('INSERT INTO collection (name) VALUES (?)', (collection_name,))
            collection_id = cursor.lastrowid

            if collection_id is None:
                raise db.DatabaseError(f'Couldn\'t insert collection: {collection_name}')


            for group_name, questions_arr in group_dict.items():
                # add the question group first to get the id
                cursor.execute('INSERT INTO question_group (name, collection_id) VALUES (?, ?)', (group_name, collection_id))
                qg_id = cursor.lastrowid

                if qg_id is None:
                    raise db.DatabaseError("Question Group ID was None")

                for question_dict in questions_arr:
                    choices_arr = question_dict['choices']
                    question_text = question_dict['question_text']

                    # add the question and get the question id for choices
                    cursor.execute('INSERT INTO question (question_text, question_group_id) VALUES (?, ?)', (question_text, qg_id))
                    question_id = cursor.lastrowid

                    if question_id is None:
                        print("Question ID was None")

                    # add each choice
                    for choice in choices_arr:
                        choice_text = choice['choice_text']
                        is_correct = choice['is_correct']

                        cursor.execute('INSERT INTO choice (choice_text, is_correct, question_id) VALUES (?, ?, ?)', (choice_text, is_correct, question_id))

        db.commit()
        return

