from typing import List
from prac_tester.models import Group, Question, Choice
from prac_tester.repositories import GroupRepository


class GroupService:

    def __init__(self):
        self.group_repo = GroupRepository()

    def map_groups_with_all_data(self):
        rows = self.group_repo.select_groups_with_all_data()
        groups: List[Group] = []

        if rows is None:
            print("rows is None when fetching groups with all data")
            return


        for _, row in enumerate(rows):
            group_id = row['group_id']
            group_name = row['name']
            question_id = row['question_id']
            question_text = row['question_text']
            choice_id = row['choice_id']
            choice_description = row['choice_text']
            choice_is_correct = row['is_correct']

            # add the group if its not in the list or if the ids dont match
            if len(groups) == 0 or groups[-1].id != group_id:
                groups.append(Group(
                    id = group_id,
                    name = group_name,
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
                choice_text = choice_description,
                is_correct = choice_is_correct
            ))

        return groups
