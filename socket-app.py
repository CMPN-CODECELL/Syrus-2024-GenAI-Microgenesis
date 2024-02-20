from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
app.config["SECRET_KEY"] = "secret!"
socketio = SocketIO(app)


@socketio.on("message")
def handle_message(data):
    print("received message: " + data)


@socketio.on("json")
def handle_json(data):
    print("received json: " + str(data))


if __name__ == "__main__":
    socketio.run(app)
