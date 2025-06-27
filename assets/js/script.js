// Variables globales para los gráficos
let graficoLineas, graficoBarras;

// Función para inicializar los gráficos con datos reales
async function inicializarGraficos() {
    const año = document.getElementById('filtro-tiempo').value;
    
    try {
        // Obtener datos reales del servidor
        const response = await fetch(`php/obtener_datos_graficos.php?año=${año}`);
        const datosReales = await response.json();
        
        const ctxLineas = document.getElementById('grafico-lineas');
        const ctxBarras = document.getElementById('grafico-barras');

        // Destruir gráficos anteriores si existen
        if (graficoLineas) graficoLineas.destroy();
        if (graficoBarras) graficoBarras.destroy();

        // Gráfico de líneas (Movilidad mensual)
        graficoLineas = new Chart(ctxLineas, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [{
                    label: `Viajes ${año}`,
                    data: datosReales.viajesMensuales,
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
                labels: datosReales.zonas,
                datasets: [{
                    label: `Distribución ${año}`,
                    data: datosReales.distribucionZonas,
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
    } catch (error) {
        console.error('Error al cargar datos para gráficos:', error);
        alert('Error al cargar datos. Por favor intente más tarde.');
    }
}

// Función para obtener el conteo real de viajes
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el conteo total de viajes
    fetch('../api/viajes.php')
        .then(response => response.text())
        .then(data => {
            document.getElementById('total-records').textContent = data;
        })
        .catch(error => {
            console.error('Error al obtener el conteo de viajes:', error);
            document.getElementById('total-records').textContent = 'Error al cargar datos';
        });
    });

// Manejo de los enlaces de visualización
function configurarEnlacesVisualizacion() {
    document.querySelectorAll('.section-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-target');
            
            // Ocultar todos los contenidos
            document.querySelectorAll('.visualization-info').forEach(content => {
                content.classList.remove('active');
            });
            
            // Mostrar el contenido seleccionado
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Resaltar el enlace activo
            document.querySelectorAll('.section-link').forEach(l => {
                l.classList.remove('active-link');
            });
            this.classList.add('active-link');
        });
    });
}

// Actualizar gráficos al cambiar filtros
document.getElementById('btn-actualizar').addEventListener('click', inicializarGraficos);

// Carga inicial cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Configurar elementos iniciales
    configurarEnlacesVisualizacion();
    
    // Cargar datos iniciales
    obtenerConteoViajes();
    inicializarGraficos();
});