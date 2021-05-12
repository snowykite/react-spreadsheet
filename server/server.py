from flask import request, Flask
from os import path
from flask_cors import CORS
import json

app = Flask(__name__)
cors = CORS(app)

SAVE_TABLE_FILE = 'saved'

@app.route('/api/table', methods=['GET', 'POST'])
def table_api():
    if request.method == 'POST':
        save_to_file(request.json)
        return 'Uploaded!'
    else:
        return load_file_data()

def save_to_file(data):
    with open(SAVE_TABLE_FILE, 'w') as fp:
        json.dump(data, fp)


def load_file_data():
    if path.exists(SAVE_TABLE_FILE):
        with open(SAVE_TABLE_FILE, 'r') as fp:
            return fp.read()
