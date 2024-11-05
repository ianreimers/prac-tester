from prac_tester.repositories import CollectionRepository
from prac_tester.models import Collection, Group, Question, Choice


class CollectionService():
    def __init__(self):
        self.col_repo = CollectionRepository()

    def map_collections_with_all_data(self):
        rows = self.col_repo.get_all_collection_data()
        collections: list[Collection] = []

        if rows is None:
            print('rows is None when fetching collection data')
            return

        for _, row in enumerate(rows):
            collection_id = row['collection_id']
            collection_name = row['collection_name']
            group_id = row['group_id']
            group_name = row['group_name']
            question_id = row['question_id']
            question_text = row['question_text']
            choice_id = row['choice_id']
            choice_text = row['choice_text']
            choice_is_correct = row['is_correct']

            if len(collections) == 0 or collections[-1].id != collection_id:
                collection = Collection(
                    id = collection_id,
                    name = collection_name,
                )
                collections.append(collection)

            curr_collection = collections[-1]
            groups = curr_collection.groups
            if len(groups) == 0 or groups[-1].id != group_id:
                group = Group(
                    id = group_id,
                    name = group_name,
                )
                groups.append(group)

            curr_group = groups[-1]
            questions = curr_group.questions
            if len(questions) == 0 or questions[-1].id != question_id:
                question = Question(
                    id = question_id,
                    question_text = question_text,
                )
                questions.append(question)

            curr_question = questions[-1]
            choices = curr_question.choices
            choice = Choice(
                id = choice_id,
                choice_text = choice_text,
                is_correct = choice_is_correct
            )
            choices.append(choice)

        return collections



