from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
from tinydb import TinyDB, Query
import markdown_to_json
from werkzeug.utils import secure_filename


app = Flask(__name__)
CORS(app)

db = TinyDB('db.json')

@app.route('/', methods=['POST', 'GET'])
def hello_world():
    if request.method == 'POST':
        if 'file' not in request.files:
            app.logger.error('"file" not in request.files dictionary')
            return "file not in request"

        f = request.files['file']
        print("Filename", f.filename)
        print(f)
        print(type(f))

    # markdown_to_json.jsonify()

    # if request.method == 'POST':
    #     formJson = request.get_json()
    #
    #     db.insert(formJson)
    #     return db.all()


    return "<p>Hello World!</p>"

