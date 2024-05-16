-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 05, 2024 at 02:33 PM
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
-- Database: `pfeproject`
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_ET` (`id_ET`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

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
  `dir_email` varchar(70) NOT NULL,
  `dir_password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
CREATE TABLE IF NOT EXISTS `login` (
  `email` varchar(80) NOT NULL,
  `password` varchar(50) CHARACTER SET utf8mb4  NOT NULL,
  `user_type` enum('Admin','Respensable','ouvrier') NOT NULL,
  PRIMARY KEY (`email`),
  UNIQUE KEY `password` (`password`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

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
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_cap` (`id_cap`)
) ENGINE=InnoDB AUTO_INCREMENT=282 DEFAULT CHARSET=utf8mb4 ;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

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
  ADD CONSTRAINT `dir_email` FOREIGN KEY (`dir_email`) REFERENCES `login` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dir_password` FOREIGN KEY (`dir_password`) REFERENCES `login` (`password`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `mesure`
--
ALTER TABLE `mesure`
  ADD CONSTRAINT `id_capteur` FOREIGN KEY (`id_cap`) REFERENCES `capteur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `mission`
--
ALTER TABLE `mission`
  ADD CONSTRAINT `id_dir_miss` FOREIGN KEY (`id_dir`) REFERENCES `dircteur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_resp_miss` FOREIGN KEY (`id_resp`) REFERENCES `respensable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `observation`
--
ALTER TABLE `observation`
  ADD CONSTRAINT `id_ET_obs` FOREIGN KEY (`id_ET`) REFERENCES `espace de travail` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_resp_obs` FOREIGN KEY (`id_resp`) REFERENCES `respensable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ouvrier`
--
ALTER TABLE `ouvrier`
  ADD CONSTRAINT `ouv_email` FOREIGN KEY (`ouv_email`) REFERENCES `login` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ouv_password` FOREIGN KEY (`ouv_password`) REFERENCES `login` (`password`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `respensable`
--
ALTER TABLE `respensable`
  ADD CONSTRAINT `resp_email` FOREIGN KEY (`resp_email`) REFERENCES `login` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `resp_password` FOREIGN KEY (`resp_password`) REFERENCES `login` (`password`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reunion`
--
ALTER TABLE `reunion`
  ADD CONSTRAINT `id_dir_reun` FOREIGN KEY (`id_dir`) REFERENCES `dircteur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_resp_reun` FOREIGN KEY (`id_resp`) REFERENCES `respensable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tache`
--
ALTER TABLE `tache`
  ADD CONSTRAINT `id_ouv` FOREIGN KEY (`id_ouv`) REFERENCES `ouvrier` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_resp_tache` FOREIGN KEY (`id_resp`) REFERENCES `respensable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
