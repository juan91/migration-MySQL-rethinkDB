-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: hotel
-- ------------------------------------------------------
-- Server version	5.7.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Cliente`
--

DROP TABLE IF EXISTS `Cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Cliente` (
  `DNI` char(9) NOT NULL,
  `Nombre` varchar(10) DEFAULT NULL,
  `Apellidos` varchar(30) DEFAULT NULL,
  `Domicilio` char(30) DEFAULT NULL,
  `Telefono` varchar(9) DEFAULT NULL,
  PRIMARY KEY (`DNI`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cliente`
--

LOCK TABLES `Cliente` WRITE;
/*!40000 ALTER TABLE `Cliente` DISABLE KEYS */;
INSERT INTO `Cliente` VALUES ('000000','Francisco','Vilansó Rodríguez','General Rodrigos 24','999666565'),('111111','Antonio','Aguirre','Pez 20, 1º A','999418768'),('222222','Jorge','Anguiano López','Churruca 2, 6º D','999876737'),('333333','Pilar','Méndez Alonso','Gran Via 167','999343543'),('444444','Azucena','Rubio del Val','Brasil 63, 2º A','999456765'),('555555','Raúl','Gutiérrez González','Literatos 3, 5º','999876234'),('666666','Santiago','Rivera Romero','Avda. de la Paz 30','999111232'),('777777','Pedro','González Hernando','Castellana 290, 9º B','999232221'),('888888','Antonio','Díaz Martín','Cuba 1','999444554'),('999999','Virginia','Fernández Fernández','Brasil 65, 3º','999009009');
/*!40000 ALTER TABLE `Cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Empleado`
--

DROP TABLE IF EXISTS `Empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Empleado` (
  `NumReg` int(11) NOT NULL,
  `Nombre` varchar(32) DEFAULT NULL,
  `Incorporacion` varchar(20) DEFAULT NULL,
  `Sueldo` int(11) DEFAULT NULL,
  `CodS` int(11) DEFAULT NULL,
  PRIMARY KEY (`NumReg`),
  KEY `CodS` (`CodS`),
  CONSTRAINT `Empleado_ibfk_1` FOREIGN KEY (`CodS`) REFERENCES `Servicio` (`CodS`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Empleado`
--

LOCK TABLES `Empleado` WRITE;
/*!40000 ALTER TABLE `Empleado` DISABLE KEYS */;
INSERT INTO `Empleado` VALUES (1,'Luisa Blanco Baroja','23/10/1996',1000,1),(2,'Fernando Serrano Vázquez','23/10/1996',1000,2),(3,'Manuel Pérez Calo','01/01/2000',900,3),(4,'Ana Troncoso Calvo','01/01/2000',900,4),(5,'Alba Troncoso Calvo','13/09/2002',NULL,1),(6,'Jorge Alonso Alonso','13/09/2002',NULL,5),(7,'Fernando Soaje Alvarez','01/01/2010',NULL,5),(8,'Rosa Luigi Paz','01/01/2010',1000,5),(9,'Rafael Fuertes Cabrera','01/01/2010',1100,6),(10,'Antonio Sancho Sancho','01/01/2010',1000,NULL),(11,'María Gonzalo Fuentes','01/01/2010',1000,NULL),(12,'Juana Peláez Trasto','01/01/2010',900,NULL),(13,'Gonzalo Cabezas Muiño','01/01/2010',1500,NULL);
/*!40000 ALTER TABLE `Empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Factura`
--

DROP TABLE IF EXISTS `Factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Factura` (
  `CodigoF` int(11) NOT NULL,
  `Entrada` varchar(20) DEFAULT NULL,
  `Salida` varchar(20) DEFAULT NULL,
  `DNI` char(9) DEFAULT NULL,
  `Numero` int(11) NOT NULL,
  `supletoria` int(11) DEFAULT NULL,
  `Forma` varchar(8) NOT NULL,
  `Total` double DEFAULT NULL,
  PRIMARY KEY (`CodigoF`),
  KEY `DNI` (`DNI`),
  KEY `Numero` (`Numero`),
  KEY `Forma` (`Forma`),
  CONSTRAINT `Factura_ibfk_1` FOREIGN KEY (`DNI`) REFERENCES `Cliente` (`DNI`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `Factura_ibfk_2` FOREIGN KEY (`Numero`) REFERENCES `Habitacion` (`Numero`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `Factura_ibfk_3` FOREIGN KEY (`Forma`) REFERENCES `FormaPago` (`Forma`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Factura`
--

LOCK TABLES `Factura` WRITE;
/*!40000 ALTER TABLE `Factura` DISABLE KEYS */;
INSERT INTO `Factura` VALUES (0,'01/01/2010','05/01/2010','999999',300,0,'tarjeta',220),(1,'01/01/2010','03/01/2010','111111',100,30,'efectivo',360),(2,'01/06/2010','03/06/2010','111111',100,30,'efectivo',180),(3,'01/09/2010','03/09/2010','111111',100,30,'efectivo',338),(4,'03/09/2010',NULL,'111111',100,0,'efectivo',NULL),(5,'01/11/2010',NULL,'333333',200,0,'tarjeta',NULL),(6,'29/10/2010',NULL,'999999',204,30,'talon',NULL),(7,'01/11/2010',NULL,'555555',300,0,'efectivo',NULL),(8,'30/10/2010',NULL,'777777',301,30,'tarjeta',NULL),(9,'15/05/2010','17/05/2010','999999',301,0,'tarjeta',218),(10,'10/08/2010','13/08/2010','333333',300,0,'tarjeta',270),(11,'15/08/2010','22/08/2010','888888',102,0,'tarjeta',525),(12,'23/12/2010','24/12/2010','444444',201,0,'talon',90),(13,'01/05/2010','05/05/2010','999999',300,0,'efectivo',380),(14,'06/06/2010','11/06/2010','555555',203,0,'tarjeta',375),(15,'15/08/2010','19/08/2010','555555',203,0,'tarjeta',363),(16,'19/08/2010','21/08/2010','666666',204,0,'efectivo',212),(17,'22/08/2010','24/08/2010','666666',203,0,'tarjeta',190),(18,'02/11/2010',NULL,'111111',100,0,'efectivo',10);
/*!40000 ALTER TABLE `Factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Factura_Prov`
--

DROP TABLE IF EXISTS `Factura_Prov`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Factura_Prov` (
  `CodFP` int(11) NOT NULL,
  `Fecha` varchar(20) DEFAULT NULL,
  `Importe` int(11) DEFAULT NULL,
  `NIF` varchar(10) NOT NULL,
  `NumReg` int(11) NOT NULL,
  PRIMARY KEY (`CodFP`),
  KEY `NIF` (`NIF`),
  KEY `NumReg` (`NumReg`),
  CONSTRAINT `Factura_Prov_ibfk_1` FOREIGN KEY (`NIF`) REFERENCES `Proveedor` (`NIF`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `Factura_Prov_ibfk_2` FOREIGN KEY (`NumReg`) REFERENCES `Empleado` (`NumReg`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Factura_Prov`
--

LOCK TABLES `Factura_Prov` WRITE;
/*!40000 ALTER TABLE `Factura_Prov` DISABLE KEYS */;
INSERT INTO `Factura_Prov` VALUES (1,'21/03/2010',1500,'121212T',8),(2,'21/04/2010',1000,'121212T',8),(3,'21/05/2010',500,'121212T',8),(4,'21/06/2010',976,'121212T',8),(5,'21/03/2010',345,'343434L',1),(6,'21/05/2010',235,'343434L',1),(7,'21/07/2010',1000,'343434L',1),(8,'21/08/2010',765,'343434L',1),(9,'21/03/2010',1235,'545454Q',12),(10,'11/04/2010',2342,'545454Q',12),(11,'15/06/2010',2567,'545454Q',12);
/*!40000 ALTER TABLE `Factura_Prov` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FormaPago`
--

DROP TABLE IF EXISTS `FormaPago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FormaPago` (
  `Forma` varchar(8) NOT NULL,
  `comision` int(11) DEFAULT NULL,
  PRIMARY KEY (`Forma`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FormaPago`
--

LOCK TABLES `FormaPago` WRITE;
/*!40000 ALTER TABLE `FormaPago` DISABLE KEYS */;
INSERT INTO `FormaPago` VALUES ('efectivo',0),('talon',2),('tarjeta',1);
/*!40000 ALTER TABLE `FormaPago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Habitacion`
--

DROP TABLE IF EXISTS `Habitacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Habitacion` (
  `Numero` int(11) NOT NULL,
  `superficie` int(11) DEFAULT NULL,
  `bar` char(2) DEFAULT NULL,
  `terraza` char(2) DEFAULT NULL,
  `puedesupletoria` char(2) DEFAULT NULL,
  `Tipo` varchar(10) NOT NULL,
  PRIMARY KEY (`Numero`),
  KEY `Tipo` (`Tipo`),
  CONSTRAINT `Habitacion_ibfk_1` FOREIGN KEY (`Tipo`) REFERENCES `Precio` (`Tipo`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Habitacion`
--

LOCK TABLES `Habitacion` WRITE;
/*!40000 ALTER TABLE `Habitacion` DISABLE KEYS */;
INSERT INTO `Habitacion` VALUES (100,17,'SI','SI','SI','doble'),(101,17,'SI','SI','SI','doble'),(102,17,'SI','SI','SI','individual'),(200,17,'SI','SI','SI','doble'),(201,17,'SI','SI','NO','doble'),(202,15,'SI','SI','NO','individual'),(203,15,'NO','SI','SI','individual'),(204,17,'SI','SI','SI','doble'),(300,17,'NO','SI','SI','doble'),(301,17,'SI','SI','SI','doble');
/*!40000 ALTER TABLE `Habitacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Incluye`
--

DROP TABLE IF EXISTS `Incluye`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Incluye` (
  `CodigoF` int(11) NOT NULL,
  `CodS` int(11) NOT NULL,
  `coste` int(11) DEFAULT NULL,
  `fecha` varchar(20) NOT NULL,
  PRIMARY KEY (`CodigoF`,`CodS`,`fecha`),
  KEY `CodS` (`CodS`),
  CONSTRAINT `Incluye_ibfk_1` FOREIGN KEY (`CodigoF`) REFERENCES `Factura` (`CodigoF`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `Incluye_ibfk_2` FOREIGN KEY (`CodS`) REFERENCES `Servicio` (`CodS`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Incluye`
--

LOCK TABLES `Incluye` WRITE;
/*!40000 ALTER TABLE `Incluye` DISABLE KEYS */;
INSERT INTO `Incluye` VALUES (1,1,25,'01/01/2010'),(1,2,15,'01/01/2010'),(3,1,10,'01/09/2010'),(3,2,10,'01/09/2010'),(3,2,20,'03/09/2010'),(3,3,25,'01/09/2010'),(3,3,25,'02/09/2010'),(3,3,25,'03/09/2010'),(3,5,43,'02/09/2010'),(5,3,13,'02/11/2010'),(5,5,25,'01/11/2010'),(5,5,28,'02/11/2010'),(5,5,33,'03/11/2010'),(5,5,24,'04/11/2010'),(7,6,20,'02/11/2010'),(9,4,6,'15/05/2010'),(9,4,8,'16/05/2010'),(9,5,24,'16/05/2010'),(13,2,10,'03/05/2010'),(13,2,10,'04/05/2010'),(15,2,13,'15/08/2010'),(15,4,5,'15/08/2010'),(15,5,45,'15/08/2010'),(16,5,32,'19/08/2010'),(17,1,10,'20/08/2010'),(17,5,30,'23/08/2010');
/*!40000 ALTER TABLE `Incluye` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Limpieza`
--

DROP TABLE IF EXISTS `Limpieza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Limpieza` (
  `NumReg` int(11) NOT NULL,
  `Numero` int(11) NOT NULL,
  `Fecha` varchar(20) NOT NULL,
  PRIMARY KEY (`NumReg`,`Numero`,`Fecha`),
  KEY `Numero` (`Numero`),
  CONSTRAINT `Limpieza_ibfk_1` FOREIGN KEY (`NumReg`) REFERENCES `Empleado` (`NumReg`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `Limpieza_ibfk_2` FOREIGN KEY (`Numero`) REFERENCES `Habitacion` (`Numero`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Limpieza`
--

LOCK TABLES `Limpieza` WRITE;
/*!40000 ALTER TABLE `Limpieza` DISABLE KEYS */;
INSERT INTO `Limpieza` VALUES (11,100,'01/08/2010'),(11,100,'01/09/2010'),(11,100,'01/10/2010'),(11,100,'02/10/2010'),(12,100,'10/09/2010'),(10,101,'20/08/2010'),(10,101,'21/08/2010'),(10,101,'22/08/2010'),(10,101,'23/08/2010'),(11,101,'10/08/2010'),(11,101,'10/09/2010'),(11,101,'14/08/2010'),(12,101,'10/09/2010'),(10,102,'24/08/2010'),(11,102,'15/08/2010'),(12,102,'10/09/2010'),(11,200,'10/08/2010'),(12,200,'10/09/2010'),(11,201,'10/09/2010'),(12,201,'11/09/2010'),(10,202,'23/09/2010'),(11,202,'10/09/2010'),(12,202,'11/09/2010'),(10,203,'23/09/2010'),(11,203,'10/01/2010'),(12,203,'11/09/2010'),(10,204,'30/09/2010'),(11,204,'10/01/2010'),(12,204,'11/09/2010'),(10,300,'01/10/2010'),(12,300,'12/09/2010'),(10,301,'01/10/2010'),(11,301,'01/01/2010'),(11,301,'07/01/2010'),(11,301,'10/01/2010'),(12,301,'12/09/2010');
/*!40000 ALTER TABLE `Limpieza` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Precio`
--

DROP TABLE IF EXISTS `Precio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Precio` (
  `Tipo` varchar(10) NOT NULL,
  `precio` int(11) DEFAULT NULL,
  PRIMARY KEY (`Tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Precio`
--

LOCK TABLES `Precio` WRITE;
/*!40000 ALTER TABLE `Precio` DISABLE KEYS */;
INSERT INTO `Precio` VALUES ('doble',90),('individual',75);
/*!40000 ALTER TABLE `Precio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Proveedor`
--

DROP TABLE IF EXISTS `Proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Proveedor` (
  `NIF` varchar(10) NOT NULL,
  `Nombre` varchar(16) DEFAULT NULL,
  `Direccion` char(30) DEFAULT NULL,
  `NumReg` int(11) NOT NULL,
  PRIMARY KEY (`NIF`),
  KEY `NumReg` (`NumReg`),
  CONSTRAINT `Proveedor_ibfk_1` FOREIGN KEY (`NumReg`) REFERENCES `Empleado` (`NumReg`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Proveedor`
--

LOCK TABLES `Proveedor` WRITE;
/*!40000 ALTER TABLE `Proveedor` DISABLE KEYS */;
INSERT INTO `Proveedor` VALUES ('121212T','Carnes SA','Plaza de los de Acá 20',8),('343434L','Logística Pérez','Calle del Pueblo 30, 1º',1),('545454Q','Prd. Quimicos SA','Colombiana 34',12);
/*!40000 ALTER TABLE `Proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reserva`
--

DROP TABLE IF EXISTS `Reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Reserva` (
  `DNI` char(9) NOT NULL,
  `Numero` int(11) NOT NULL,
  `Entrada` varchar(20) DEFAULT NULL,
  `Salida` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`DNI`,`Numero`),
  KEY `Numero` (`Numero`),
  CONSTRAINT `Reserva_ibfk_1` FOREIGN KEY (`DNI`) REFERENCES `Cliente` (`DNI`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `Reserva_ibfk_2` FOREIGN KEY (`Numero`) REFERENCES `Habitacion` (`Numero`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reserva`
--

LOCK TABLES `Reserva` WRITE;
/*!40000 ALTER TABLE `Reserva` DISABLE KEYS */;
INSERT INTO `Reserva` VALUES ('111111',101,'01/02/2011','04/02/2011'),('111111',102,'03/02/2011','04/02/2011'),('222222',300,'02/02/2011','06/02/2011'),('777777',203,'17/02/2011','19/02/2011'),('777777',204,'25/03/2011','27/03/2011'),('999999',200,'11/02/2011','15/02/2011');
/*!40000 ALTER TABLE `Reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Servicio`
--

DROP TABLE IF EXISTS `Servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Servicio` (
  `CodS` int(11) NOT NULL,
  `Descripcion` char(15) DEFAULT NULL,
  `costeinterno` int(11) DEFAULT NULL,
  `NumReg` int(11) NOT NULL,
  PRIMARY KEY (`CodS`),
  KEY `NumReg` (`NumReg`),
  CONSTRAINT `Servicio_ibfk_1` FOREIGN KEY (`NumReg`) REFERENCES `Empleado` (`NumReg`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Servicio`
--

LOCK TABLES `Servicio` WRITE;
/*!40000 ALTER TABLE `Servicio` DISABLE KEYS */;
INSERT INTO `Servicio` VALUES (1,'tintoreria',50,1),(2,'plancha',30,2),(3,'lavanderia',60,3),(4,'bar',15,4),(5,'restaurante',50,8),(6,'floristeria',25,9);
/*!40000 ALTER TABLE `Servicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usa`
--

DROP TABLE IF EXISTS `Usa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Usa` (
  `CodS` int(11) NOT NULL,
  `Servicio_CodS` int(11) NOT NULL,
  `fecha` varchar(20) NOT NULL,
  PRIMARY KEY (`CodS`,`Servicio_CodS`,`fecha`),
  KEY `Servicio_CodS` (`Servicio_CodS`),
  CONSTRAINT `Usa_ibfk_1` FOREIGN KEY (`CodS`) REFERENCES `Servicio` (`CodS`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `Usa_ibfk_2` FOREIGN KEY (`Servicio_CodS`) REFERENCES `Servicio` (`CodS`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usa`
--

LOCK TABLES `Usa` WRITE;
/*!40000 ALTER TABLE `Usa` DISABLE KEYS */;
INSERT INTO `Usa` VALUES (5,1,'24/09/2010'),(5,1,'25/08/2010'),(5,1,'30/08/2010'),(4,2,'17/09/2010'),(4,2,'29/08/2010'),(5,2,'01/09/2010'),(5,2,'18/08/2010'),(4,3,'01/09/2010'),(4,3,'05/09/2010'),(4,3,'19/09/2010'),(5,3,'05/09/2010'),(5,4,'20/09/2010'),(5,4,'29/09/2010'),(5,6,'25/09/2010');
/*!40000 ALTER TABLE `Usa` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-03 16:47:15
