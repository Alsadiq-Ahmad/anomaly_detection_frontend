# Anomaly Detection Frontend

This repository contains the **frontend** of the Real-Time Anomaly Detection Dashboard. It is built using **React** with **TypeScript** and provides an interactive interface to visualize real-time data streams and detected anomalies. The frontend communicates with a Flask-based backend that performs anomaly detection using the **Z-score** method.

![dashboard](https://github.com/user-attachments/assets/e0c2aa07-4e4a-4231-811f-71943afb680f)

## Features

- **Real-Time Data Visualization**: Display real-time data streams with live updates.
- **Anomaly Detection Highlighting**: Clearly mark and display anomalies in the data stream using visual indicators (red dots).
- **Interactive Charts**: The dashboard uses Recharts to create line charts that show the data points, including a custom tooltip for detailed information on each data point.
- **Dark Mode**: Toggle between dark mode and light mode for user preference.

## Tech Stack

- **React**: For building the user interface.
- **TypeScript**: Type-safe JavaScript.
- **Recharts**: For rendering responsive and customizable charts.
- **Axios**: For handling HTTP requests to the backend API.
- **Moment.js**: For date formatting.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/anomaly_detection_frontend.git
   cd anomaly_detection_frontend
