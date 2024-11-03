from prac_tester.db import get_db

class GroupRepository:

    def select_groups_with_all_data(self):
        db = get_db()
        cursor = db.cursor()

        query = """
        SELECT g.id AS group_id, g.name, 
               q.id AS question_id, q.question_text,
               c.id as choice_id, c.choice_text, c.is_correct
        FROM question_group g
        INNER JOIN question q ON g.id = q.question_group_id
        INNER JOIN choice c ON q.id = c.question_id
        ORDER BY g.id, q.id, c.id
        """

        try:
            cursor.execute(query)
            rows = cursor.fetchall()
        except db.Error as e:
            raise RuntimeError(f"Could not fetch all group data: {e}")

        return rows
