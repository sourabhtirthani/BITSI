"use client"
import {Line} from 'react-chartjs-2'
import { Chart as ChartJs, LinearScale, CategoryScale, LineElement, PointElement, Legend, Title, Tooltip } from 'chart.js'
ChartJs.register(
    LinearScale, CategoryScale, LineElement, PointElement, Legend , Title, Tooltip
)
const LineChartComp = () => {
    const chartData = {
        labels : ["jan" , "feb " , "fjdakls" , "jan" , "feb " , "fjdakls", "jan" , "feb " , "fjdakls", "jan" , "feb " , "fjdakls"],
       
        datasets : [
            {
                data : [440,32,432, 22, 222, 213, 43, 54, 543, 654 , 43, 434],
                label : "Sample Data set",
                borderColor : '#F38216',
                tension : 0.3,
                pointBackgroundColor: '#F38216'
                
            }
        ]
    }
    const chartOptions = {
        plugins: {
            legend: {
                // position : 'top',
                // align : 'end',
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
        maintainAspectRatio: false ,// 
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
    <div className='  secondary-shadow11 bg-success-512 h-[455px]'>
    <Line data={chartData} options={chartOptions} className='t'>

    </Line></div>
  )
}

export default LineChartComp