CREATE TABLE contacts(
    id                  int(11) auto_increment not null,
    nombre_contacto     varchar(150) not null,
    apellido_contacto   varchar(200) not null,
    correo_contacto     varchar(200) not null,
    telefono_contacto   int(12) not null,
    mensaje             varchar(300) not null,
    CONSTRAINT pk_contacts PRIMARY KEY(id)            
);

CREATE TABLE usuarios (
    id                      int(11) auto_increment not null,
    nombre_usuario          varchar(100) not null,
    apellido_usuario        varchar(100) not null,
    identificacion_usuario  int(12) not null,
    correo_usuario          varchar(200) not null,
    telefono_usuario        int(12) not null,
    direccion_usuario       varchar(200) not null,
    contraseña              varchar(200) not null,
    CONSTRAINT pk_usuarios PRIMARY KEY(id)
)