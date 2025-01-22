import numpy as np
from ultralytics import YOLO
import cv2
import time
import sys
import torch
from sort import Sort  # Ensure SORT is correctly installed and configured

# Initialize the YOLO model
device = 'cuda' if torch.cuda.is_available() else 'cpu'
model = YOLO("../Yolo-Weights/yolov8n.pt").to(device)

# Video processing
video_path = "video.mp4"
output_path = "videos/processed_video.mp4"

cap = cv2.VideoCapture(video_path)
if not cap.isOpened():
    print("Error: Could not open video file.")
    sys.exit()

desired_width, desired_height = 640, 360
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
fps = cap.get(cv2.CAP_PROP_FPS)
out = cv2.VideoWriter(output_path, fourcc, fps, (desired_width, desired_height))

tracker = Sort(max_age=10, min_hits=1, iou_threshold=0.3)
classNames = ["car", "motorbike", "bus", "truck"]

while True:
    success, img = cap.read()
    if not success:
        break
    img = cv2.resize(img, (desired_width, desired_height))
    results = model(img, stream=True, device=device)

    detections = []
    for r in results:
        boxes = r.boxes
        for box in boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            conf = float(box.conf[0])
            cls = int(box.cls[0])
            if cls < len(classNames) and conf > 0.3:
                detections.append([x1, y1, x2, y2, conf])

    detections = np.array(detections) if detections else np.empty((0, 5))
    resultsTracker = tracker.update(detections)

    for result in resultsTracker:
        x1, y1, x2, y2, obj_id = map(int, result[:5])
        cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 255), 2)
        cv2.putText(img, f'ID: {obj_id}', (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)

    out.write(img)

cap.release()
out.release()
