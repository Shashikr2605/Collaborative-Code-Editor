import face_recognition
import cv2
import pickle
import numpy as np

# Load encodings
with open("encodings.pkl", "rb") as f:
    data = pickle.load(f)

video = cv2.VideoCapture(0)

TOLERANCE = 0.45
PROCESS_EVERY_N_FRAMES = 2

frame_count = 0
face_locations = []
face_encodings = []
face_names = []

print("🚀 Starting camera...")

while True:
    ret, frame = video.read()
    if not ret:
        break

    frame_count += 1

    # Resize for speed
    small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
    rgb_small = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)

    # Process every N frames
    if frame_count % PROCESS_EVERY_N_FRAMES == 0:

        face_locations = face_recognition.face_locations(rgb_small)
        face_encodings = face_recognition.face_encodings(rgb_small, face_locations)

        face_names = []

        for encoding in face_encodings:

            distances = face_recognition.face_distance(data["encodings"], encoding)

            if len(distances) == 0:
                name = "UNKNOWN"
            else:
                best_match = np.argmin(distances)

                if distances[best_match] < TOLERANCE:
                    name = data["names"][best_match]
                else:
                    name = "UNKNOWN"

            face_names.append(name)

    # Draw results
    for (top, right, bottom, left), name in zip(face_locations, face_names):

        top *= 4
        right *= 4
        bottom *= 4
        left *= 4

        cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
        cv2.putText(frame, name, (left, top - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

    cv2.imshow("🚖 Driver Verification System", frame)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

video.release()

cv2.destroyAllWindows()