const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const credentials = require('./credenciales.json');

const app = express();
app.use(cors()); // Habilita CORS para todas las rutas

const port = 5000; // El puerto en el que va a correr tu servidor

// Configuración del cliente JWT para Google API
const client = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

// Middlewares
app.get('/api/turnos', async (req, res) => {
    const sheets = google.sheets({ version: 'v4', auth: client });
    const spreadsheetId = '1d7EdWhjlev2l20ZrbPC7gBalrqhp7MXlPuTgEHiM8Gk';
    const sheetName = 'database';
    const startRow = 2;
    const range = `${sheetName}!A${startRow}:E`;
  
    try {
      const response = await sheets.spreadsheets.values.get({ spreadsheetId, range });
      let values = response.data.values || [];
      
      // Filtrar las filas que tengan todas las celdas vacías y añadir el número de fila al final
      values = values
        .map((row, index) => {
          // Añadir el número de fila al final de cada fila de datos
          return [...row, startRow + index];
        })
        .filter(row => row.some(cell => cell && cell.trim() !== '')); // Asegúrate de que la fila no esté completamente vacía
      
      res.json(values); // Envía los datos, incluyendo el número de fila, como JSON al cliente
    } catch (error) {
      console.error('The API returned an error: ' + error);
      res.status(500).send('Error al recuperar los datos');
    }
  });

// Inicializar el servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
