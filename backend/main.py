# import cv2

# cap = cv2.VideoCapture(1)
# cap.set(3, 640)
# cap.set(4, 480)

# while True: 
#     success, img = cap.read()
#     if not success:
#         print("Failed to read frame from the camera")
#         break

#     cv2.imshow("Face recognition", img)
#     if cv2.waitKey(1) == ord('q'):  # Press 'q' to exit
#         break

# cap.release()
# cv2.destroyAllWindows()

import cv2

# Open the default camera (index 0)
cap = cv2.VideoCapture(0)

# Check if the camera opened successfully
if not cap.isOpened():
    print("Error: Could not open camera.")
    exit()

imgBackground = cv2.imread('Resources/background.png')

# Loop to continuously read frames from the camera
while True:
    # Capture frame-by-frame
    ret, frame = cap.read()

    # Check if the frame was captured successfully
    if not ret:
        print("Error: Failed to capture frame")
        break
    
    imgBackground[162:162 + 480, 55:55 + 640] = frame

    # Display the captured frame
    cv2.imshow('Face Recognition', imgBackground)

    # Check for key press; if 'q' is pressed, exit the loop
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the VideoCapture object and close all OpenCV windows
cap.release()
cv2.destroyAllWindows()
