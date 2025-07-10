import React, { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Riepilogo = () => {
    const [averages, setAverages] = useState({});
    const [chartData, setChartData] = useState([]);

        useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://afast-backend.vercel.app/get', {
                // const response = await fetch('http://localhost:8000/get', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data = await response.json();
                setAverages(data);
            } catch (error) {
                console.error('Error saving results:', error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        console.log('avgerages', averages);
        setChartData([
            {
                labels: ['Credito', 'Remaining'],
                datasets: [{
                    label: 'Credito',
                    data: [averages.avg_credito, 100 - averages.avg_credito],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)', // purple
                        'rgba(54, 162, 235, 0.2)' // blue
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)', // purple
                        'rgba(54, 162, 235, 1)' // blue
                    ],
                    borderWidth: 1
                }]
            },
            // {
            //     labels: ['Canali', 'Remaining'],
            //     datasets: [{
            //         label: 'Canali',
            //         data: [averages.avg_canali, 100 - averages.avg_canali],
            //         backgroundColor: [
            //             'rgba(255, 206, 86, 0.2)', // yellow
            //             'rgba(75, 192, 192, 0.2)' // green
            //         ],
            //         borderColor: [
            //             'rgba(255, 206, 86, 1)', // yellow
            //             'rgba(75, 192, 192, 1)' // green
            //         ],
            //         borderWidth: 1
            //     }]
            // },
            // {
            //     labels: ['Finanza', 'Remaining'],
            //     datasets: [{
            //         label: 'Finanza',
            //         data: [averages.avg_finanza, 100 - averages.avg_finanza],
            //         backgroundColor: [
            //             'rgba(255, 159, 64, 0.2)', // orange
            //             'rgba(153, 102, 255, 0.2)' // purple
            //         ],
            //         borderColor: [
            //             'rgba(255, 159, 64, 1)', // orange
            //             'rgba(153, 102, 255, 1)' // purple
            //         ],
            //         borderWidth: 1
            //     }]
            // },
            // {
            //     labels: ['Pagamenti', 'Remaining'],
            //     datasets: [{
            //         label: 'Pagamenti',
            //         data: [averages.pagamenti, 100 - averages.pagamenti],
            //         backgroundColor: [
            //             'rgba(75, 192, 192, 0.2)', // green
            //             'rgba(255, 99, 132, 0.2)' // purple
            //         ],
            //         borderColor: [
            //             'rgba(75, 192, 192, 1)', // green
            //             'rgba(255, 99, 132, 1)' // purple
            //         ],
            //         borderWidth: 1
            //     }]
            // },
            // {
            //     labels: ['Risk', 'Remaining'],
            //     datasets: [{
            //         label: 'Risk',
            //         data: [averages.risk, 100 - averages.risk],
            //         backgroundColor: [
            //             'rgba(153, 102, 255, 0.2)', // purple
            //             'rgba(255, 159, 64, 0.2)' // orange
            //         ],
            //         borderColor: [
            //             'rgba(153, 102, 255, 1)', // purple
            //             'rgba(255, 159, 64, 1)' // orange
            //         ],
            //         borderWidth: 1
            //     }]
            // }
        ] || []);
    }, [averages]);

    useEffect(()=>{
        console.log(chartData);
    }, [chartData]);

    useEffect(() => {
        const charts = chartData.map((chart, index) => {
            const ctx = document.getElementById(`chart${index + 1}`).getContext('2d');
            let chartInstance;
            if (ctx) {
                chartInstance = new Chart(ctx, {
                    type: 'pie',
                    data: chart,
                    options: {
                        title: {
                            display: true,
                            text: chart.labels[0]
                        },
                        legend: {
                            display: false
                        }
                    }
                });
            }
            return chartInstance;
        });

        return () => {
            charts.forEach((chart) => {
                if (chart) chart.destroy();
            });
        };
    }, [averages]);

    return (
        <div>
            <header className="header-area header-sticky">
                <div className="container-left">
                    <div className="row">
                        <div className="col-12">
                            <nav className="main-nav">
                                <div className='logo'>
                                    <h1 href="/">AFAST</h1>
                                </div>
                                <div>
                                    <h1 style={{ color: 'white' }}>LOGIN</h1>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>

            <div className="main-banner" id="top">
                <div className="container">
                    <div className="charts" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <canvas id="chart1" width="1000" height="1000"></canvas>
                        {/* <canvas id="chart2" width="200" height="200"></canvas> */}
                        {/* <canvas id="chart3" width="200" height="200"></canvas>
                        <canvas id="chart4" width="200" height="200"></canvas>
                        <canvas id="chart5" width="200" height="200"></canvas> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Riepilogo;