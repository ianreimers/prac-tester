from prac_tester.db import get_db

class QuestionRepository:

    def select_questions_with_choices(self):
        db = get_db()
        cursor = db.cursor()

        query = """
        SELECT q.id AS question_id, q.question_text, c.id AS choice_id, c.choice_text, c.is_correct
        FROM question q
        LEFT JOIN choice c ON q.id = c.question_id
        ORDER BY q.id, c.id
        """

        try:
            cursor.execute(query)
            rows = cursor.fetchall()
        except db.Error as e:
            return f"Could not fetch all questions: {e}"

        return rows

