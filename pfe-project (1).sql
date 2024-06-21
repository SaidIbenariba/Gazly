-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 08, 2024 at 09:33 AM
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
-- Database: `pfe-project`
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
  UNIQUE KEY `datedebut` (`datedebut`,`id_ET`,`id_resp`),
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `director`
--

INSERT INTO `director` (`id`) VALUES
(1),
(8);

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
  `gaz_danger` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_cap` (`id_cap`)
) ENGINE=InnoDB AUTO_INCREMENT=282 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `measure`
--

INSERT INTO `measure` (`id`, `gazlvl`, `date`, `id_cap`, `gaz_danger`) VALUES
(1, 150, '2024-06-02 23:12:22', 1, '0');

-- --------------------------------------------------------

--
-- Table structure for table `meeting`
--

DROP TABLE IF EXISTS `meeting`;
CREATE TABLE IF NOT EXISTS `meeting` (
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `title` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_resp` int NOT NULL,
  `id_dir` int NOT NULL,
  `allDay` enum('0','1') COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`start`,`end`,`id_resp`,`id_dir`),
  UNIQUE KEY `start` (`start`,`end`,`id_resp`,`id_dir`),
  KEY `id_resp_reun` (`id_resp`),
  KEY `id_dir_reun` (`id_dir`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meeting`
--

INSERT INTO `meeting` (`start`, `end`, `title`, `description`, `id_resp`, `id_dir`, `allDay`) VALUES
('2024-06-03 10:00:00', '2024-06-02 22:16:06', 'firstmeet', 'Monthly Strategy Meeting', 5, 1, '0');

-- --------------------------------------------------------

--
-- Table structure for table `mission`
--

DROP TABLE IF EXISTS `mission`;
CREATE TABLE IF NOT EXISTS `mission` (
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `title` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_dir` int NOT NULL,
  `id_resp` int NOT NULL,
  `status` enum('inProgress','inReview','onHold','completed','expired') CHARACTER SET utf8mb4 COLLATE utf8mb4_icelandic_ci NOT NULL,
  PRIMARY KEY (`start`,`id_dir`,`id_resp`),
  UNIQUE KEY `startdate` (`start`,`id_dir`,`id_resp`),
  KEY `id_resp_miss` (`id_resp`),
  KEY `id_dir_miss` (`id_dir`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mission`
--

INSERT INTO `mission` (`start`, `end`, `title`, `discription`, `id_dir`, `id_resp`, `status`) VALUES
('2024-05-01 08:00:00', '0000-00-00 00:00:00', 'sometitle', 'Project Alpha', 1, 5, 'inProgress');

-- --------------------------------------------------------

--
-- Table structure for table `observation`
--

DROP TABLE IF EXISTS `observation`;
CREATE TABLE IF NOT EXISTS `observation` (
  `date` datetime NOT NULL,
  `feedback` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_WS` int NOT NULL,
  `id_resp` int NOT NULL,
  `status` enum('pending','completed','archive') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`date`,`id_WS`,`id_resp`),
  UNIQUE KEY `date` (`date`,`id_WS`,`id_resp`),
  KEY `id_ET_obs` (`id_WS`),
  KEY `id_resp_obs` (`id_resp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `observation`
--

INSERT INTO `observation` (`date`, `feedback`, `id_WS`, `id_resp`, `status`) VALUES
('2024-06-03 10:00:00', 'Observation 1 for Workspace 1', 1, 5, 'pending'),
('2024-06-03 12:00:00', 'Observation 2 for Workspace 2', 2, 6, 'completed'),
('2024-06-03 14:00:00', 'Observation 3 for Workspace 3', 3, 7, 'pending'),
('2024-06-03 16:00:00', 'Observation 4 for Workspace 1', 1, 5, 'archive');

-- --------------------------------------------------------

--
-- Table structure for table `ouvrier`
--

DROP TABLE IF EXISTS `ouvrier`;
CREATE TABLE IF NOT EXISTS `ouvrier` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ouvrier`
--

INSERT INTO `ouvrier` (`id`) VALUES
(2),
(3),
(4);

-- --------------------------------------------------------

--
-- Table structure for table `respensable`
--

DROP TABLE IF EXISTS `respensable`;
CREATE TABLE IF NOT EXISTS `respensable` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `respensable`
--

INSERT INTO `respensable` (`id`) VALUES
(5),
(6),
(7);

-- --------------------------------------------------------

--
-- Table structure for table `sensor`
--

DROP TABLE IF EXISTS `sensor`;
CREATE TABLE IF NOT EXISTS `sensor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_WS` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_ET` (`id_WS`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sensor`
--

INSERT INTO `sensor` (`id`, `type`, `id_WS`) VALUES
(1, 'MQ-2', 1),
(2, 'MQ-3', 2);

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
CREATE TABLE IF NOT EXISTS `task` ( 
  `date` datetime NOT NULL,
  `duree` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('done','inprogress',"expired") CHARACTER SET utf8mb4 COLLATE utf8mb4_icelandic_ci NOT NULL,
  `id_ouv` int NOT NULL,
  `id_resp` int NOT NULL,
  PRIMARY KEY (`date`,`id_ouv`,`id_resp`),
  UNIQUE KEY `date` (`date`,`id_ouv`,`id_resp`),
  KEY `id_ouv` (`id_ouv`),
  KEY `id_resp_tache` (`id_resp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`date`, `duree`, `description`, `status`, `id_ouv`, `id_resp`) VALUES
('2024-05-01 08:00:00', '2 hours', 'Task A', 'inProgress', 2, 5),
('2024-06-01 08:00:00', '3 hours', 'Task B', 'inReview', 3, 6),
('2024-07-01 08:00:00', '4 hours', 'Task C', '', 4, 7);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lastname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('admin','responsable','ouvrier') CHARACTER SET utf8mb4 COLLATE utf8mb4_icelandic_ci NOT NULL,
  `refreshToken` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `password` (`password`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `role`, `refreshToken`) VALUES
(1, 'iliass', 'wakkar', 'iliass@gmail.com', '$2a$10$ThNDXteWxsEJxhiRGwFpwewFdsCxZZDrGy7Hau48bRk6Y0mItGfpC', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE3NDI1MzkwLCJleHAiOjE3MTc1MTE3OTB9.ndLCdydJSeUg0H-U2RvDHvvWx0shY0yfTUdnU3ajse4'),
(2, 'John', 'Doe', 'john.doe@example.com', 'password1', 'ouvrier', ''),
(3, 'Jane', 'Smith', 'jane.smith@example.com', 'password2', 'ouvrier', ''),
(4, 'Bob', 'Brown', 'bob.brown@example.com', 'password3', 'ouvrier', ''),
(5, 'Alice', 'Johnson', 'alice.johnson@example.com', 'password4', 'responsable', ''),
(6, 'Charlie', 'Miller', 'charlie.miller@example.com', 'password5', 'responsable', ''),
(7, 'Eve', 'Davis', 'eve.davis@example.com', 'password6', 'responsable', ''),
(8, 'said', 'ibenariba', 'saidbenarabia55@gmail.com', 'said', 'admin', '');

-- --------------------------------------------------------

--
-- Table structure for table `workspace`
--

DROP TABLE IF EXISTS `workspace`;
CREATE TABLE IF NOT EXISTS `workspace` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `x` float NOT NULL,
  `y` float NOT NULL,
  `id_resp` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_resp_ws` (`id_resp`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workspace`
--

INSERT INTO `workspace` (`id`, `name`, `x`, `y`, `id_resp`) VALUES
(1, 'Workspace 1', 34.0229, -6.84165, 8),
(2, 'Workspace 2', 34.0208, -6.84288, 8),
(3, 'Workspace 3', 34.0234, -6.8551, 8);

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
-- Constraints for table `director`
--
ALTER TABLE `director`
  ADD CONSTRAINT `id_dir` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `measure`
--
ALTER TABLE `measure`
  ADD CONSTRAINT `id_capteur` FOREIGN KEY (`id_cap`) REFERENCES `sensor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `meeting`
--
ALTER TABLE `meeting`
  ADD CONSTRAINT `id_dir_meet` FOREIGN KEY (`id_dir`) REFERENCES `director` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_resp_meet` FOREIGN KEY (`id_resp`) REFERENCES `respensable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `id_ET_obs` FOREIGN KEY (`id_WS`) REFERENCES `workspace` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
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

--
-- Constraints for table `workspace`
--
ALTER TABLE `workspace`
  ADD CONSTRAINT `id_resp_ws` FOREIGN KEY (`id_resp`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
