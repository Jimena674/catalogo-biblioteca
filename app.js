const { app } = require('./config');

const db = require('./db');

const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');

const session = require('express-session');

//Configuración de la sesión que está entrando
app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: true
}));

//Configuración del body-parser para analizar solicitudes POST
app.use(bodyParser.urlencoded({ extended: true }));

//defino ruta de la URL
app.get('/', (req, res) => {
    res.render('general-home');
});

app.get('/advance-home', (req, res) => {
    res.render('advance-home');
});

app.get('/contact', (req, res) => {
    const message = req.query.message || null;
    res.render('contact', { message:null });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/spotlight', (req, res) => {
    res.render('spotlight');
});

//Rutas administrativas
app.get('/admin', (req, res) => {
    res.render('admin');
});

//Ruta para insertar formulario contactos
app.post('/SubmitContact', (req, res) => {
    const { nombre_contacto, apellido_contacto, correo_contacto, telefono_contacto, mensaje } = req.body;

    db.query('INSERT INTO contacts (nombre_contacto, apellido_contacto, correo_contacto, telefono_contacto, mensaje) VALUE (?, ?, ?, ?, ?)', [nombre_contacto, apellido_contacto, correo_contacto, telefono_contacto, mensaje], (err, result) => {
        if(err) {
            console.log(err);
            res.send('Error al insertar usuario');
        } else {
            console.log(result);
            res.render('contact', {message: 'Nos pondremos en contacto contigo en brevedad'});
            //res.send('Usuario insertado con éxito!!!');
        }
    });
});


// Ruta para insertar el formulario de registro de usuario
app.post('/signup', async (req, res) => {
    const { nombre_usuario, apellido_usuario, identificacion_usuario, correo_usuario, telefono_usuario, direccion_usuario, contraseña } = req.body;
    const hashedContraseña = await bcrypt.hash(contraseña, 10);

    db.query('INSERT INTO usuarios (nombre_usuario, apellido_usuario, identificacion_usuario, correo_usuario, telefono_usuario, direccion_usuario, contraseña) VALUES (?, ?, ?, ?, ?, ?, ?)', [nombre_usuario, apellido_usuario, identificacion_usuario, correo_usuario, telefono_usuario, direccion_usuario, hashedContraseña], (err, result) => {
        if(err) {
            console.log(err);
            res.send('Error al registrar usuario');
        } else {
            console.log(result);
            //res.render('signup', {message: 'Usuario registrado con éxito!'});
            res.send('Usuario registrado con éxito!');
        }
    });
});

//Ruta para insertar el formulario de ingreso de usuario
app.post('/login', async (req, res) => {
    const { correo_usuario, contraseña } = req.body;

    db.query('SELECT * FROM usuarios WHERE correo_usuario = ?', [correo_usuario], async (err, result) => {
        if(err){
            console.log(err);
            res.send('Error al iniciar sesión');
        } else {
            if(result.length > 0) {
                const usuario = result[0];
                if(await bcrypt.compare(contraseña, usuario.contraseña)){
                    req.session.usuario = usuario;
                    res.send('Inicio de sesión exitoso!');
                } else {
                    res.send('Credenciales incorrectas');
                }
            } else {
                res.send('Usuario no encontrado')
            }
        }
    });
});

module.exports = app;