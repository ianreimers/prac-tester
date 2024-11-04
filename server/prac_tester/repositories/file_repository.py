from prac_tester.db import get_db

class FileRepository:
    def __init__(self):
        pass

    def save_to_db(self, content_dict: dict):
        db = get_db()
        cursor = db.cursor()

        for group_name, question_arr in content_dict.items():
            # add the question group first to get the id
            cursor.execute('INSERT INTO question_group (name) VALUES (?)', (group_name,))
            qg_id = cursor.lastrowid

            if qg_id is None:
                print("Question Group ID was None")

            for question_dict in question_arr:
                question_text = question_dict['question']
                choices: dict = question_dict['choices']
                answer = question_dict['answer']

                # add the question and get the question id for choices
                cursor.execute('INSERT INTO question (question_text, question_group_id) VALUES (?, ?)', (question_text, qg_id))
                question_id = cursor.lastrowid

                if question_id is None:
                    print("Question ID was None")

                # add each choice
                for symbol, description in choices.items():
                    cursor.execute('INSERT INTO choice (choice_text, is_correct, question_id) VALUES (?, ?, ?)', (description, symbol == answer, question_id))

        db.commit()
        return
