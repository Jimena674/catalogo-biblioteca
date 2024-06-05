const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

//resolver las rutas estáticas
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'public/views'));

//Configuración de la conexión a la base de datos
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bpa'
}

module.exports = { app, PORT, dbConfig } ;
