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
    imagen VARCHAR(100), 
    descripcion varchar(100)
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
VALUES (
        5, "mesa", 150.2, 0, "https://static.islas.ikea.es/assets/images/590/0859014_PE624334_S4.webp", "una buena mesa de roble macizo"
    ),
    (
        1, "silla", 80, 50, "https://static.islas.ikea.es/assets/images/848/0484875_PE621342_S4.webp", "una buena silla de mazos de robles"
    ),
    (
        2, "armario", 250.2, 8, "https://www.ikea-club.org/cache/zoo_images/2/2b8a4cb398df2c67c1253afc63b0caa2.jpg", "un buen armario de roblados mazcizos"
    ),
    (
        3, "lavabo", 350.80, 6, "https://www.ikea.com/images/23/96/23966f1e8220f77d8526c64eae36c4af.jpeg?f=s", "un buen lavabo de mazados de roble"
    ),
    (
        4, "sofa", 125, 10, "https://www.ikea.com/es/es/images/products/hemnes-mueble-salon-marron-claro__0805270_pe769480_s5.jpg", "un buen sofa de roblados de mazo"
    );

insert into
    usuarios ()
values (
        1, "admin", "2001/03/05", "admin", "admin@admin.com", "1234567891234567891234","123456789"
    )