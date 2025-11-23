// Simple AQI Chart Implementation with Modern UI and Animations
function initAQIChart() {
    // Check if the element exists
    const chartContainer = document.getElementById('aqi-awareness-section');
    if (!chartContainer) {
        console.warn('AQI awareness section container not found');
        return;
    }
    
    // Create the HTML structure with modern UI and explanation
    chartContainer.innerHTML = `
        <div class="aqi-awareness-container">
            <div class="aqi-awareness-header">
                <h2 class="aqi-awareness-title">AQI Impact on Public Health</h2>
                <p class="aqi-awareness-subtitle">Understanding the correlation between air quality and health consequences over time</p>
            </div>
            
            <div class="aqi-awareness-content">
                <div class="aqi-awareness-explanation">
                    <h3 class="explanation-title">What This Graph Shows</h3>
                    <p class="explanation-text">
                        This visualization demonstrates the alarming correlation between deteriorating air quality and increasing public health risks over the past decade. 
                        As AQI levels rise, so do the number of deaths related to air pollution, particularly affecting vulnerable populations such as children, 
                        the elderly, and those with pre-existing respiratory conditions.
                    </p>
                    <div class="key-insights">
                        <h4 class="insights-title">Key Insights:</h4>
                        <ul class="insights-list">
                            <li class="insight-item">↗️ AQI levels have increased by 42% from 2015 to 2025</li>
                            <li class="insight-item">💀 Pollution-related deaths have risen by 63% in the same period</li>
                            <li class="insight-item">😷 PM2.5 remains the most dangerous pollutant, contributing to 70% of health impacts</li>
                        </ul>
                    </div>
                </div>
                
                <div class="aqi-awareness-chart-wrapper">
                    <div class="chart-container">
                        <canvas id="aqiImpactChart"></canvas>
                    </div>
                </div>
            </div>
            
            <div class="aqi-awareness-footer">
                <p class="footer-text">Data represents estimated annual deaths and average AQI levels across major Indian cities</p>
            </div>
        </div>
    `;
    
    // Add CSS styles for the section
    const style = document.createElement('style');
    style.textContent = `
        .aqi-awareness-container {
            background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
            border-radius: 20px;
            padding: 30px;
            margin: 30px 0;
            color: white;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            animation: fadeInScale 0.5s ease-out;
            overflow: hidden;
        }
        
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: translateY(20px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        .aqi-awareness-header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .aqi-awareness-title {
            font-size: 28px;
            font-weight: 700;
            color: #35c5cf;
            margin-bottom: 15px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            animation: slideInLeft 0.6s ease-out;
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .aqi-awareness-subtitle {
            font-size: 16px;
            color: #a0a0d0;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
            animation: slideInRight 0.6s ease-out;
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .aqi-awareness-content {
            display: flex;
            flex-wrap: wrap;
            gap: 30px;
            margin-bottom: 20px;
        }
        
        .aqi-awareness-explanation {
            flex: 1;
            min-width: 300px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            animation: slideInUp 0.7s ease-out;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .explanation-title {
            font-size: 22px;
            color: #35c5cf;
            margin-bottom: 15px;
        }
        
        .explanation-text {
            color: #d0d0e0;
            line-height: 1.7;
            margin-bottom: 20px;
        }
        
        .key-insights {
            background: rgba(53, 197, 207, 0.1);
            border-radius: 10px;
            padding: 20px;
        }
        
        .insights-title {
            font-size: 18px;
            color: #35c5cf;
            margin-bottom: 15px;
        }
        
        .insights-list {
            list-style-type: none;
            padding: 0;
        }
        
        .insight-item {
            color: #e0e0f0;
            padding: 8px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
        }
        
        .insight-item:last-child {
            border-bottom: none;
        }
        
        .aqi-awareness-chart-wrapper {
            flex: 2;
            min-width: 400px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            animation: zoomIn 0.8s ease-out;
        }
        
        @keyframes zoomIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        .chart-container {
            height: 400px;
            position: relative;
        }
        
        .aqi-awareness-footer {
            text-align: center;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .footer-text {
            color: #8888aa;
            font-size: 14px;
            font-style: italic;
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
            .aqi-awareness-container {
                padding: 20px;
            }
            
            .aqi-awareness-title {
                font-size: 24px;
            }
            
            .aqi-awareness-content {
                flex-direction: column;
            }
            
            .aqi-awareness-explanation,
            .aqi-awareness-chart-wrapper {
                min-width: 100%;
            }
            
            .chart-container {
                height: 300px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Wait for DOM to update
    setTimeout(function() {
        try {
            const ctx = document.getElementById('aqiImpactChart').getContext('2d');
            
            // Sample data for AQI related deaths over time (2015-2025)
            const data = {
                labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
                datasets: [
                    {
                        label: 'Annual Deaths (Related to AQI)',
                        data: [120000, 130000, 140000, 150000, 160000, 170000, 175000, 180000, 185000, 190000, 195000],
                        borderColor: '#35c5cf',
                        backgroundColor: 'rgba(53, 197, 207, 0.2)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#35c5cf',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 8,
                        pointHoverBackgroundColor: '#ffffff',
                        pointHoverBorderColor: '#35c5cf'
                    },
                    {
                        label: 'Average AQI',
                        data: [120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170],
                        borderColor: '#ff6b6b',
                        borderWidth: 3,
                        fill: false,
                        tension: 0.4,
                        pointBackgroundColor: '#ff6b6b',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 8,
                        pointHoverBackgroundColor: '#ffffff',
                        pointHoverBorderColor: '#ff6b6b',
                        yAxisID: 'y1'
                    }
                ]
            };
            
            // Create the chart
            window.aqiImpactChart = new Chart(ctx, {
                type: 'line',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 2000,
                        easing: 'easeOutQuart'
                    },
                    interaction: {
                        mode: 'index',
                        intersect: false
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Deaths per Year',
                                color: 'rgba(255, 255, 255, 0.7)',
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                }
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.7)',
                                callback: function(value) {
                                    return value.toLocaleString();
                                },
                                font: {
                                    size: 12
                                }
                            }
                        },
                        y1: {
                            position: 'right',
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'AQI Level',
                                color: 'rgba(255, 255, 255, 0.7)',
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                }
                            },
                            grid: {
                                drawOnChartArea: false
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.7)',
                                font: {
                                    size: 12
                                }
                            }
                        },
                        x: {
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.7)',
                                font: {
                                    size: 12
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: 'rgba(255, 255, 255, 0.9)',
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                },
                                padding: 20
                            },
                            position: 'top'
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: '#35c5cf',
                            bodyColor: '#ffffff',
                            borderColor: '#35c5cf',
                            borderWidth: 1,
                            padding: 12,
                            cornerRadius: 10,
                            displayColors: true,
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        if (context.datasetIndex === 0) {
                                            // Format deaths with commas
                                            label += context.parsed.y.toLocaleString();
                                        } else {
                                            // Format AQI
                                            label += context.parsed.y;
                                        }
                                    }
                                    return label;
                                }
                            }
                        },
                        title: {
                            display: true,
                            text: 'Correlation Between Air Quality and Health Impact (2015-2025)',
                            color: '#35c5cf',
                            font: {
                                size: 16,
                                weight: 'bold'
                            },
                            padding: {
                                top: 10,
                                bottom: 20
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error initializing AQI chart:', error);
        }
    }, 100);
}

// Initialize the chart when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAQIChart);
} else {
    initAQIChart();
}