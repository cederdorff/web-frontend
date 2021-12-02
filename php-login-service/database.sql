/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/ dating_website /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE dating_website;

DROP TABLE IF EXISTS countries;
CREATE TABLE `countries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `countryName` varchar(100) DEFAULT NULL,
  `countryPopulation` int DEFAULT NULL,
  `continent` varchar(50) DEFAULT NULL,
  `dateAdded` date DEFAULT NULL,
  `dateEdited` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `countryName` (`countryName`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS userlogin;
CREATE TABLE `userlogin` (
  `id` int NOT NULL,
  `username` varchar(30) DEFAULT NULL,
  `pass` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS users;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `country` int DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;

CREATE OR REPLACE VIEW `userlist` AS select `users`.`id` AS `userID`,`userlogin`.`username` AS `username`,`users`.`firstName` AS `firstName`,`users`.`lastName` AS `lastName`,`users`.`age` AS `age`,`users`.`gender` AS `gender`,`countries`.`countryName` AS `countryName` from ((`users` join `countries` on((`users`.`country` = `countries`.`id`))) left join `userlogin` on((`users`.`id` = `userlogin`.`id`)));

INSERT INTO countries(id,countryName,countryPopulation,continent,dateAdded,dateEdited) VALUES(1,'Denmark',5806000,'Europe','2021-09-10','2021-09-10'),(2,'Sweden',10230000,'Europe','2021-09-10','2021-09-10'),(3,'Finland',5518000,'Europe','2021-09-10','2021-09-10'),(4,'Norway',5328000,'Europe','2021-09-10','2021-09-10'),(5,'Poland',37970000,'Europe','2021-09-10','2021-09-10'),(6,'Ukraine',44390000,'Europe','2021-09-10','2021-09-10'),(7,'Germany',83020000,'Europe','2021-09-10','2021-09-10'),(8,'France',67060000,'Europe','2021-09-10','2021-09-10'),(9,'Italy',60360000,'Europe','2021-09-10','2021-09-10'),(10,'Spain',46940000,'Europe','2021-09-10','2021-09-10'),(11,'Portugal',10280000,'Europe','2021-09-10','2021-09-10'),(12,'Netherlands',17280000,'Europe','2021-09-10','2021-09-10'),(13,'Switzerland',8545000,'Europe','2021-09-10','2021-09-10'),(14,'Austria',8859000,'Europe','2021-09-10','2021-09-10'),(15,'Slovenia',2081000,'Europe','2021-09-10','2021-09-10'),(16,'Slovakia',5450000,'Europe','2021-09-10','2021-09-10'),(17,'Czech Republic',10650000,'Europe','2021-09-10','2021-09-10'),(18,'Estonia',1325000,'Europe','2021-09-10','2021-09-10'),(19,'Latvia',1920000,'Europe','2021-09-10','2021-09-10'),(20,'Lithuania',2794000,'Europe','2021-09-10','2021-09-10'),(21,'Belarus',9467000,'Europe','2021-09-10','2021-09-10'),(22,'Russia',144400000,'Europe','2021-09-10','2021-09-10'),(23,'United Kingdom',67886000,'Europe','2021-09-10','2021-09-10'),(24,'Romania',19237000,'Europe','2021-09-10','2021-09-10'),(25,'Belgium',11589000,'Europe','2021-09-10','2021-09-10'),(26,'Greece',10423000,'Europe','2021-09-10','2021-09-10'),(27,'Hungary',9660000,'Europe','2021-09-10','2021-09-10'),(28,'Serbia',8737000,'Europe','2021-09-10','2021-09-10'),(29,'Bulgaria',6948000,'Europe','2021-09-10','2021-09-10'),(30,'Ireland',4937000,'Europe','2021-09-10','2021-09-10'),(31,'Croatia',4105000,'Europe','2021-09-10','2021-09-10'),(33,'Moldova',4033000,'Europe','2021-09-10','2021-09-10'),(34,'Bosnia and Herzegovina',3280000,'Europe','2021-09-10','2021-09-10'),(35,'Albania',2877000,'Europe','2021-09-10','2021-09-10'),(36,'North Macedonia',2083000,'Europe','2021-09-10','2021-09-10'),(37,'Montenegro',628000,'Europe','2021-09-10','2021-09-10'),(38,'Luxemborg',625000,'Europe','2021-09-10','2021-09-10'),(39,'Malta',441000,'Europe','2021-09-10','2021-09-10'),(40,'Iceland',341000,'Europe','2021-09-10','2021-09-10'),(41,'Monaco',39000,'Europe','2021-09-10','2021-09-10'),(42,'Liechtenstein',38000,'Europe','2021-09-10','2021-09-10');

INSERT INTO userlogin(id,username,pass) VALUES(57,'Test','$2y$10$cg0PrkttTXI65aZ1SNImGeOUp4.THzqz8Cd489zDYb9x97RWFErsW');
INSERT INTO users(id,firstName,lastName,age,country,gender) VALUES(2,'Nicklas','Andersen',22,1,'Male'),(3,'Sarah','Dybvad',34,1,'Female'),(4,'Alex','Handhiuc',24,9,'Male'),(5,'Piotr','Pospiech',20,5,'Male'),(47,'Kasper',NULL,NULL,45,NULL),(48,'Nanna',NULL,NULL,45,NULL),(49,'Lasse',NULL,NULL,1,NULL),(50,'Isla',NULL,NULL,1,NULL),(57,'','',60,21,'Other');DROP PROCEDURE IF EXISTS AddNewUser;
CREATE PROCEDURE `AddNewUser`(
    IN firstnameVar VARCHAR(100),
    IN countrynameVar VARCHAR(100)
)
BEGIN
    START TRANSACTION;
    IF
        NOT EXISTS (SELECT id FROM countries WHERE countryName = countrynameVar)
    THEN
        INSERT INTO countries (countryName) VALUES (countrynameVar);
    END IF;
    SET @countryID := (SELECT id FROM countries WHERE countryName = countrynameVar);
    INSERT INTO users (firstname, country)
    VALUES (firstnameVar, @countryID);
    COMMIT;
END;

DROP PROCEDURE IF EXISTS CreateUser;
CREATE PROCEDURE `CreateUser`(
    IN firstnameVar VARCHAR(50),
    IN lastnameVAR VARCHAR(50),
    IN ageVar INT,
    IN usernameVar VARCHAR(30),
    IN passwordVar VARCHAR(60),
    IN countrynameVar VARCHAR(100),
    IN genderVar VARCHAR(20)
)
BEGIN
    START TRANSACTION;

        IF
            NOT EXISTS (SELECT id FROM countries WHERE countryName = countrynameVar)
        THEN
            INSERT INTO countries (countryName) VALUES (countrynameVar);
        END IF;

        SET @countryID := (SELECT id FROM countries WHERE countryName = countrynameVar);

        INSERT INTO users (firstname, lastname, age, country, gender)
        VALUES (firstnameVar, lastnameVar, ageVar, @countryID, genderVar);
 
        SET @userID := (SELECT id FROM users ORDER BY id DESC LIMIT 1);

        INSERT INTO userlogin (id, username, pass)
        VALUES (@userID, usernameVar, passwordVar);
    COMMIT;
END;