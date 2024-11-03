from typing import List
from prac_tester.models import Choice, Question, Group
from prac_tester.repositories import QuestionRepository


class QuestionService:
    def __init__(self):
        self.question_repo = QuestionRepository()

    def map_questions_with_choices(self):
        questions = {}

        rows = self.question_repo.select_questions_with_choices()

        for row in rows:
            question_id = row[0]
            question_text = row[1]
            choice_id = row[2]
            choice_description = row[3]
            is_correct = row[4]

            # If question not already in dictionary, add it
            if question_id not in questions:
                questions[question_id] = {
                    'question': question_text,
                    'choices': []
                }

            questions[question_id]['choices'].append({
                'id': choice_id,
                'description': choice_description,
                'is_correct': is_correct
            })

        return questions
