// Datos de ejemplo para movilidad (simulando BD)
const datosMovilidad = {
    viajesMensuales: {
        '2023': [15000, 14500, 16000, 15500, 17000, 16500, 18000, 18500, 17500, 17000, 16500, 18000],
        '2022': [12000, 12500, 13000, 13500, 14000, 14500, 15000, 15500, 15000, 14500, 14000, 15000]
    },
    distribucionZonas: {
        '2023': [35, 25, 20, 15, 5], // Porcentajes
        '2022': [40, 22, 18, 15, 5]
    },
    zonas: ['Centro', 'Norte', 'Sur', 'Oriente', 'Poniente']
};

let graficoLineas, graficoBarras;

function inicializarGraficos() {
    const ctxLineas = document.getElementById('grafico-lineas');
    const ctxBarras = document.getElementById('grafico-barras');
    const año = document.getElementById('filtro-tiempo').value;

    // Gráfico de líneas (Movilidad mensual)
    graficoLineas = new Chart(ctxLineas, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [{
                label: `Viajes ${año}`,
                data: datosMovilidad.viajesMensuales[año],
                borderColor: '#3498db',
                tension: 0.3,
                fill: true,
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 2,
                pointBackgroundColor: '#2980b9'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { 
                    position: 'top',
                    labels: { font: { size: 14 } }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.parsed.y.toLocaleString()} viajes`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: { callback: (value) => value.toLocaleString() }
                }
            }
        }
    });

    // Gráfico de barras (Distribución por zona)
    graficoBarras = new Chart(ctxBarras, {
        type: 'bar',
        data: {
            labels: datosMovilidad.zonas,
            datasets: [{
                label: `Distribución ${año}`,
                data: datosMovilidad.distribucionZonas[año],
                backgroundColor: [
                    '#3498db',
                    '#2ecc71',
                    '#e74c3c',
                    '#f39c12',
                    '#9b59b6'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.parsed.y}% de viajes`
                    }
                }
            },
            scales: {
                y: {
                    max: 100,
                    ticks: { callback: (value) => `${value}%` }
                }
            }
        }
    });
}

// Actualizar gráficos al cambiar filtros
document.getElementById('btn-actualizar').addEventListener('click', () => {
    graficoLineas.destroy();
    graficoBarras.destroy();
    inicializarGraficos();
});

// Carga inicial
document.addEventListener('DOMContentLoaded', inicializarGraficos);