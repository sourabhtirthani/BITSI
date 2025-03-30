"use client"
import { Line } from 'react-chartjs-2'
import { Chart as ChartJs, LinearScale, CategoryScale, LineElement, PointElement, Legend, Title, Tooltip } from 'chart.js'
import { title } from 'process'
import Dropdown from './Dropdown'
import { useState } from 'react'
ChartJs.register(
    LinearScale, CategoryScale, LineElement, PointElement, Legend, Title, Tooltip
)
const LineChartComp = ({ titleofChart }: { titleofChart: string }) => {
    const [filterValue , setFilterValue] = useState('')
    const items = [
        {
            id: 1,
            name: '2',
            icon: 'fsd'
        }
    ]
    const chartData = {
        labels: ["jan", "feb ", "fjdakls", "jan", "feb ", "fjdakls", "jan", "feb ", "fjdakls", "jan", "feb ", "fjdakls"],

        datasets: [
            {
                data: [440, 32, 432, 22, 222, 213, 43, 54, 543, 654, 43, 434],
                label: "Sample Data set",
                borderColor: '#F38216',
                tension: 0.3,
                pointBackgroundColor: '#F38216'

            },
            {
                data: [43, 54, 543, 420, 22, 222, 213, 654, 32, 432, 43, 434],
                label: "Sample Data set2",
                borderColor: 'white',
                tension: 0.3,
                pointBackgroundColor: 'white'

            }
        ]
    }
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
                    margin: {

                    }
                },
            }
        },
        layout: {
            padding: {
                // top: 50,
                // bottom: 50, 
                // left: 50, 
                // right: 50, 
            }
        },
        responsive: true,
        maintainAspectRatio: false,// 
        scales: {
            x: {
                grid: {
                    color: 'rgba(0, 0, 0, 0)'
                },
                ticks: {
                    color: 'rgba(0, 0, 0, 0)'
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
    
            <div className=' relative secondary-shadow11 bg-success-512 h-[455px]'>
                {/* <div className=' flex justify-end '> */}
                    {/* <button className='absolute top-1 right-1 text-white bg-success-512 secondary-shadow11'></button> */}
                    {/* <div className='justify-end absolute secondary-shadow11'>
                        <Dropdown buttonName='Today' items={items} setValue={setFilterValue}  /></div>
                      
                </div> */}

                <Line data={chartData} options={chartOptions} >

                </Line></div>
    )
}

export default LineChartComp