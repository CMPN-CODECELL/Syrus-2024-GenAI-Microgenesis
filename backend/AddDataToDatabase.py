import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://facerecognitionrealtime-fcb19-default-rtdb.firebaseio.com/"
})

ref = db.reference('People')

data = {
    "0":
        {
            "name": "Priya Patel",
            "gender": "female",
            "age": "24"
        },
    "1":
        {
            "name": "Neha Sharma",
            "gender": "female",
            "age": "35"
        },
    "2":
        {
            "name": "Sneha Kapoor",
            "gender": "female",
            "age": "29"
        },
    "3":
        {
            "name": "Ananya Das",
            "gender": "female",
            "age": "28"
        },
    "4":
        {
            "name": "Meera Singh",
            "gender": "female",
            "age": "32"
        },
    "5":
        {
            "name": "Alisha Reddy",
            "gender": "female",
            "age": "40"
        },
    "6":
        {
            "name": "Divya Gupta",
            "gender": "female",
            "age": "26"
        },
    "7":
        {
            "name": "Shreya Choudhary",
            "gender": "female",
            "age": "22"
        },
    "8":
        {
            "name": "Niharika Joshi",
            "gender": "female",
            "age": "35"
        },
    "9":
        {
            "name": "Rohan Khanna",
            "gender": "male",
            "age": "21"
        },
    "10":
        {
            "name": "Tanvi Kapoor",
            "gender": "female",
            "age": "26"
        }
}

for key, value in data.items():
    ref.child(key).set(value)