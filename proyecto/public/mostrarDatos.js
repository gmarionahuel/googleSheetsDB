// mostrarDatos.js en el cliente
async function mostrarDatosEnTabla() {
    try {
        const response = await fetch('http://localhost:5000/api/turnos');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const datosTurnos = await response.json();

        const tablaTurnos = document.getElementById('turnos-table').getElementsByTagName('tbody')[0];
        tablaTurnos.innerHTML = ''; 

        datosTurnos.forEach(turno => {
            const fila = tablaTurnos.insertRow();

            const numeroDeFila = turno.pop(); 
            fila.setAttribute('row-number', numeroDeFila);

            turno.forEach(dato => {
                const celda = fila.insertCell();
                celda.textContent = dato;
            });
            
        });
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

window.addEventListener('DOMContentLoaded', mostrarDatosEnTabla);
