from prac_tester.db import get_db

class CollectionRepository():

    def get_all_collection_data(self):
        db = get_db()
        cursor = db.cursor()

        query = """
        SELECT col.id as collection_id, col.name AS collection_name,
               g.id AS group_id, g.name AS group_name,
               q.id AS question_id, q.question_text,
               c.id AS choice_id, c.choice_text, c.is_correct
        FROM collection col
        INNER JOIN question_group g ON col.id = g.collection_id
        INNER JOIN question q ON g.id = q.question_group_id
        INNER JOIN choice c ON q.id = c.question_id
        ORDER BY c.id, g.id, q.id, c.id
        """

        try:
            cursor.execute(query)
            rows = cursor.fetchall()
        except db.Error as e:
            raise RuntimeError(f'Could not fetch all collection data: {e}')

        return rows


