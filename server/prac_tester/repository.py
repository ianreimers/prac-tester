import sqlite3

from prac_tester.db import get_db

def select_questions_with_choices():
    db = get_db()
    cursor = db.cursor()

    query = """
    SELECT q.id AS question_id, q.question, c.id AS choice_id, c.description, c.is_correct
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

def select_groups_with_all_data():
    db = get_db()
    cursor = db.cursor()

    query = """
    SELECT g.id AS group_id, g.name, 
           q.id AS question_id, q.question,
           c.id as choice_id, c.description, c.is_correct
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
