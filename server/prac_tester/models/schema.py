from typing import Dict, List, NewType
from pydantic import BaseModel, conlist

class Choice(BaseModel):
    id: int
    choice_text: str
    is_correct: bool

class Question(BaseModel):
    id: int
    question_text: str
    choices: List[Choice] = [] # default to an empty list

class Group(BaseModel):
    id: int
    name: str
    questions: List[Question] = [] # default to an empty list

class Collection(BaseModel):
    id: int
    name: str
    groups: List[Group] = []
