from flask import Blueprint, request
from prac_tester.services import GroupService
from prac_tester.services.collection_service import CollectionService

bp = Blueprint('collection', __name__, url_prefix='/api/collection')

collection_service = CollectionService()

@bp.route('/')
def fetch_all_collection_data():
    collections = collection_service.map_collections_with_all_data()

    if collections is None:
        return {'message': 'Could not get all collections data'}

    return [collection.model_dump() for collection in collections]
    
