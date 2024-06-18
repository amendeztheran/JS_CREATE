USE compras_create;

/*Roles*/
CREATE TABLE `roles` (
  `id_role` int NOT NULL AUTO_INCREMENT,
  `nombre_roll` char(100) NOT NULL,
  PRIMARY KEY (`id_role`)
) ENGINE=InnoDB;

INSERT INTO roles (`id_role`, `nombre_roll`) 
VALUES 
(1, 'Administrador'),
(2, 'Cliente');


/*Usuarios*/
CREATE TABLE `users` (/*Usuarios*/
  `id_user` int NOT NULL AUTO_INCREMENT,
  `type_doc` char(100) NOT NULL,
  `doc_number` char(100) NOT NULL,
  `name` char(100) NOT NULL,
  `last_name` char(100) NOT NULL,
  `email` char(100) NOT NULL,
  `password` char(100) NOT NULL,
  `id_role` int NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `id_roll` (`id_role`),
  CONSTRAINT `id_role` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id_role`)
) ENGINE=InnoDB;

INSERT INTO users (`id_user`, `type_doc`, `doc_number`, `name`, `last_name`, `email`, `password`, `id_role`) 
VALUES 
(1, 'DNI', '12345678', 'Juan', 'Pérez', 'juan@example.com', 'clave123', 1),
(2, 'Pasaporte', 'P456789', 'María', 'González', 'maria@example.com', 'clave456', 2),
(3, 'Cédula', 'A98765432', 'Luis', 'Martínez', 'luis@example.com', 'clave789', 1),
(4, 'DNI', '87654321', 'Ana', 'Sánchez', 'ana@example.com', 'claveabc', 1),
(5, 'Pasaporte', 'M987654', 'Carlos', 'López', 'carlos@example.com', 'clavexyz', 1),
(6, 'Cédula', 'B12345678', 'Laura', 'Rodríguez', 'laura@example.com', 'clave321', 1);


/*Marcas*/
CREATE TABLE `brand` (/*Marca*/
  `id_brand` int NOT NULL AUTO_INCREMENT,
  `name_brand` varchar(100) NOT NULL,
  `description` text,
  PRIMARY KEY (`id_brand`)
) ENGINE=InnoDB;

INSERT INTO brand VALUES
(2, 'Zara', 'Ropa de moda'),
(3, 'Forever 21', 'Ropa juvenil'),
(4, 'Nike', 'Ropa y calzado deportivo'),
(5, 'Adidas', 'Ropa y calzado deportivo'),
(6, 'Gap', 'Moda casual'),
(7, "Levi\'s", 'Jeans de alta calidad');


/*Categoria*/
CREATE TABLE `category` (
  `id_category` int NOT NULL AUTO_INCREMENT,
  `name_category` varchar(100) NOT NULL,
  PRIMARY KEY (`id_category`)
) ENGINE=InnoDB;

INSERT INTO category (id_category,name_category) VALUES
(1,"Mujer"),
(2,"Hombre"),
(3,"Unisex");


/*Colores*/
CREATE TABLE `colors` (
  `id_color` int NOT NULL AUTO_INCREMENT,
  `name_color` char(100) NOT NULL,
  PRIMARY KEY (`id_color`)
) ENGINE=InnoDB;

INSERT INTO colors (id_color,name_color) VALUES
(1,"Amarillo"),
(2, 'Rojo'),
(3, 'Azul'),
(4, 'Verde'),
(5, 'Blanco'),
(6, 'Negro');


/*Tallas*/
CREATE TABLE `sizes` (/*Tallas*/
  `id_size` int NOT NULL AUTO_INCREMENT,
  `size` char(100) NOT NULL,
  PRIMARY KEY (`id_size`)
) ENGINE=InnoDB;

INSERT INTO sizes (id_size,size) VALUES
(1,"XS"),
(2, 'S'),
(3, 'M'),
(4, 'L'),
(5, 'XL'),
(6, 'XXL');


/*Productos */
CREATE TABLE `products` (/*Productos*/
  `id_product` int NOT NULL AUTO_INCREMENT,
  `title` char(100) NOT NULL,
  `descrip` text,
  `brand_product` int NOT NULL,
  `color` int NOT NULL,
  `quantify` int DEFAULT NULL,
  `price` float NOT NULL,
  `stock` int NOT NULL,
  `category` int NOT NULL,
  `size` int NOT NULL,
  `url` varchar(200) NOT NULL,
  PRIMARY KEY (`id_product`),
  KEY `brand_product` (`brand_product`),
  KEY `category` (`category`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category`) REFERENCES `category` (`id_category`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`brand_product`) REFERENCES `brand` (`id_brand`)
) ENGINE=InnoDB;

INSERT INTO products (id_product,title,descrip,brand_product,color,quantify,price,stock,category,size) VALUES
(1,"Pantalon de mezclilla",NULL,7,3,2,30000.0,5,3,3),
(2,"Falda roja","Falda con volantes, flores, color único",3,2,15,80000.0,6,1,1),
(3, 'Camisa a rayas', 'Camisa de algodón a rayas para hombres', 3, 1, 10, 45000.0, 8, 2, 3),
(4, 'Vestido negro', 'Elegante vestido negro para ocasiones especiales', 2, 6, 5, 120000.0, 12, 1, 1),
(5, 'Zapatos deportivos', 'Zapatillas deportivas ideales para correr', 4, 4, 20, 90000.0, 15, 3, 2),
(6, 'Abrigo de invierno', 'Abrigo de lana con capucha para el invierno', 3, 5, 8, 150000.0, 7, 3, 4),
(7, 'Jeans de mezclilla', 'Jeans clásicos de mezclilla para hombres', 7, 3, 10, 55000.0, 10, 2, 6);


INSERT INTO products (id_product,title,descrip,brand_product,color,quantify,price,stock,category,size,url) VALUES 
(8, 'Prueba eliminar 1', 'Eliminar 1', 7, 3, 10, 75000.0, 5, 2, 6, 'https://i.pinimg.com/564x/86/de/fc/86defc4fc76a413073a272a751668c8b.jpg'),
(9, 'Prueba eliminar 2', 'Eliminar 2', 7, 3, 10, 95000.0, 10, 2, 6, 'https://i.pinimg.com/564x/65/c6/9f/65c69f94a2064e57f1baa8a378601e8f.jpg');

UPDATE products SET url = 'https://static.pullandbear.net/2/photos/2023/I/0/2/p/3685/508/407/3685508407_1_1_3.jpg?t=1697539571399' WHERE id_product = 1;
UPDATE products SET url ='https://static.kiabi.es//images/falda-de-volantes-fucsia-acg96_1_frb1.jpg' WHERE id_product = 2;
UPDATE products SET url ='https://www.camiseriaeuropea.com/cdn/shop/products/696_001.jpg?v=1633559189' WHERE id_product = 3;
UPDATE products SET url ='https://cdn-images.farfetch-contents.com/18/44/08/85/18440885_39661253_1000.jpg'WHERE id_product = 4;
UPDATE products SET url ='https://m.media-amazon.com/images/I/610wDtRMWUL._AC_SY695_.jpg' WHERE id_product = 5;
UPDATE products SET url ='https://m.media-amazon.com/images/I/614H1mn1+dL._AC_UY1000_.jpg' WHERE id_product = 6;
UPDATE products SET url ='https://media.vogue.mx/photos/5ecaae20a44477bd60bb5b4d/master/w_1600%2Cc_limit/jeans-Zara-.jpg' WHERE id_product = 7;


/*Talla de los productos */
CREATE TABLE `productsxsize` ( /*Talla de los productos*/
  `id_product` int NOT NULL AUTO_INCREMENT,
  `size` int NOT NULL,
  `quantify` int DEFAULT NULL,
  KEY `id_product` (`id_product`),
  KEY `size` (`size`),
  CONSTRAINT `productsxsize_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`),
  CONSTRAINT `productsxsize_ibfk_2` FOREIGN KEY (`size`) REFERENCES `sizes` (`id_size`)
) ENGINE=InnoDB;

INSERT INTO productsxsize (id_product,size,quantify) VALUES 
(1, 3, 1),  -- Pantalón de mezclilla: 1 unidades de talla M
(1, 4, 1),  -- Pantalón de mezclilla: 1 unidades de talla L
(2, 1, 3),  -- Falda roja: 3 unidades de talla XS--
(2, 3, 5),  -- Falda roja: 5 unidades de talla M--
(2, 4, 7),  -- Falda roja: 7 unidades de talla L--
(3, 2, 3),  -- Camisa a rayas: 3 unidades de talla S--
(3, 3, 5),  -- Camisa a rayas: 5 unidades de talla M--
(4, 1, 2),  -- Vestido negro: 2 unidades de talla XS--
(4, 2, 2),  -- Vestido negro: 2 unidades de talla S--
(4, 3, 1),  -- Vestido negro: 1 unidad de talla M--
(5, 3, 6),  -- Zapatos deportivos: 6 unidades de talla M--
(5, 4, 9),  -- Zapatos deportivos: 9 unidades de talla L--
(5, 4, 5),  -- Zapatos deportivos: 9 unidades de talla S--
(6, 1, 1),  -- Abrigo de invierno: 1 unidad de talla XS--
(6, 2, 3),  -- Abrigo de invierno: 2 unidades de talla S--
(6, 3, 4),  -- Abrigo de invierno: 3 unidades de talla M--
(7, 2, 5),  -- Jeans de mezclilla: 5 unidades de talla S--
(7, 3, 5),  -- Jeans de mezclilla: 5 unidades de talla M--
(7, 4, 5);  -- Jeans de mezclilla: 5 unidades de talla L--


/*Colores de los productos */
CREATE TABLE `productsxcolors` (/*Colores de los productos*/
  `id_product` int NOT NULL AUTO_INCREMENT,
  `color` int NOT NULL,
  `quantify` int DEFAULT NULL,
  KEY `id_product` (`id_product`),
  KEY `color` (`color`),
  CONSTRAINT `productsxcolors_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`),
  CONSTRAINT `productsxcolors_ibfk_2` FOREIGN KEY (`color`) REFERENCES `colors` (`id_color`)
) ENGINE=InnoDB;

INSERT INTO productsxcolors (id_product,color,quantify) VALUES
(1,3,2),
(2, 2, 15),  -- Falda roja es roja
(3, 1, 5),  -- Camisa a rayas es amarilla
(4, 6, 5),   -- Vestido negro es negro
(5, 4, 13),  -- Zapatos deportivos son verdes
(6, 5, 8),   -- Abrigo de invierno es blanco
(7, 3, 10),  -- Jeans de mezclilla son azules
(3, 2, 5),  -- Camisa a rayas en rojo
(5, 1, 7);  -- Zapatos deportivos en amarillo


/*Fecha de orden */
CREATE TABLE `order_header` (/*Fecha de orden*/
  `id_order` int NOT NULL AUTO_INCREMENT,
  `date_order` datetime NOT NULL,
  `customer` int NOT NULL,
  PRIMARY KEY (`id_order`),
  KEY `customer` (`customer`),
  CONSTRAINT `order_header_ibfk_1` FOREIGN KEY (`customer`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB;

INSERT INTO order_header (id_order,date_order,customer) VALUES
(1,"2023-08-12",2),
(2,"2023-07-11",3),
(3,"2023-06-01",6),
(4,"2023-08-02",1),
(5,"2023-04-21",2),
(6,"2023-05-26",1),
(7,"2023-08-01",5),
(8,"2023-01-30",4),
(9,"2023-02-28",6),
(10,"2023-08-13",2);


/*Detalle de la orden del cliente*/
CREATE TABLE `orders_detail` (/*Detalle de la orden del cliente*/
  `id_detail` int NOT NULL AUTO_INCREMENT,
  `date_` datetime NOT NULL,
  `order_` int NOT NULL,
  `product` int NOT NULL,
  `quantify` int NOT NULL,
  `total` float NOT NULL,
  PRIMARY KEY (`id_detail`),
  KEY `pedido` (`order`),
  KEY `producto` (`product`),
  CONSTRAINT `order` FOREIGN KEY (`order`) REFERENCES `order_header` (`id_order`),
  CONSTRAINT `product` FOREIGN KEY (`product`) REFERENCES `products` (`id_product`)
) ENGINE=InnoDB;

INSERT INTO orders_detail (date_,order_,product,quantify,total) VALUES
("2023-08-12",1,1,1,30000.0),
("2023-07-11",2,2,3,240000.0),
("2023-06-01",3,4,1,120000.0),
("2023-08-02",4,3,2,90000.0),
("2023-04-21",5,7,1,55000.0),
("2023-05-26",6,6,2,300000.0),
("2023-01-30",7,2,2,160000.0),
("2023-01-30",8,5,2,180000.0),
("2023-02-28",9,3,3,135000.0),
("2023-08-13",7,2,2,110000.0);

SELECT*FROM orders_detail;

/*Consultas*/
SELECT
    p.id_product,
    p.title,
    p.descrip, 
    b.name_brand, 
    cg.name_category, 
    p.quantify, 
    p.price, 
    p.stock,
    JSON_OBJECTAGG(s.size, ps.quantify) AS sizes,
    JSON_OBJECTAGG(c.name_color, pc.quantify) AS colors
FROM
    products p
JOIN
    productsxsize ps ON p.id_product = ps.id_product
JOIN
    productsxcolors pc ON p.id_product = pc.id_product
JOIN
    sizes s ON ps.size = s.id_size
JOIN 
    colors c ON pc.color = c.id_color
JOIN
    brand b ON p.brand_product = b.id_brand
JOIN
    category cg ON p.category = cg.id_category
WHERE
    p.id_product = 3
GROUP BY
    p.id_product, p.title, p.color;
    
select * from productsxcolors where id_product = 3

--- _________________________________________________________________________________
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: compras_create
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `order_header`
--

DROP TABLE IF EXISTS `order_header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_header` (
  `id_order` int NOT NULL AUTO_INCREMENT,
  `date_order` datetime NOT NULL,
  `customer` int NOT NULL,
  PRIMARY KEY (`id_order`),
  UNIQUE KEY `id_order_UNIQUE` (`id_order`),
  KEY `customer` (`customer`),
  CONSTRAINT `customer` FOREIGN KEY (`customer`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_header`
--

LOCK TABLES `order_header` WRITE;
/*!40000 ALTER TABLE `order_header` DISABLE KEYS */;
INSERT INTO `order_header` VALUES (1,'2023-08-12 00:00:00',2),(2,'2023-07-11 00:00:00',3),(3,'2023-06-01 00:00:00',6),(4,'2023-08-02 00:00:00',1),(7,'2023-08-01 00:00:00',5),(8,'2023-01-30 00:00:00',4),(11,'2024-01-29 16:31:47',13),(27,'2024-01-30 17:15:26',12),(28,'2024-01-30 17:20:04',14),(29,'2024-01-31 18:11:14',15),(30,'2024-01-31 18:14:40',16);
/*!40000 ALTER TABLE `order_header` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-31 19:14:14

---__________________________________________________________________________________

-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: compras_create
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `orders_detail`
--

DROP TABLE IF EXISTS `orders_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders_detail` (
  `id_detail` int NOT NULL AUTO_INCREMENT,
  `date_` datetime NOT NULL,
  `order_` int NOT NULL,
  `product` int NOT NULL,
  `quantify` int NOT NULL,
  `total` float NOT NULL,
  `adress` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_detail`),
  KEY `order__idx` (`order_`),
  KEY `product_idx` (`product`),
  CONSTRAINT `order_` FOREIGN KEY (`order_`) REFERENCES `order_header` (`id_order`),
  CONSTRAINT `product` FOREIGN KEY (`product`) REFERENCES `products` (`id_product`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_detail`
--

LOCK TABLES `orders_detail` WRITE;
/*!40000 ALTER TABLE `orders_detail` DISABLE KEYS */;
INSERT INTO `orders_detail` VALUES (29,'2023-08-12 00:00:00',1,1,1,30000,NULL),(30,'2023-07-11 00:00:00',2,2,3,240000,NULL),(31,'2023-06-01 00:00:00',3,4,1,120000,NULL),(32,'2023-08-02 00:00:00',4,3,2,90000,NULL),(33,'2023-01-30 00:00:00',7,2,2,160000,NULL),(34,'2023-01-30 00:00:00',8,5,2,180000,NULL),(71,'2024-01-31 17:58:28',28,1,2,60000,NULL),(72,'2024-01-31 17:58:28',28,3,1,45000,NULL),(75,'2024-01-31 18:14:40',30,2,3,240000,NULL),(76,'2024-01-31 18:14:40',30,3,3,135000,NULL),(77,'2024-01-31 18:14:40',30,7,1,55000,NULL);
/*!40000 ALTER TABLE `orders_detail` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-31 19:31:09


ALTER TABLE `compras_create`.`order_header` 
ADD COLUMN `correo` VARCHAR(45) NULL AFTER `customer`;

-- usarlo si se creó una columna en orders_detail
ALTER TABLE `compras_create`.`orders_detail` 
DROP COLUMN `adress`;

ALTER TABLE `compras_create`.`orders_detail` 
ADD COLUMN `size` VARCHAR(45) NULL AFTER `total`,
ADD COLUMN `color` VARCHAR(45) NULL AFTER `size`;


--- HACERLO EN EXCLUSIVAMENTE EN ESTE ORDEN, NADA DE VARIAR
-- desactivar temporalmente el modo de actualización segura.
SET SQL_SAFE_UPDATES = 0;

update products set quantify = 50 where quantify<3;

-- activar el modo de actualización segura.
SET SQL_SAFE_UPDATES = 1;

ALTER TABLE `compras_create`.`order_header` 
ADD COLUMN `address` VARCHAR(45) NULL AFTER `correo`;