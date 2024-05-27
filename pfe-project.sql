-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 19, 2024 at 01:05 PM
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `director`
--

DROP TABLE IF EXISTS `director`;
CREATE TABLE IF NOT EXISTS `director` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `measure`
--

DROP TABLE IF EXISTS `measure`;
CREATE TABLE IF NOT EXISTS `measure` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gazlvl` int NOT NULL,
  `date` datetime NOT NULL,
  `id_cap` int NOT NULL,
  `gaz_danger` enum('0','1') COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_cap` (`id_cap`)
) ENGINE=InnoDB AUTO_INCREMENT=282 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `meeting`
--

DROP TABLE IF EXISTS `meeting`;
CREATE TABLE IF NOT EXISTS `meeting` (
  `id` INT  AUTO_INCREMENT,
  `start` datetime NOT NULL,
  `title` text COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci ,
  `id_resp` int NOT NULL,
  `id_dir` int NOT NULL,
  PRIMARY KEY (`id`,`id_resp`,`id_dir`),
  KEY `id_resp_reun` (`id_resp`),
  KEY `id_dir_reun` (`id_dir`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mission`
--

DROP TABLE IF EXISTS `mission`;
CREATE TABLE IF NOT EXISTS `mission` (
  `startdate` datetime NOT NULL,
  `duree` int NOT NULL,
  `discription` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_dir` int NOT NULL,
  `id_resp` int NOT NULL,
  `stat` enum('done','inprogress','expired') CHARACTER SET utf8mb4 COLLATE utf8mb4_icelandic_ci NOT NULL,
  PRIMARY KEY (`startdate`,`id_dir`,`id_resp`),
  KEY `id_resp_miss` (`id_resp`),
  KEY `id_dir_miss` (`id_dir`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `observation`
--

DROP TABLE IF EXISTS `observation`;
CREATE TABLE IF NOT EXISTS `observation` (
  `date` datetime NOT NULL,
  `sujet` text COLLATE utf8mb4_general_ci NOT NULL,
  `id_ET` int NOT NULL,
  `id_resp` int NOT NULL,
  PRIMARY KEY (`date`,`id_ET`,`id_resp`),
  KEY `id_ET_obs` (`id_ET`),
  KEY `id_resp_obs` (`id_resp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ouvrier`
--

DROP TABLE IF EXISTS `ouvrier`;
CREATE TABLE IF NOT EXISTS `ouvrier` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `respensable`
--

DROP TABLE IF EXISTS `respensable`;
CREATE TABLE IF NOT EXISTS `respensable` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sensor`
--

DROP TABLE IF EXISTS `sensor`;
CREATE TABLE IF NOT EXISTS `sensor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(60) COLLATE utf8mb4_general_ci NOT NULL,
  `id_WS` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_ET` (`id_WS`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sensor`
--

INSERT INTO `sensor` (`id`, `type`, `id_WS`) VALUES
(1, 'MQ-2', 1),
(2, 'MQ-9', 2),
(3, 'MQ-?', 3);

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
CREATE TABLE IF NOT EXISTS `task` (
  `date` datetime NOT NULL,
  `duree` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `stat` enum('done','inprogress','expired') CHARACTER SET utf8mb4 COLLATE utf8mb4_icelandic_ci NOT NULL,
  `id_ouv` int NOT NULL,
  `id_resp` int NOT NULL,
  PRIMARY KEY (`date`,`id_ouv`,`id_resp`),
  KEY `id_ouv` (`id_ouv`),
  KEY `id_resp_tache` (`id_resp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL,
  `firstname` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `lastname` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(80) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('admin','responsable','ouvrier') CHARACTER SET utf8mb4 COLLATE utf8mb4_icelandic_ci NOT NULL,
  `refreshToken` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `password` (`password`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `role`, `refreshToken`) VALUES
(0, 'said', 'ibenariba', 'saidbenarabia55@gmail.com', 'said', 'admin', ''),
(1, 'iliass', 'wakkar', 'iliass.wakkar@um5r.ac.ma', '1234', 'admin', ''),
(2, 'John', 'Doe', 'john.doe@example.com', 'password1', 'ouvrier', ''),
(3, 'Jane', 'Smith', 'jane.smith@example.com', 'password2', 'ouvrier', ''),
(4, 'Bob', 'Brown', 'bob.brown@example.com', 'password3', 'ouvrier', ''),
(5, 'Alice', 'Johnson', 'alice.johnson@example.com', 'password4', 'responsable', ''),
(6, 'Charlie', 'Miller', 'charlie.miller@example.com', 'password5', 'responsable', ''),
(7, 'Eve', 'Davis', 'eve.davis@example.com', 'password6', 'responsable', '');

-- --------------------------------------------------------

--
-- Table structure for table `workspace`
--

DROP TABLE IF EXISTS `workspace`;
CREATE TABLE IF NOT EXISTS `workspace` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workspace`
--

INSERT INTO `workspace` (`id`, `nom`) VALUES
(1, 'Workspace 1'),
(2, 'Workspace 2'),
(3, 'Workspace 3');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `affectation`
--
ALTER TABLE `affectation`
  ADD CONSTRAINT `id_ET_affect` FOREIGN KEY (`id_ET`) REFERENCES `workspace` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_resp_affect` FOREIGN KEY (`id_resp`) REFERENCES `respensable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `measure`
--
ALTER TABLE `measure`
  ADD CONSTRAINT `id_capteur` FOREIGN KEY (`id_cap`) REFERENCES `sensor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `meeting`
--
ALTER TABLE `meeting`
  ADD CONSTRAINT `id_dir_reun` FOREIGN KEY (`id_dir`) REFERENCES `director` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_resp_reun` FOREIGN KEY (`id_resp`) REFERENCES `respensable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `mission`
--
ALTER TABLE `mission`
  ADD CONSTRAINT `id_dir_miss` FOREIGN KEY (`id_dir`) REFERENCES `director` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_resp_miss` FOREIGN KEY (`id_resp`) REFERENCES `respensable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `observation`
--
ALTER TABLE `observation`
  ADD CONSTRAINT `id_ET_obs` FOREIGN KEY (`id_ET`) REFERENCES `workspace` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_resp_obs` FOREIGN KEY (`id_resp`) REFERENCES `respensable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ouvrier`
--
ALTER TABLE `ouvrier`
  ADD CONSTRAINT `id_ouv` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `respensable`
--
ALTER TABLE `respensable`
  ADD CONSTRAINT `id_resp` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sensor`
--
ALTER TABLE `sensor`
  ADD CONSTRAINT `id_WS_capteur` FOREIGN KEY (`id_WS`) REFERENCES `workspace` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `id_ouv_task` FOREIGN KEY (`id_ouv`) REFERENCES `ouvrier` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_resp_task` FOREIGN KEY (`id_resp`) REFERENCES `respensable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;