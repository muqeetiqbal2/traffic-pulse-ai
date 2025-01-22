import numpy as np
from ultralytics import YOLO
import cv2
import cvzone
import time
import sys
import torch

# Append the path to the SORT module
sys.path.append(r"d:\python\FYP\yolov5-env\Scripts\sort-master")
from sort import Sort  # SORT tracker for object tracking

# Check if GPU is available and set the device accordingly
device = 'cuda' if torch.cuda.is_available() else 'cpu'
print(f"Using {'GPU' if device == 'cuda' else 'CPU'}")

# Define the path to your video file
video_path = r"video2.mp4"  # Replace with the correct path

# Initialize video capture for the video file
cap = cv2.VideoCapture(video_path)

# Check if the capture is successful
if not cap.isOpened():
    print("Error: Could not open video file.")
    sys.exit()

# Load the YOLO model and set it to use the available device
model = YOLO("../Yolo-Weights/yolov8n.pt").to(device)

# Fixed list of class names (detecting only vehicles)
classNames = ["car", "motorbike", "bus", "truck"]

# Initialize the SORT tracker
tracker = Sort(max_age=10, min_hits=1, iou_threshold=0.3)

# Line crossing limits for vehicle counting (inflow and outflow lines)
inflow_limits = [330, 110, 635, 110]
outflow_limits = [150, 300, 620, 300]
totalCount = 0  # Total vehicle count

# Unique vehicle IDs for inflow and outflow
counted_inflow_ids = set()
counted_outflow_ids = set()

# Initialize previous frame time for FPS calculations
prev_frame_time = 0

# Set the desired video frame size
desired_width, desired_height = 640, 360

while True:
    new_frame_time = time.time()  # Start time for the new frame

    # Read a frame from the video
    success, img = cap.read()
    if not success:
        print("Reached the end of the video or failed to capture image.")
        break

    # Resize the frame while preserving aspect ratio
    (h, w) = img.shape[:2]
    aspect_ratio = w / h
    new_height = int(desired_width / aspect_ratio)
    img = cv2.resize(img, (desired_width, new_height))

    # Perform YOLO inference on the frame
    results = model(img, stream=True, device=device)

    # Prepare an array to hold detection results
    detections = []

    # Process the inference results
    for r in results:
        boxes = r.boxes
        for box in boxes:
            # Extract bounding box coordinates
            x1, y1, x2, y2 = map(int, box.xyxy[0])  # Convert to integers
            w, h = x2 - x1, y2 - y1  # Width and height of the bounding box

            # Ensure the class index is within the range of classNames
            cls = int(box.cls[0])
            if cls >= len(classNames):
                print(f"Warning: Class index {cls} out of range.")
                continue

            # Get the confidence score
            conf = float(box.conf[0])
            currentClass = classNames[cls]

            # Track and count only vehicles with confidence > 0.3
            if currentClass in classNames and conf > 0.3:
                detections.append([x1, y1, x2, y2, conf])

    # Convert detections list to numpy array for SORT tracker
    if len(detections) > 0:
        detections = np.array(detections)
        resultsTracker = tracker.update(detections)

        # Draw the inflow and outflow counting lines
        cv2.line(img, (inflow_limits[0], inflow_limits[1]), (inflow_limits[2], inflow_limits[3]), (0, 0, 255), 5)
        cv2.line(img, (outflow_limits[0], outflow_limits[1]), (outflow_limits[2], outflow_limits[3]), (255, 0, 0), 5)

        # Process tracked objects
        for result in resultsTracker:
            x1, y1, x2, y2, obj_id = map(int, result[:5])
            w, h = x2 - x1, y2 - y1

            # Draw tracking box and ID
            cvzone.cornerRect(img, (x1, y1, w, h), l=9, rt=2, colorR=(255, 0, 255))
            cvzone.putTextRect(img, f'{int(obj_id)}', (max(0, x1), max(35, y1)), scale=2, thickness=3, offset=10)

            # Get the center point of the vehicle
            cx, cy = x1 + w // 2, y1 + h // 2
            cv2.circle(img, (cx, cy), 5, (255, 0, 255), cv2.FILLED)

            # Check if the vehicle crosses the inflow line
            if inflow_limits[0] < cx < inflow_limits[2] and inflow_limits[1] - 15 < cy < inflow_limits[1] + 15:
                if obj_id not in counted_inflow_ids:
                    counted_inflow_ids.add(obj_id)
                    totalCount += 1
                    cv2.line(img, (inflow_limits[0], inflow_limits[1]), (inflow_limits[2], inflow_limits[3]), (0, 255, 0), 5)

            # Check if the vehicle crosses the outflow line
            if outflow_limits[0] < cx < outflow_limits[2] and outflow_limits[1] - 15 < cy < outflow_limits[1] + 15:
                if obj_id not in counted_outflow_ids:
                    counted_outflow_ids.add(obj_id)
                    totalCount -= 1
                    cv2.line(img, (outflow_limits[0], outflow_limits[1]), (outflow_limits[2], outflow_limits[3]), (0, 255, 255), 5)

    # Display the total count on the screen
    cv2.putText(img, f'Count: {totalCount}', (20, 50), cv2.FONT_HERSHEY_COMPLEX_SMALL, 1, (70, 70, 255), 2)


    # Calculate and display FPS
    time_diff = new_frame_time - prev_frame_time
    fps = 1 / time_diff if time_diff > 0 else 0
    prev_frame_time = new_frame_time
    cv2.putText(img, f'FPS: {fps:.2f}', (150, 50), cv2.FONT_HERSHEY_COMPLEX_SMALL, 1, (255, 255, 255), 2)

    # Show the frame with detections
    cv2.imshow("Video Feed", img)

    # Exit when 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        print("Exiting...")
        break

# Release the video capture object and close all OpenCV windows
cap.release()
cv2.destroyAllWindows()