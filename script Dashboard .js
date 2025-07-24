// Datos del dashboard
const dashboardData = {
    "kpis": [
        {
            "title": "Ventas Totales",
            "value": "$1,234,567",
            "change": "+12%",
            "trend": "up"
        },
        {
            "title": "Nuevos Clientes",
            "value": "8,765",
            "change": "+8%",
            "trend": "up"
        },
        {
            "title": "Tasa de Conversión",
            "value": "3.5%",
            "change": "-0.2%",
            "trend": "down"
        },
        {
            "title": "Ingreso Promedio por Cliente",
            "value": "$140",
            "change": "+5%",
            "trend": "up"
        }
    ],
    "sales_by_month": [
        { "month": "Ene", "sales": 100000 },
        { "month": "Feb", "sales": 120000 },
        { "month": "Mar", "sales": 150000 },
        { "month": "Abr", "sales": 130000 },
        { "month": "May", "sales": 160000 },
        { "month": "Jun", "sales": 180000 },
        { "month": "Jul", "sales": 170000 }
    ],
    "sales_by_category": [
        { "category": "Electrónica", "sales": 400000 },
        { "category": "Ropa", "sales": 300000 },
        { "category": "Hogar", "sales": 250000 },
        { "category": "Libros", "sales": 150000 },
        { "category": "Otros", "sales": 134567 }
    ],
    "top_products": [
        { "name": "Laptop X1", "sales": 80000, "units": 200 },
        { "name": "Smartphone Pro", "sales": 70000, "units": 350 },
        { "name": "Auriculares BT", "sales": 50000, "units": 500 },
        { "name": "Smart TV 4K", "sales": 60000, "units": 150 },
        { "name": "Cámara Digital", "sales": 45000, "units": 100 }
    ]
};

// Función para crear las tarjetas KPI
function createKPICards() {
    const container = document.querySelector('.kpi-cards-container');
    
    dashboardData.kpis.forEach(kpi => {
        const card = document.createElement('div');
        card.className = 'kpi-card';
        
        const trendIcon = kpi.trend === 'up' ? '↗' : '↘';
        const changeClass = kpi.trend === 'up' ? 'positive' : 'negative';
        
        card.innerHTML = `
            <h3>${kpi.title}</h3>
            <div class="kpi-value">${kpi.value}</div>
            <div class="kpi-change ${changeClass}">
                <span class="trend-icon">${trendIcon}</span>
                ${kpi.change}
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Función para crear el gráfico de ventas mensuales
function createSalesChart() {
    const ctx = document.getElementById('salesByMonthChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dashboardData.sales_by_month.map(item => item.month),
            datasets: [{
                label: 'Ventas ($)',
                data: dashboardData.sales_by_month.map(item => item.sales),
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + (value / 1000) + 'K';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            elements: {
                point: {
                    hoverBackgroundColor: '#764ba2'
                }
            }
        }
    });
}

// Función para crear el gráfico de ventas por categoría
function createCategoryChart() {
    const ctx = document.getElementById('salesByCategoryChart').getContext('2d');
    
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'];
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: dashboardData.sales_by_category.map(item => item.category),
            datasets: [{
                data: dashboardData.sales_by_category.map(item => item.sales),
                backgroundColor: colors,
                borderWidth: 0,
                hoverBorderWidth: 3,
                hoverBorderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                }
            },
            cutout: '60%'
        }
    });
}

// Función para crear la tabla de productos más vendidos
function createTopProductsTable() {
    const tbody = document.querySelector('#topProductsTable tbody');
    
    dashboardData.top_products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>$${product.sales.toLocaleString()}</td>
            <td>${product.units}</td>
        `;
        tbody.appendChild(row);
    });
}

// Función para añadir efectos de animación
function addAnimationEffects() {
    // Animación de contadores para los KPIs
    const kpiValues = document.querySelectorAll('.kpi-value');
    
    kpiValues.forEach(element => {
        const text = element.textContent;
        if (text.includes('$') || text.includes('%')) {
            element.style.opacity = '0';
            setTimeout(() => {
                element.style.transition = 'opacity 0.5s ease';
                element.style.opacity = '1';
            }, 300);
        }
    });
    
    // Efecto hover para las tarjetas
    const cards = document.querySelectorAll('.kpi-card, .chart-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Función para hacer el dashboard responsive
function makeResponsive() {
    const charts = Chart.instances;
    
    window.addEventListener('resize', () => {
        Object.values(charts).forEach(chart => {
            chart.resize();
        });
    });
}

// Función principal de inicialización
function initDashboard() {
    createKPICards();
    createSalesChart();
    createCategoryChart();
    createTopProductsTable();
    addAnimationEffects();
    makeResponsive();
    
    // Añadir efecto de carga
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
}

// Inicializar el dashboard cuando se carga la página
document.addEventListener('DOMContentLoaded', initDashboard);

// Función para actualizar datos (simulación de tiempo real)
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Simular cambios pequeños en los datos
        const randomKPI = Math.floor(Math.random() * dashboardData.kpis.length);
        const kpiCards = document.querySelectorAll('.kpi-card');
        
        if (kpiCards[randomKPI]) {
            kpiCards[randomKPI].style.transform = 'scale(1.05)';
            setTimeout(() => {
                kpiCards[randomKPI].style.transform = 'scale(1)';
            }, 200);
        }
    }, 5000);
}

// Iniciar simulación de actualizaciones en tiempo real
setTimeout(simulateRealTimeUpdates, 3000);

