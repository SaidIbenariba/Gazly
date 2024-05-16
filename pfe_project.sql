-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 15, 2024 at 09:59 PM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pfe_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `affectation`
--

DROP TABLE IF EXISTS `affectation`;
CREATE TABLE IF NOT EXISTS `affectation` (
  `datedebut` datetime NOT NULL,
  `datefin` datetime NOT NULL,
  `id_ET` int NOT NULL,
  `id_resp` int NOT NULL,
  PRIMARY KEY (`datedebut`,`id_ET`,`id_resp`),
  KEY `id_ET_affect` (`id_ET`),
  KEY `id_resp_affect` (`id_resp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Table structure for table `capteur`
--

DROP TABLE IF EXISTS `capteur`;
CREATE TABLE IF NOT EXISTS `capteur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(60) NOT NULL,
  `id_ET` int NOT NULL,
<<<<<<< HEAD:pfeproject.sql
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_ET` (`id_ET`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
=======
  PRIMARY KEY (`id`,`id_ET`),
  KEY `id_ET_capteur` (`id_ET`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `capteur`
--

INSERT INTO `capteur` (`id`, `type`, `id_ET`) VALUES
(1, 'MQ-2', 1),
(2, 'MQ-9', 1);
>>>>>>> 8b2eb0ef7ea615e307c4b3a2cf03b5fefcd3e035:pfe_project (2).sql

-- --------------------------------------------------------

--
-- Table structure for table `dircteur`
--

DROP TABLE IF EXISTS `dircteur`;
CREATE TABLE IF NOT EXISTS `dircteur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `telphone` int NOT NULL,
  `dir_password` varchar(40) NOT NULL,
  `dir_email` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dir_password_2` (`dir_password`,`dir_email`),
  KEY `dir_password` (`dir_password`),
  KEY `dir_email` (`dir_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Table structure for table `espace de travail`
--

DROP TABLE IF EXISTS `espace de travail`;
CREATE TABLE IF NOT EXISTS `espace de travail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
<<<<<<< HEAD:pfeproject.sql
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------
=======
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
>>>>>>> 8b2eb0ef7ea615e307c4b3a2cf03b5fefcd3e035:pfe_project (2).sql

--
-- Dumping data for table `espace de travail`
--

<<<<<<< HEAD:pfeproject.sql
DROP TABLE IF EXISTS `login`;
CREATE TABLE IF NOT EXISTS `login` (
  `email` varchar(80) NOT NULL,
  `password` varchar(50) CHARACTER SET utf8mb4  NOT NULL,
  `user_type` enum('Admin','Respensable','ouvrier') NOT NULL,
  PRIMARY KEY (`email`),
  UNIQUE KEY `password` (`password`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
=======
INSERT INTO `espace de travail` (`id`, `nom`) VALUES
(1, 'nom');
>>>>>>> 8b2eb0ef7ea615e307c4b3a2cf03b5fefcd3e035:pfe_project (2).sql

-- --------------------------------------------------------

--
-- Table structure for table `mesure`
--

DROP TABLE IF EXISTS `mesure`;
CREATE TABLE IF NOT EXISTS `mesure` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gazlvl` int NOT NULL,
  `date` datetime NOT NULL,
  `id_cap` int NOT NULL,
  `gaz_danger` enum('0','1') NOT NULL,
  PRIMARY KEY (`id`,`id_cap`),
  KEY `id_capteur` (`id_cap`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
>>>>>>> 8b2eb0ef7ea615e307c4b3a2cf03b5fefcd3e035:pfe_project (2).sql

-- --------------------------------------------------------

--
-- Table structure for table `mission`
--

DROP TABLE IF EXISTS `mission`;
CREATE TABLE IF NOT EXISTS `mission` (
  `startdate` datetime NOT NULL,
  `duree` int NOT NULL,
  `discription` text NOT NULL,
  `id_dir` int NOT NULL,
  `id_resp` int NOT NULL,
  PRIMARY KEY (`startdate`,`id_dir`,`id_resp`),
  KEY `id_resp_miss` (`id_resp`),
  KEY `id_dir_miss` (`id_dir`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Table structure for table `observation`
--

DROP TABLE IF EXISTS `observation`;
CREATE TABLE IF NOT EXISTS `observation` (
  `date` datetime NOT NULL,
  `sujet` text NOT NULL,
  `id_ET` int NOT NULL,
  `id_resp` int NOT NULL,
  PRIMARY KEY (`date`,`id_ET`,`id_resp`),
  KEY `id_ET_obs` (`id_ET`),
  KEY `id_resp_obs` (`id_resp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Table structure for table `ouvrier`
--

DROP TABLE IF EXISTS `ouvrier`;
CREATE TABLE IF NOT EXISTS `ouvrier` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `telphone` int NOT NULL,
  `ouv_email` varchar(70) NOT NULL,
  `ouv_password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ouv_password` (`ouv_password`),
  KEY `ouv_email` (`ouv_email`)

=======
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ouvrier`
--

INSERT INTO `ouvrier` (`id`, `nom`, `prenom`, `telphone`, `ouv_email`, `ouv_password`) VALUES
(10, 'kj', 'kjn', 3868, 'user3@gmail.com', '5555'),
(12, 'lilk', 'lkklnkl', 845, 'user1@gmail.com', '5544'),
(14, 'lilk', 'lkklnkl', 845, 'user10@gmail.com', '1233');
>>>>>>> 8b2eb0ef7ea615e307c4b3a2cf03b5fefcd3e035:pfe_project (2).sql

-- --------------------------------------------------------

--
-- Table structure for table `respensable`
--

DROP TABLE IF EXISTS `respensable`;
CREATE TABLE IF NOT EXISTS `respensable` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `telphone` int NOT NULL,
  `resp_email` varchar(70) NOT NULL,
  `resp_password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `resp_password` (`resp_password`),
  KEY `resp_email` (`resp_email`)

=======
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `respensable`
--

INSERT INTO `respensable` (`id`, `nom`, `prenom`, `telphone`, `resp_email`, `resp_password`) VALUES
(13, 'lilk', 'lkklnkl', 845, 'user7@gmail.co', '0000'),
(15, 'Iliass', 'Wakkar', 6485654, 'iliasswakkar992@gmail.com', '55555');
>>>>>>> 8b2eb0ef7ea615e307c4b3a2cf03b5fefcd3e035:pfe_project (2).sql

-- --------------------------------------------------------

--
-- Table structure for table `reunion`
--

DROP TABLE IF EXISTS `reunion`;
CREATE TABLE IF NOT EXISTS `reunion` (
  `date` datetime NOT NULL,
  `sujet` text NOT NULL,
  `id_resp` int NOT NULL,
  `id_dir` int NOT NULL,
  PRIMARY KEY (`date`,`id_resp`,`id_dir`),
  KEY `id_resp_reun` (`id_resp`),
  KEY `id_dir_reun` (`id_dir`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Table structure for table `tache`
--

DROP TABLE IF EXISTS `tache`;
CREATE TABLE IF NOT EXISTS `tache` (
  `date` datetime NOT NULL,
  `duree` varchar(30) NOT NULL,
  `dicription` text NOT NULL,
  `id_ouv` int NOT NULL,
  `id_resp` int NOT NULL,
  PRIMARY KEY (`date`,`id_ouv`,`id_resp`),
  KEY `id_ouv` (`id_ouv`),
  KEY `id_resp_tache` (`id_resp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(80) NOT NULL,
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_type` enum('Admin','Respensable','Ouvrier') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`,`password`),
  UNIQUE KEY `email_3` (`email`),
  KEY `password` (`password`),
  KEY `email_2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `user_type`) VALUES
(1, 'user7@gmail.co', '0000', 'Respensable'),
(3, 'user3@gmail.com', '5555', 'Ouvrier'),
(7, 'iliasswak5kar2@gmail.com', '5555', 'Respensable'),
(11, 'user1@gmail.com', '5544', 'Ouvrier'),
(18, 'user10@gmail.com', '1233', 'Ouvrier'),
(19, 'iliasswakkar992@gmail.com', '55555', 'Respensable');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `affectation`
--
ALTER TABLE `affectation`
  ADD CONSTRAINT `id_ET_affect` FOREIGN KEY (`id_ET`) REFERENCES `espace de travail` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_resp_affect` FOREIGN KEY (`id_resp`) REFERENCES `respensable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `capteur`
--
ALTER TABLE `capteur`
  ADD CONSTRAINT `id_ET_capteur` FOREIGN KEY (`id_ET`) REFERENCES `espace de travail` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `dircteur`
--
ALTER TABLE `dircteur`
  ADD CONSTRAINT `dir_email` FOREIGN KEY (`dir_email`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dir_password` FOREIGN KEY (`dir_password`) REFERENCES `users` (`password`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ouvrier`
--
ALTER TABLE `ouvrier`
  ADD CONSTRAINT `ouv_email` FOREIGN KEY (`ouv_email`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ouv_password` FOREIGN KEY (`ouv_password`) REFERENCES `users` (`password`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `respensable`
--
ALTER TABLE `respensable`
  ADD CONSTRAINT `resp_email` FOREIGN KEY (`resp_email`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `resp_password` FOREIGN KEY (`resp_password`) REFERENCES `users` (`password`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
