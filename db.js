const mysql = require('mysql');

const { dbConfig } = require('./config');

//Crear la conexión a la base de datos
const connection = mysql.createConnection(dbConfig);

connection.connect ((err) => {
    if(err){
        console.error('Error al conectar con la base de datos!!!');
        return;
    }
    console.log('Conexión a la base de datos exitoso!!!');
});

module.exports = connection;