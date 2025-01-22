from flask import Flask, send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/video/<filename>')
def get_video(filename):
    return send_file(f'videos/{filename}', as_attachment=False)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
