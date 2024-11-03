from pydantic import BaseModel, conlist
from typing import List
from prac_tester.repository import select_groups_with_all_data, select_questions_with_choices

class Choice(BaseModel):
    id: int
    description: str
    is_correct: bool

class Question(BaseModel):
    id: int
    question_text: str
    choices: List[Choice] = [] # default to an empty list

class Group(BaseModel):
    id: int
    group_name: str
    questions: List[Question] = [] # default to an empty list


def map_questions_with_choices():
    questions = {}

    rows = select_questions_with_choices()

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

def map_groups_with_all_data():
    rows = select_groups_with_all_data()
    groups: List[Group] = []

    if rows is None:
        print("rows is None when fetching groups with all data")
        return


    for _, row in enumerate(rows):
        group_id = row['group_id']
        group_name = row['name']
        question_id = row['question_id']
        question_text = row['question']
        choice_id = row['choice_id']
        choice_description = row['description']
        choice_is_correct = row['is_correct']

        # add the group if its not in the list or if the ids dont match
        if len(groups) == 0 or groups[-1].id != group_id:
            groups.append(Group(
                id = group_id,
                group_name = group_name,
                questions = []
            ))

        curr_group = groups[-1]
        if len(curr_group.questions) == 0 or curr_group.questions[-1].id != question_id:
            curr_group.questions.append(Question(
                id = question_id,
                question_text = question_text,
            ))

        curr_question = curr_group.questions[-1]
        curr_question.choices.append(Choice(
            id = choice_id,
            description = choice_description,
            is_correct = choice_is_correct
        ))

    return groups




