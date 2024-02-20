from flask import Flask, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

value = 0


def sendAlerts():
    global value
    while True:
        num = random.randint(0, 101)
        if num == 40:
            break
        value = num


@app.route("/", methods=["GET"])
def initialRoute():
    return {"message": "Success", "data": "Hello world"}


@app.route("/upload-img", methods=["POST"])
def uploadImg():
    if "file" not in request.files:
        return "No file part", 400
    file = request.files["file"]
    return {"message": "Success", "data": "Image Uploaded successfully"}


@app.route("/send-alert", methods=["GET"])
def sendAlert():
    sendAlerts()
    # if value % 2 == 0:
    return {"message": "Success", "data": f"Alert count is: {value}"}


if __name__ == "__main__":
    app.run(debug=True)
