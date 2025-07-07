from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app, origins=['http://localhost:5173'], supports_credentials=True)

@app.route('/api/ping', methods=['GET'])
def ping():
    return jsonify({"message": "Python API is working!"})

@app.route('/run', methods=['POST'])
def run():
    file = request.files['file']
    df = pd.read_csv(file)
    result = df.head().to_dict(orient='records')
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
