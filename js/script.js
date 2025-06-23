// Datos de ejemplo (simulando BD)
const datosEjemplo = {
    ventasMensuales: {
        '2023': [12000, 19000, 15000, 18000, 21000, 22000, 25000, 23000, 20000, 18000, 19000, 21000],
        '2022': [10000, 12000, 11000, 13000, 15000, 17000, 19000, 18000, 16000, 14000, 13000, 15000]
    },
    distribucionRegion: {
        '2023': [30, 25, 20, 15, 10],
        '2022': [35, 20, 18, 17, 10]
    },
    regiones: ['Norte', 'Sur', 'Este', 'Oeste', 'Centro']
};

// Inicialización de gráficos
let graficoLineas, graficoBarras;

function inicializarGraficos() {
    const ctxLineas = document.getElementById('grafico-lineas');
    const ctxBarras = document.getElementById('grafico-barras');
    const año = document.getElementById('filtro-tiempo').value;

    // Gráfico de líneas
    graficoLineas = new Chart(ctxLineas, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [{
                label: `Ventas ${año}`,
                data: datosEjemplo.ventasMensuales[año],
                borderColor: '#6e8efb',
                tension: 0.1,
                fill: true,
                backgroundColor: 'rgba(110, 142, 251, 0.1)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' }
            }
        }
    });

    // Gráfico de barras
    graficoBarras = new Chart(ctxBarras, {
        type: 'bar',
        data: {
            labels: datosEjemplo.regiones,
            datasets: [{
                label: `Distribución ${año}`,
                data: datosEjemplo.distribucionRegion[año],
                backgroundColor: [
                    '#6e8efb',
                    '#a777e3',
                    '#4acccd',
                    '#fcc468',
                    '#ff6b6b'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Evento para actualizar gráficos
document.getElementById('btn-actualizar').addEventListener('click', () => {
    graficoLineas.destroy();
    graficoBarras.destroy();
    inicializarGraficos();
});

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', inicializarGraficos);