from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

@app.route('/run', methods=['POST'])
def run():
    file = request.files['file']
    df = pd.read_csv(file)
    result = df.head().to_dict(orient='records')
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
