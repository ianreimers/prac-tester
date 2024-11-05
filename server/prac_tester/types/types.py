from typing import List, Dict, TypedDict

class Choice(TypedDict):
    choice_text: str
    is_correct: bool

class Question(TypedDict):
    question_text: str
    choices: List[Choice]

type GroupName = str
type CollectionName = str
type Collection = Dict[GroupName, List[Question]]
type ContentDict = Dict[CollectionName, Collection]


