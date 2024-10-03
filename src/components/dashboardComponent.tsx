"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bell, LineChart as LineChartIcon, Clock } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import moment from 'moment';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './ui/card';

// DataPoint interface defines the structure of each data point
interface DataPoint {
    datetime: string;  // Timestamp of the data point
    Current: number;   // The 'Current' value to be displayed and analyzed
    anomaly: boolean;  // Indicates if this data point is an anomaly
}

export default function AnomalyDetectionDashboard() {
    // State for dark mode toggling (not used in this example)
    const [darkMode, setDarkMode] = useState(false);

    // State for holding data points fetched from the backend
    const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);

    // State for holding various metrics fetched from the backend
    const [metrics, setMetrics] = useState({
        total_points: 0,              // Total data points processed
        anomalies_detected: 0,        // Total anomalies detected
        average_processing_time: 0.0, // Average processing time per point (ms)
        average_current_value: 0.0,   // Average 'Current' value from the dataset
    });

    // useEffect hook to fetch data and metrics from the backend every second
    useEffect(() => {
        const interval = setInterval(() => {
            // Fetch data points and anomalies from the backend API
            axios.get('http://localhost:5000/api/data')
                .then(response => {
                    const { data_points, anomaly_flags } = response.data;
                    // Combine data points with their anomaly flags
                    const combinedData = data_points.map((data: any, index: number) => ({
                        datetime: data.datetime,
                        Current: data.Current,
                        anomaly: anomaly_flags[index] === 1, // True if anomaly
                    }));
                    setDataPoints(combinedData);  // Update state with new data
                })
                .catch(error => {
                    console.error('Error fetching data:', error);  // Handle errors
                });

            // Fetch metrics from the backend API
            axios.get('http://localhost:5000/api/metrics')
                .then(response => {
                    setMetrics(response.data);  // Update state with new metrics
                })
                .catch(error => {
                    console.error('Error fetching metrics:', error);  // Handle errors
                });
        }, 1000);  // Repeat every 1 second

        return () => clearInterval(interval);  // Cleanup on component unmount
    }, []);

    // Custom tooltip component for the chart
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const { datetime, Current, anomaly } = payload[0].payload;
            return (
                <div className="tooltip bg-white p-2 border border-gray-300 rounded shadow-md">
                    <p><strong>Time:</strong> {datetime}</p>
                    <p><strong>Current:</strong> {Current}</p>
                    <p><strong>Anomaly:</strong> {anomaly ? 'Yes' : 'No'}</p>
                </div>
            );
        }
        return null;
    };

    // Custom dot component to highlight anomalies on the chart
    const CustomDot = (props: any) => {
        const { cx, cy, payload } = props;
        if (payload.anomaly) {
            return (
                <circle
                    cx={cx}
                    cy={cy}
                    r={6}                  // Radius of the anomaly dot
                    fill="#ff0000"         // Red color for anomalies
                    stroke="#ff0000"
                    strokeWidth={2}
                />
            );
        }
        return null;
    };

    return (
        <div className={`min-h-screen ${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
            {/* Main content area for the dashboard */}
            <main className="container mx-auto px-4 py-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {/* Card displaying total data points processed */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Data Points Processed</CardTitle>
                            <LineChartIcon className="h-4 w-4 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{metrics.total_points}</div>
                        </CardContent>
                    </Card>

                    {/* Card displaying total anomalies detected */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Anomalies Detected</CardTitle>
                            <Bell className="h-4 w-4 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{metrics.anomalies_detected}</div>
                        </CardContent>
                    </Card>

                    {/* Card displaying average processing time per data point */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Processing Time per Data Point</CardTitle>
                            <Clock className="h-4 w-4 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {metrics.average_processing_time.toFixed(2)} ms
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card displaying average 'Current' value */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Average Current Value</CardTitle>
                            <LineChartIcon className="h-4 w-4 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {metrics.average_current_value.toFixed(2)}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Line chart displaying the real-time data stream */}
                    <Card className="col-span-full">
                        <CardHeader>
                            <CardTitle>Real-Time Data Stream</CardTitle>
                            <CardDescription>Live updates of Current values and anomalies</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={dataPoints}>
                                    {/* X-axis configuration */}
                                    <XAxis
                                        dataKey="datetime"
                                        tickFormatter={(tick) => moment(tick).format('HH:mm')}
                                        interval="preserveStartEnd"
                                        tick={{ fontSize: 12 }}
                                        angle={-45}
                                        textAnchor="end"
                                    />
                                    {/* Y-axis configuration */}
                                    <YAxis
                                        domain={[0.3, 1.7]}  // Set Y-axis limits
                                        tick={{ fontSize: 14 }}
                                        ticks={[0.3, 0.6, 0.9, 1.2, 1.5, 1.7]}
                                    />
                                    {/* Grid lines */}
                                    <CartesianGrid strokeDasharray="3 3" />
                                    {/* Tooltip configuration */}
                                    <Tooltip content={<CustomTooltip />} />
                                    {/* Line representing 'Current' values */}
                                    <Line
                                        type="monotone"
                                        dataKey="Current"
                                        stroke="#8884d8"
                                        strokeWidth={2}
                                        isAnimationActive={false}
                                        dot={<CustomDot />}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
