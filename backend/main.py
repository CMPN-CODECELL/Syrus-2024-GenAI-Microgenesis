import cv2
import os 
import pickle
import face_recognition
import numpy as np
import cvzone
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from firebase_admin import storage
from datetime import datetime

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://facerecognitionrealtime-fcb19-default-rtdb.firebaseio.com/",
    'storageBucket': "facerecognitionrealtime-fcb19.appspot.com"
})

bucket = storage.bucket()

# Open the default camera (index 0)
cap = cv2.VideoCapture(0)
cap.set(3, 640)
cap.set(4, 480)

# Check if the camera opened successfully
if not cap.isOpened():
    print("Error: Could not open camera.")
    exit()

imgBackground = cv2.imread('Resources/background.png')

# Importing the mode images into a list
folderModePath = 'Resources/Modes'
modePathList = os.listdir(folderModePath)
imgModeList = []
for path in modePathList:
    imgModeList.append(cv2.imread(os.path.join(folderModePath, path)))

# Load the encoding file
print("Loading Encode File ...")
file = open('EncodeFile.p', 'rb')
encodeListKnownWithIds = pickle.load(file)
file.close()
encodeListKnown, peopleIds = encodeListKnownWithIds
# print(peopleIds)
print("Encode File Loaded")

modeType = 0
counter = 0
id = -1
imgPeople = []

# Loop to continuously read frames from the camera
while True:
    try:
        # Capture frame-by-frame
        ret, frame = cap.read()

        # Check if the frame was captured successfully
        if not ret:
            print("Error: Failed to capture frame")

        imgS = cv2.resize(frame, (0, 0), None, 0.25, 0.25)
        imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

        # Check if the frame was captured successfully
        if not ret:
            print("Error: Failed to capture frame")
            break
        
        imgBackground[162:162 + 480, 55:55 + 640] = frame
        imgBackground[44:44 + 633, 808:808 + 414] = imgModeList[modeType]

        # Display the captured frame
        cv2.imshow('Face Recognition', imgBackground)
    except:
        print("Error: Failed to capture/resize frame")

    faceCurFrame = face_recognition.face_locations(imgS)
    encodeCurFrame = face_recognition.face_encodings(imgS, faceCurFrame)

    if faceCurFrame:

        for encodeFace, faceLoc in zip(encodeCurFrame, faceCurFrame):
            matches = face_recognition.compare_faces(encodeListKnown, encodeFace)
            faceDis = face_recognition.face_distance(encodeListKnown, encodeFace)
            # print("matches", matches)
            # print("faceDis", faceDis)

            matchIndex = np.argmin(faceDis)
            # print("Match Index", matchIndex)

            if matches[matchIndex]:
                # print("Known Face Detected")
                # print(studentIds[matchIndex])
                y1, x2, y2, x1 = faceLoc
                y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
                bbox = 15 + x1, 72 + y1, x2 - x1, y2 - y1
                frame = cvzone.cornerRect(frame, bbox, rt=0)
                id = peopleIds[matchIndex]
                if counter == 0:
                    cvzone.putTextRect(imgBackground, "Loading", (275, 400))
                    cv2.imshow("Face Recognition", imgBackground)
                    cv2.waitKey(1)
                    counter = 1
                    modeType = 1

        if counter != 0:

            if counter == 1:
                # Get the Data
                peopleInfo = db.reference(f'People/{id}').get()
                print(peopleInfo)
                # Get the Image from the storage
                blob = bucket.get_blob(f'Images/{id}.jpg')
                array = np.frombuffer(blob.download_as_string(), np.uint8)
                imgPeople = cv2.imdecode(array, cv2.COLOR_BGRA2BGR)
                # Update data of attendance
                # datetimeObject = datetime.strptime(peopleInfo['last_appearance_time'],
                #                                    "%Y-%m-%d %H:%M:%S")
                # secondsElapsed = (datetime.now() - datetimeObject).total_seconds()
                # print(secondsElapsed)
                # if secondsElapsed > 30:
                #     ref = db.reference(f'People/{id}')
                    # peopleInfo['total_appearance'] += 1
                    # ref.child('total_appearance').set(peopleInfo['total_appearance'])
                    # ref.child('last_appearance_time').set(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
                # else:
                    # modeType = 3
                    # counter = 0
                    # imgBackground[44:44 + 633, 808:808 + 414] = imgModeList[modeType]

            if modeType != 3:

                if 10 < counter < 20:
                    modeType = 2

                imgBackground[44:44 + 633, 808:808 + 414] = imgModeList[modeType]

                if counter <= 10:
                    # cv2.putText(imgBackground, str(peopleInfo['age']), (44, 44+633),
                    #             cv2.FONT_HERSHEY_COMPLEX, 1, (100, 100, 100), 1)
                    # cv2.putText(imgBackground, str(studentInfo['major']), (1006, 550),
                    #             cv2.FONT_HERSHEY_COMPLEX, 0.5, (255, 255, 255), 1)
                    # cv2.putText(imgBackground, str(id), (1006, 493),
                    #             cv2.FONT_HERSHEY_COMPLEX, 0.5, (255, 255, 255), 1)
                    cv2.putText(imgBackground, str(peopleInfo['name']), (50, 50+633),
                                cv2.FONT_HERSHEY_COMPLEX, 0.6, (100, 100, 100), 1)
                    cv2.putText(imgBackground, str(peopleInfo['gender']), (500, 50+633),
                                cv2.FONT_HERSHEY_COMPLEX, 0.6, (100, 100, 100), 1)
                    cv2.putText(imgBackground, str(peopleInfo['age']), (650, 50+633),
                                cv2.FONT_HERSHEY_COMPLEX, 0.6, (100, 100, 100), 1)

                    (w, h), _ = cv2.getTextSize(peopleInfo['name'], cv2.FONT_HERSHEY_COMPLEX, 1, 1)
                    offset = (414 - w) // 2
                    cv2.putText(imgBackground, str(peopleInfo['name']), (808 + offset, 445),
                                cv2.FONT_HERSHEY_COMPLEX, 1, (50, 50, 50), 1)

                    # imgBackground[175:(175 + 1024), 909:(909 + 1024)] = imgPeople

                counter += 1

                if counter >= 20:
                    counter = 0
                    modeType = 0
                    peopleInfo = []
                    imgPeople = []
                    imgBackground[44:44 + 633, 808:808 + 414] = imgModeList[modeType]

    else:
        modeType = 0
        counter = 0

    # Check for key press; if 'q' is pressed, exit the loop
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the VideoCapture object and close all OpenCV windows
cap.release()
cv2.destroyAllWindows()
