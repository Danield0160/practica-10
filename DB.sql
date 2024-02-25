-- Active: 1708622702748@@127.0.0.1@3306@practica_10_drm
Drop DATABASE if EXISTS practica_10_DRM;

create DATABASE practica_10_DRM;

-- CREATE USER 'practica_10_user_DRM' @'localhost' IDENTIFIED BY 'password';
-- GRANT ALL PRIVILEGES ON practica_10_DRM.* TO 'practica_10_user_DRM' @'localhost';
-- FLUSH PRIVILEGES;

use practica_10_DRM;

create table productos (
    id int PRIMARY KEY AUTO_INCREMENT, 
    nombre VARCHAR(30), 
    precio DECIMAL(6, 2), 
    disponibilidad INT, 
    imagen VARCHAR(100)
);
create table productos_info(
    id_producto int,
    idioma VARCHAR(5),
    descripcion VARCHAR(100),
    PRIMARY key (id_producto,idioma)
);

CREATE table usuarios (
    id int PRIMARY key AUTO_INCREMENT, 
    nombre VARCHAR(30), 
    fecha_nacimiento DATE, 
    passw VARCHAR(30), 
    correo VARCHAR(20) UNIQUE, 
    banco VARCHAR(10),
    telefono VARCHAR(9)
);

insert into
    productos ()
VALUES(
        1, "BERGMUND", 80, 50, "https://www.ofisillas.es/images/product/1/large/pl_1_1_449.jpg"
    ),
    (
        2, "KOMPLEMENT", 250.2, 8, "https://media.adeo.com/marketplace/LMES/87312498/3511425.jpeg?width=3000&height=3000&format=jpg&quality=80&fit=bounds"
    ),
    (
        3, "ORRSJÖN", 350.80, 6, "https://media.adeo.com/marketplace/LMES/83969905/2977441.jpeg"
    ),
    (
        4, "EKTORP", 125, 10, "https://www.mueblesvalencia.es/8723-large_default/sofa-moderno-modelo-3-tienda-muebles-madrid.jpg"
    ),
    (
        5, "MELLTORP", 150.2, 0, "https://www.oficinasmontiel.com/78765-large_default/mesa-oficina-140-160-y-180-cm-plus-de-kunna.jpg"
    );

insert INTO
    productos_info()
VALUES(
        1,"ES","Una buen silla de madera"
    ),
    (
        1, "EN" ,"A very good chair"
    ),
    (
        2,"ES","Un buen armario de madera"
    ),
    (
        2, "EN" ,"A very good wooden wardrobe"
    ),
    (
        3,"ES","Un buen labavo de porcelana"
    ),
    (
        3, "EN" ,"A very good porcelain sink"
    ),
    (
        4,"ES","Un buen sofa de tela"
    ),
    (
        4, "EN" ,"A very good fabric sofa"
    ),
    (
        5,"ES","Una buen mesa de madera"
    ),
    (
        5, "EN" ,"A very good wooden table"
    );

insert into
    usuarios ()
values (
        1, "admin", "2001/03/05", "adminA123_?a", "admin@admin.com", "1234567891234567891234","123456789"
    )