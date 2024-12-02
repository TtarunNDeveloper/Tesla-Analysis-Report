"use client";
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { ResponsiveContainer } from 'recharts';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
interface ChartData{
    name: string;
    value: number;
}

const LineChartComponent: React.FC<{data: ChartData[] }> = ({data}) => {
    const chartData = {
        labels: data.map((item) => item.name),
        datasets: [
            {
                label: 'Activity',
                data: data.map((item)=> item.value),
                borderColor: 'rgba(255,0,0,1)',
                backgroundColor: 'rgba(255,0,0,0.2)',
                fill:true,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins:{
            legend:{
                display:false,
            },
            title:{
                display: false,
            },
        },
    };
    return(
        <ResponsiveContainer width="100%" height={215}>
            <Line data={chartData} options={options}/>
        </ResponsiveContainer>
    )
};
export default LineChartComponent;