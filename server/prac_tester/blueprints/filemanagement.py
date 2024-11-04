from flask import Blueprint, request
from prac_tester.services import FileService

bp = Blueprint('filemanagement', __name__, url_prefix='/api')

@bp.route('/upload', methods=['POST'])
def upload_file():
    f = request.files['file']
    if f is None:
        return "No file was found"

    fileService = FileService()
    fileService.file_to_db(f)

    return "File was submitted successfully"






