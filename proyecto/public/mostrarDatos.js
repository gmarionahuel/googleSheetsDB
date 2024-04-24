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

            // Extrae el número de fila del final del array de turno
            const numeroDeFila = turno.pop(); 
            fila.setAttribute('row-number', numeroDeFila);

            turno.forEach(dato => {
                const celda = fila.insertCell();
                celda.textContent = dato;
            });
            let editarCelda = fila.insertCell();
editarCelda.classList.add('editar-celda'); // Añade la clase para aplicar estilos

let editarIcono = document.createElement('i');
editarIcono.className = 'fas fa-pencil-alt';
editarIcono.onclick = function() { editarTurno(numeroDeFila); };
editarCelda.appendChild(editarIcono);

let eliminarCelda = fila.insertCell();
eliminarCelda.classList.add('eliminar-celda'); // Añade la clase para aplicar estilos

let eliminarIcono = document.createElement('i');
eliminarIcono.className = 'fas fa-trash-alt';
eliminarIcono.onclick = function() { eliminarTurno(numeroDeFila); };
eliminarCelda.appendChild(eliminarIcono);
        });
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

window.addEventListener('DOMContentLoaded', mostrarDatosEnTabla);
