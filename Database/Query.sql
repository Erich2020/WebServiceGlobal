Create database persona;
Use persona;
Create Table persona(
id int primary key not null AUTO_INCREMENT,
nombre varchar (150),
apaterno varchar (100),
amaterno varchar (100),
domicilio text, 
telefono varchar (15)
);
