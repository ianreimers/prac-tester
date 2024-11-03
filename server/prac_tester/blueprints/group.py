from flask import Blueprint, request
from pprint import pp

from prac_tester.services import GroupService

bp = Blueprint('group', __name__, url_prefix='/api/group')

group_service = GroupService()

@bp.route('/')
def fetch_all_group_data():
    groups = group_service.map_groups_with_all_data()

    if groups is None:
        return "There were no groups"

    for group in groups:
        print(group.model_dump_json(indent=2))

    return [group.model_dump() for group in groups]
    
