from flask import Blueprint, request
from pprint import pp

from prac_tester.service import map_groups_with_all_data

bp = Blueprint('group', __name__, url_prefix='/api/group')

@bp.route('/')
def fetch_all_group_data():
    groups = map_groups_with_all_data()

    if groups is None:
        return "There were no groups"

    for group in groups:
        print(group.model_dump_json(indent=2))

    return "Fetching group data"
    
