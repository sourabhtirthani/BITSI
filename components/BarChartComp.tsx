"use client";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJs, LinearScale, CategoryScale, LineElement, BarElement, PointElement, Legend, Title, Tooltip } from 'chart.js';
import { title } from 'process';
import Dropdown from './Dropdown';
import { useState } from 'react';

ChartJs.register(
    LinearScale, CategoryScale, LineElement, PointElement, BarElement, Legend, Title, Tooltip
);

const BarChartComp = ({ titleofChart }: { titleofChart: string }) => {
    const [filterValue, setFilterValue] = useState('');
    // const ctx = document.createElement('canvas').getContext('2d');
    // const gradient = ctx?.createLinearGradient(0, 0, 0, 400);
    // gradient?.addColorStop(0, '#FF8008'); 
    // gradient?.addColorStop(1, '#FFC837'); 
    const items = [
        {
            id: 1,
            name: '2',
            icon: 'fsd'
        }
    ];
    
    const chartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                data: [440, 32, 432, 22, 222, 213, 43, 54, 543, 654, 43, 434],
                label: "Sample Data set",
                backgroundColor:'#daa520', 
                borderColor: '#daa520', 
                tension: 0.3,
                pointBackgroundColor: '#F38216'
            },
           
        ]
    };

    const chartOptions = {
        plugins: {
            legend: {
                position: 'top' as const,
                align: 'center' as const,
                labels: {
                    color: 'white',
                    usePointStyle: true,
                },
                font: {
                    family: 'Manrope',
                    size: 14,
                },
            },
            tooltip: {
                enabled: true,
            },
            title: {
                display: true,
                text: titleofChart,
                align: 'start' as const,
                color: 'white',
                font: {
                    family: 'Mulish',
                    size: 18,
                    layout: {
                        padding: {
                            left: 20,
                        },
                    },
                    margin: {}
                },
            }
        },
        layout: {
            padding: {}
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    color: 'rgba(0, 0, 0, 0)'
                },
                ticks: {
                    color: 'white'
                }
            },
            y: {
                grid: {
                    color: 'white'
                },
                ticks: {
                    color: 'white'
                }
            }
        }
    };

    return (
        <div className='relative secondary-shadow11 bg-success-512 h-[455px]'>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
}

export default BarChartComp;