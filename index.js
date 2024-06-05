const { app, PORT } = require('./config');

require('./app');

//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto: ${PORT}`);
});