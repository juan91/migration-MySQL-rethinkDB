CREATE TABLE Cliente (
      DNI        char(9) NOT NULL,
      Nombre     varchar(10),
      Apellidos  varchar(30),
      Domicilio  CHAR(30),
      Telefono     varchar(9),
      PRIMARY KEY (DNI)
);


CREATE TABLE Precio (
      Tipo     VARCHAR(10) NOT NULL,
      precio     int,
      PRIMARY KEY (Tipo),
      CHECK (Tipo IN ('individual','doble'))
);


CREATE TABLE Habitacion (
      Numero     int NOT NULL,
      superficie     int,
      bar                 CHAR(2)    CHECK (bar IN ('SI','NO')),
      terraza             CHAR(2)    CHECK (terraza IN ('SI','NO')),
      puedesupletoria     CHAR(2)    CHECK (puedesupletoria IN ('SI','NO')),
      Tipo     VARCHAR(10) NOT NULL,
      PRIMARY KEY (Numero),
      FOREIGN KEY (Tipo) REFERENCES Precio (Tipo)
        ON DELETE NO ACTION
        ON UPDATE CASCADE
);


CREATE TABLE Reserva (
      DNI     char(9) NOT NULL,
      Numero     int NOT NULL,
      Entrada     datetime,
      Salida     datetime,
      PRIMARY KEY (DNI,Numero),
      FOREIGN KEY (DNI) REFERENCES Cliente (DNI)
        ON DELETE NO ACTION
        ON UPDATE CASCADE,
      FOREIGN KEY (Numero) REFERENCES Habitacion (Numero)
        ON DELETE NO ACTION
        ON UPDATE CASCADE
);


CREATE TABLE FormaPago (
      Forma     VARCHAR(8) NOT NULL,
      comision     int,
      PRIMARY KEY (Forma),
      CHECK (Forma IN ('efectivo','tarjeta','talon'))
);

CREATE TABLE Factura (
      CodigoF    int NOT NULL,
      Entrada     datetime,
      Salida     datetime,
      DNI     char(9),
      Numero     int NOT NULL,
      supletoria     int,
      Forma     VARCHAR(8) NOT NULL,
      Total     real,
      PRIMARY KEY (CodigoF),
      FOREIGN KEY (DNI) REFERENCES Cliente (DNI)
        ON DELETE NO ACTION
        ON UPDATE CASCADE,
      FOREIGN KEY (Numero) REFERENCES Habitacion (Numero)
        ON DELETE NO ACTION
        ON UPDATE CASCADE,
      FOREIGN KEY (Forma) REFERENCES FormaPago (Forma)
        ON DELETE NO ACTION
        ON UPDATE CASCADE

);


CREATE TABLE Empleado (
      NumReg     int NOT NULL,
      Nombre     varchar(32),
      Incorporacion     datetime,
      Sueldo     int,
      CodS     int,
      PRIMARY KEY (NumReg)
);


CREATE TABLE Servicio (
      CodS     int NOT NULL,
      Descripcion     CHAR(15),
      costeinterno     int,
      NumReg     int NOT NULL,
      PRIMARY KEY (CodS),
      FOREIGN KEY (NumReg) REFERENCES Empleado (NumReg)
        ON DELETE NO ACTION
        ON UPDATE CASCADE,
      CHECK (Descripcion IN ('tintoreria', 'plancha','lavanderia','bar','restaurante','floristeria'))

);


ALTER TABLE Empleado ADD FOREIGN KEY (CodS) REFERENCES Servicio (CodS)
ON DELETE NO ACTION
ON UPDATE NO ACTION;


CREATE TABLE Usa (
      CodS     int NOT NULL,
      Servicio_CodS  int NOT NULL,
      fecha     datetime NOT NULL,
      PRIMARY KEY (CodS,Servicio_CodS,fecha),
      FOREIGN KEY (CodS) REFERENCES Servicio (CodS)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
      FOREIGN KEY (Servicio_CodS) REFERENCES Servicio (CodS)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
);


CREATE TABLE Incluye (
      CodigoF     int NOT NULL,
      CodS     int NOT NULL,
      coste     int,
      fecha     datetime NOT NULL,
      PRIMARY KEY (CodigoF,CodS,fecha),
      FOREIGN KEY (CodigoF) REFERENCES Factura (CodigoF)
        ON DELETE NO ACTION
        ON UPDATE CASCADE,
      FOREIGN KEY (CodS) REFERENCES Servicio (CodS)
        ON DELETE NO ACTION
        ON UPDATE CASCADE
);


CREATE TABLE Proveedor (
      NIF     varchar(10) NOT NULL,
      Nombre     varchar(16),
      Direccion     CHAR(30),
      NumReg     int NOT NULL,
      PRIMARY KEY (NIF),
      FOREIGN KEY (NumReg) REFERENCES Empleado (NumReg)
        ON DELETE NO ACTION
        ON UPDATE CASCADE
);


CREATE TABLE Factura_Prov (
      CodFP     int NOT NULL,
      Fecha     datetime,
      Importe     int,
      NIF     varchar(10) NOT NULL,
      NumReg     int NOT NULL,
      PRIMARY KEY (CodFP),
      FOREIGN KEY (NIF) REFERENCES Proveedor (NIF)
        ON DELETE NO ACTION
        ON UPDATE CASCADE,
      FOREIGN KEY (NumReg) REFERENCES Empleado (NumReg)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
);



CREATE TABLE Limpieza (
      NumReg     int NOT NULL,
      Numero     int NOT NULL,
      Fecha     datetime NOT NULL,
      PRIMARY KEY (NumReg,Numero,Fecha),
      FOREIGN KEY (NumReg) REFERENCES Empleado (NumReg)
        ON DELETE NO ACTION
        ON UPDATE CASCADE,
      FOREIGN KEY (Numero) REFERENCES Habitacion (Numero)
        ON DELETE NO ACTION
        ON UPDATE CASCADE
);