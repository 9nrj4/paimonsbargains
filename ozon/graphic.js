// Дождемся загрузки DOM перед выполнением скрипта
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем Chart.js к странице
    const chartScript = document.createElement('script');
    chartScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js';
    document.head.appendChild(chartScript);

    // После загрузки Chart.js инициализируем графики
    chartScript.onload = function() {
        initCharts();
    };

    function initCharts() {
        // Получаем div для графика
        const graphicDiv = document.querySelector('.graphic');
        
        // Создаем структуру для дашборда
        graphicDiv.innerHTML = `
            <div class="dashboard">
                <div class="header">
                    <div class="title">Анализ продаж</div>
                </div>
                
                <div class="charts-container">
                    <div class="chart-card">
                        <div class="chart-header">
                            <div class="chart-title">Продажи, ₽</div>
                            <div class="total-value">Руб: 145 746 649 577 Шт: 91 837 113</div>
                        </div>
                        <div class="chart-container">
                            <canvas id="salesChart"></canvas>
                        </div>
                    </div>
                    
                    <div class="chart-card">
                        <div class="chart-header">
                            <div class="chart-title">Количество шт.</div>
                        </div>
                        <div class="chart-container">
                            <canvas id="quantityChart"></canvas>
                        </div>
                    </div>
                    
                    <div class="chart-card">
                        <div class="chart-header">
                            <div class="chart-title">Продавцы, шт.</div>
                        </div>
                        <div class="chart-container">
                            <canvas id="sellersChart"></canvas>
                        </div>
                    </div>
                    
                    <div class="chart-card">
                        <div class="chart-header">
                            <div class="chart-title">Бренды, шт.</div>
                        </div>
                        <div class="chart-container">
                            <canvas id="brandsChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Генерация дат за последний месяц (30 дней)
        function generateDates(count) {
            const dates = [];
            const today = new Date();
            
            for (let i = count - 1; i >= 0; i--) {
                const date = new Date();
                date.setDate(today.getDate() - i);
                dates.push(date.toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit'
                }));
            }
            
            return dates;
        }
        
        // Генерация случайных данных с некоторыми закономерностями
        function generateSalesData() {
            const baseline = 15000000;
            const data = [];
            
            for (let i = 0; i < 30; i++) {
                // Создаем недельные паттерны
                let dayFactor = 1;
                const weekday = i % 7;
                
                // Повышение на выходных
                if (weekday === 5 || weekday === 6) {
                    dayFactor = 1.4;
                }
                
                // Ежемесячная акция в середине
                let promoFactor = 1;
                if (i >= 13 && i <= 15) {
                    promoFactor = 2;
                }
                
                const randomFactor = 0.8 + Math.random() * 0.4;
                data.push(Math.floor(baseline * dayFactor * promoFactor * randomFactor));
            }
            
            return data;
        }
        
        // Генерация данных о количестве, коррелирующих с продажами
        function generateQuantityData(salesData) {
            return salesData.map(sale => Math.floor(sale / 1500));
        }
        
        // Генерация данных о продавцах (более стабильные)
        function generateSellersData() {
            const baseline = 80000;
            return Array(30).fill().map(() => Math.floor(baseline * (0.95 + Math.random() * 0.1)));
        }
        
        // Генерация данных о брендах (стабильные с небольшим ростом)
        function generateBrandsData() {
            const baseline = 130000;
            return Array(30).fill().map((_, i) => Math.floor(baseline * (1 + i * 0.001) * (0.98 + Math.random() * 0.04)));
        }
        
        // Метки дат
        const labels = generateDates(30);
        
        // Генерация наборов данных
        const salesData = generateSalesData();
        const quantityData = generateQuantityData(salesData);
        const sellersData = generateSellersData();
        const brandsData = generateBrandsData();
        
        // Помощник для создания конфигурации графиков
        function createBarLineChart(ctx, data, color, fill = true, showLine = false) {
            return new Chart(ctx, {
                type: showLine ? 'line' : 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: fill ? color + '40' : 'transparent',
                        borderColor: color,
                        borderWidth: showLine ? 2 : 1,
                        tension: 0.3,
                        pointRadius: showLine ? 2 : 0,
                        fill: fill
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: true,
                                color: '#f0f0f0'
                            },
                            ticks: {
                                maxRotation: 0,
                                autoSkip: true,
                                maxTicksLimit: 10
                            }
                        },
                        y: {
                            beginAtZero: true,
                            grid: {
                                display: true,
                                color: '#f0f0f0'
                            },
                            ticks: {
                                callback: function(value) {
                                    if (value >= 1000000) {
                                        return (value / 1000000).toFixed(1) + ' млн';
                                    } else if (value >= 1000) {
                                        return (value / 1000).toFixed(0) + ' тыс';
                                    }
                                    return value;
                                }
                            }
                        }
                    }
                }
            });
        }
        
        // Создание графиков
        const salesChart = createBarLineChart(
            document.getElementById('salesChart').getContext('2d'),
            salesData,
            '#f472b6'
        );
        
        const quantityChart = createBarLineChart(
            document.getElementById('quantityChart').getContext('2d'),
            quantityData,
            '#ec4899',
            false,
            true
        );
        
        const sellersChart = createBarLineChart(
            document.getElementById('sellersChart').getContext('2d'),
            sellersData,
            '#d946ef',
            false,
            true
        );
        
        const brandsChart = createBarLineChart(
            document.getElementById('brandsChart').getContext('2d'),
            brandsData,
            '#c026d3',
            false,
            true
        );
    }
});


