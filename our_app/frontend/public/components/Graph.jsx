import React from 'react';
import { Line } from 'react-chartjs-2'; // Import Line chart from chart.js
import { Card, CardContent, Typography } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);


const Graph = ({data}) => {
    console.log("data is ", data);
    const allForecastData = data.flatMap(item => {
        // Ensure forecast is a string, and then parse it to JSON if necessary
        let forecastData = Array.isArray(item.forecast) ? item.forecast : JSON.parse(item.forecast);

        return forecastData.map(forecastItem => ({
            date: new Date(forecastItem.date),
            amount: forecastItem.amount
        }));
    });

    const labels = allForecastData.map(forecastItem=>forecastItem.date.toLocaleDateString());
    const values = allForecastData.map(forecastItem=>forecastItem.amount);
    const chartData = {
        labels: labels,
        datasets:[
            {
                label: 'Value over Time',
                data: values,
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1
            }
        ],
    };

    return (
        <Card>
            <CardContent>
                <Typography variant = "h6"> Date vs Value </Typography>
                <Line data={chartData} />
            </CardContent>
        </Card>
    );

};

export default Graph;