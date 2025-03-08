import React from 'react';
import { Line } from 'react-chartjs-2'; // Import Line chart from chart.js
import { Card, CardContent, Typography } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);


const Graph = ({data}) => {
    console.log("data is ", data);
    const chartData = {
        labels: data.map((item) => new Date(item.date).toLocaleDateString()),
        datasets:[
            {
                label: 'Value over Time',
                data: data.map((item) => item.value),
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