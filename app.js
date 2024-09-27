// Configuración de Supabase
const supabaseUrl = 'https://qiuemjqtqiyyxumrkdga.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpdWVtanF0cWl5eXh1bXJrZGdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjczODgyMDMsImV4cCI6MjA0Mjk2NDIwM30.9R7O3A_sVy01z6OgjseBxxks5J5CdVlYnyffAiEV3So';

// Función para obtener los mensajes desde Supabase
async function obtenerMensajes() {
    const response = await fetch(`${supabaseUrl}/rest/v1/mensajes`, {
        headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const mensajes = await response.json();
        mostrarMensajes(mensajes);
    } else {
        console.error('Error al obtener los mensajes:', response.status, response.statusText);
    }
}

// Función para mostrar los mensajes en la tabla
function mostrarMensajes(mensajes) {
    const tbody = document.querySelector('#messagesTable tbody');
    tbody.innerHTML = '';  // Limpiar contenido anterior
    mensajes.forEach(mensaje => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${mensaje.id}</td>
            <td>${mensaje.mensaje}</td>
        `;
        tbody.appendChild(row);
    });
}

// Función para filtrar los mensajes por búsqueda
document.querySelector('#search').addEventListener('input', function() {
    const searchText = this.value.toLowerCase();
    const rows = document.querySelectorAll('#messagesTable tbody tr');
    rows.forEach(row => {
        const mensaje = row.cells[1].textContent.toLowerCase();
        row.style.display = mensaje.includes(searchText) ? '' : 'none';
    });
});

// Llamar a la función para obtener los mensajes cuando cargue la página
obtenerMensajes();
