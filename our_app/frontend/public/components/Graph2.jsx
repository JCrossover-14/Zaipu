import React from 'react';
import { Line } from 'react-chartjs-2'; // Import Line chart from chart.js
import { Card, CardContent, Typography } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);


const Graph2 = ({data}) => {
    console.log("data is ", data);
    const allForecastData = Array.isArray(data[0]?.forecast)
    ? data.flatMap(item => item.forecast.map(forecastItem => ({
        date: new Date(forecastItem.date),
        amount: forecastItem.amount
    })))
    : data.map(item => ({
        date: new Date(item.date),
        amount: item.balance
    }));

    const labels = allForecastData.map(forecastItem => forecastItem.date.toLocaleDateString());
    const values = allForecastData.map(forecastItem => forecastItem.amount);
    const chartData = {
        labels: labels,
        datasets:[
            {
                label: 'Forecasted balance',
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
                <Typography variant = "h6"> Forecasted Balance </Typography>
                <Line data={chartData} />
            </CardContent>
        </Card>
    );

};

export default Graph2;