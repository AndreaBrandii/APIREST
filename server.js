const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 80;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'helados' // Cambia el nombre de la base de datos a 'helados'
});

db.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.message);
    return;
  }
  console.log('Conexión a la base de datos establecida');
});

// Ruta para insertar un helado
app.post('/helados', (req, res) => {
  const { sabor, precio } = req.body; // Cambia 'palabra' a 'sabor' y agrega 'precio'
  const query = 'INSERT INTO helados_table (sabor, precio) VALUES (?, ?)'; // Ajusta la consulta

  db.query(query, [sabor, precio], (err, result) => {
    if (err) {
      console.error('Error al insertar el helado:', err);
      return res.status(500).send('Error al insertar el helado');
    }

    res.status(200).send('Helado insertado correctamente');
  });
});

// Ruta para obtener todos los helados
app.get('/helados', (req, res) => {
  const query = 'SELECT * FROM helados_table'; 

  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Ruta para modificar un helado por su ID
app.put('/helados/:id', (req, res) => {
  const { id } = req.params;
  const { sabor, precio } = req.body; // Cambia 'palabra' a 'sabor' y agrega 'precio'
  const query = 'UPDATE helados_table SET sabor = ?, precio = ? WHERE id = ?'; // Ajusta la consulta

  db.query(query, [sabor, precio, id], (err, result) => {
    if (err) throw err;
    res.send('Helado modificado correctamente');
  });
});

// Ruta para eliminar un helado por su ID
app.delete('/helados/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM helados_table WHERE id = ?'; // Ajusta la tabla a 'helados_table'

  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.send('Helado eliminado correctamente');
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});