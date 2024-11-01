from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
from tinydb import TinyDB, Query
import markdown_to_json


app = Flask(__name__)
CORS(app)

db = TinyDB('db.json')

@app.route('/', methods=['POST', 'GET'])
def hello_world():
    if 'file' not in request.files:
        print("couldnt find the file")
        return "hello"
    if request.method == 'POST':
        f = request.files['file']

    # markdown_to_json.jsonify()

    # if request.method == 'POST':
    #     formJson = request.get_json()
    #
    #     db.insert(formJson)
    #     return db.all()


    return "<p>Hello World!</p>"

