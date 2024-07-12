-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 03, 2024 at 03:40 PM
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
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `id_ws` int NOT NULL,
  `id_resp` int NOT NULL,
  PRIMARY KEY (`start`,`id_ws`,`id_resp`),
  KEY `id_ws_affect` (`id_ws`),
  KEY `id_resp_affect` (`id_resp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 
-- Dumping data for table `affectation`
--

INSERT INTO `affectation` (`start`, `end`, `id_ws`, `id_resp`) VALUES
('2024-01-01 00:00:00', '2024-06-20 23:59:59', 2, 6),
('2024-03-01 00:00:00', '2024-06-29 00:23:53', 2, 6),
('2024-05-01 00:00:00', '2024-06-30 23:59:59', 1, 5),
('2024-06-00 00:00:00', '2024-06-29 23:59:59', 3, 7),
('2024-06-01 00:00:00', '2024-06-19 23:59:59', 1, 5),
('2024-06-11 00:00:00', '2024-06-18 23:59:59', 3, 7),
('2024-06-21 00:00:00', '2024-06-03 00:24:40', 3, 7),
('2024-06-25 00:00:00', '2024-06-24 00:00:00', 1, 5),
('2024-06-26 00:00:00', '2024-06-17 00:00:00', 1, 5),
('2024-07-01 00:00:00', '2024-06-05 00:23:42', 1, 5),
('2024-07-01 00:00:00', '2023-07-31 23:59:59', 2, 6),
('2024-08-01 00:00:00', '2022-08-24 23:59:59', 3, 7),
('2024-09-01 00:00:00', '2024-06-02 23:59:59', 2, 6);

-- --------------------------------------------------------

--
-- Table structure for table `director`
--

DROP TABLE IF EXISTS `director`;
CREATE TABLE IF NOT EXISTS `director` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `director`
--

INSERT INTO `director` (`id`) VALUES
(1),
(8),
(10);

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
  UNIQUE KEY `date` (`date`,`id_cap`),
  KEY `id_capteur` (`id_cap`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `measure`
--

INSERT INTO `measure` (`id`, `gazlvl`, `date`, `id_cap`, `gaz_danger`) VALUES
(1, 1178, '2024-06-27 00:42:27', 2, '1'),
(2, 484, '2024-06-27 00:42:27', 1, '0'),
(3, 1162, '2024-06-27 00:47:28', 2, '1'),
(4, 194, '2024-06-27 00:47:28', 1, '0'),
(5, 1168, '2024-06-27 00:52:30', 2, '1'),
(6, 174, '2024-06-27 00:52:30', 1, '0'),
(7, 1168, '2024-06-27 00:57:31', 2, '1'),
(8, 158, '2024-06-27 00:57:31', 1, '0'),
(9, 1163, '2024-06-27 01:02:31', 2, '1'),
(10, 141, '2024-06-27 01:02:31', 1, '0'),
(11, 1151, '2024-06-27 01:07:31', 2, '1'),
(12, 1268, '2024-06-27 01:07:31', 1, '1'),
(13, 1045, '2024-06-27 01:12:33', 2, '1'),
(14, 222, '2024-06-27 01:12:33', 1, '0'),
(15, 727, '2024-06-27 01:17:34', 2, '1'),
(16, 128, '2024-06-27 01:17:34', 1, '0'),
(17, 634, '2024-06-27 01:22:36', 2, '1'),
(18, 107, '2024-06-27 01:22:36', 1, '0'),
(19, 608, '2024-06-27 01:27:39', 2, '1'),
(20, 96, '2024-06-27 01:27:39', 1, '0'),
(21, 598, '2024-06-27 01:32:39', 2, '1'),
(22, 80, '2024-06-27 01:32:39', 1, '0'),
(23, 583, '2024-06-27 01:37:40', 2, '1'),
(24, 65, '2024-06-27 01:37:40', 1, '0'),
(25, 918, '2024-06-27 01:42:42', 2, '1'),
(26, 222, '2024-06-27 01:42:42', 1, '0'),
(27, 688, '2024-06-27 01:47:44', 2, '1'),
(28, 122, '2024-06-27 01:47:44', 1, '0'),
(29, 2158, '2024-06-27 01:52:44', 2, '1'),
(30, 574, '2024-06-27 01:52:44', 1, '1'),
(31, 2966, '2024-06-27 01:57:46', 2, '1'),
(32, 589, '2024-06-27 01:57:46', 1, '1'),
(33, 1856, '2024-06-27 02:02:48', 2, '1'),
(34, 659, '2024-06-27 02:02:48', 1, '1'),
(35, 795, '2024-06-27 02:07:49', 2, '1'),
(36, 0, '2024-06-27 02:07:49', 1, '0'),
(37, 739, '2024-06-27 02:12:50', 2, '1'),
(38, 0, '2024-06-27 02:12:50', 1, '0'),
(39, 10, '2024-06-27 02:17:52', 2, '0'),
(40, 0, '2024-06-27 02:17:52', 1, '0'),
(41, 1406, '2024-07-01 16:50:21', 2, '1'),
(42, 320, '2024-07-01 16:50:21', 1, '0');

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
('2024-06-03 10:00:00', '2024-06-02 22:16:06', 'firstmeet', 'Monthly Strategy Meeting', 5, 10, '0'),
('2024-06-15 09:00:00', '2024-06-15 10:00:00', 'Meeting 1', 'Description 1', 5, 10, '0'),
('2024-06-20 14:00:00', '2024-06-20 15:00:00', 'Meeting 2', 'Description 2', 6, 10, '0'),
('2024-06-25 13:00:00', '2024-06-25 14:00:00', 'Meeting 3', 'Description 3', 7, 10, '0');

-- --------------------------------------------------------

--
-- Table structure for table `mission`
--

DROP TABLE IF EXISTS `mission`;
CREATE TABLE IF NOT EXISTS `mission` (
  `start` date NOT NULL,
  `end` date NOT NULL,
  `title` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_dir` int NOT NULL,
  `id_resp` int NOT NULL,
  `status` enum('inProgress','inReview','onHold','completed','expired') CHARACTER SET utf8mb4 COLLATE utf8mb4_icelandic_ci NOT NULL DEFAULT 'inReview',
  PRIMARY KEY (`start`,`id_dir`,`id_resp`),
  UNIQUE KEY `startdate` (`start`,`id_dir`,`id_resp`),
  KEY `id_resp_miss` (`id_resp`),
  KEY `id_dir_miss` (`id_dir`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mission`
--

INSERT INTO `mission` (`start`, `end`, `title`, `description`, `id_dir`, `id_resp`, `status`) VALUES
('2024-06-01', '2024-06-10', 'Mission 1', 'Description 1', 10, 5, 'inProgress'),
('2024-06-11', '2024-06-20', 'Mission 2', 'Description 2', 10, 6, 'inProgress'),
('2024-06-21', '2024-06-30', 'Mission 3', 'Description 3', 10, 7, 'inProgress'),
('2024-06-23', '2024-06-23', 'mission1', 'something', 10, 5, 'inReview'),
('2024-06-29', '2024-07-07', 'mission2', 'something', 10, 6, 'inProgress'),
('2024-07-01', '2024-07-10', 'Mission 4', 'Description 4', 10, 5, 'inReview'),
('2024-07-11', '2024-07-20', 'Mission 5', 'Description 5', 10, 6, 'inReview'),
('2024-07-21', '2024-07-30', 'Mission 6', 'Description 6', 10, 7, 'inReview'),
('2024-08-01', '2024-08-10', 'Mission 7', 'Description 7', 10, 5, 'onHold'),
('2024-08-11', '2024-08-20', 'Mission 8', 'Description 8', 10, 6, 'onHold'),
('2024-08-21', '2024-08-30', 'Mission 9', 'Description 9', 10, 7, 'onHold'),
('2024-09-01', '2024-09-10', 'Mission 10', 'Description 10', 10, 5, 'completed'),
('2024-09-11', '2024-09-20', 'Mission 11', 'Description 11', 10, 6, 'completed'),
('2024-09-21', '2024-09-30', 'Mission 12', 'Description 12', 10, 7, 'completed'),
('2024-10-01', '2024-10-10', 'Mission 13', 'Description 13', 10, 5, 'expired'),
('2024-10-11', '2024-10-20', 'Mission 14', 'Description 14', 10, 6, 'expired'),
('2024-10-21', '2024-10-30', 'Mission 15', 'Description 15', 10, 7, 'expired');

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
('2024-01-02 12:00:00', 'Feedback 6', 3, 7, 'completed'),
('2024-02-03 12:00:00', 'Feedback 9', 3, 7, 'archive'),
('2024-03-02 11:00:00', 'Feedback 5', 2, 6, 'completed'),
('2024-04-02 10:00:00', 'Feedback 4', 1, 5, 'completed'),
('2024-06-01 10:00:00', 'Feedback 1', 1, 5, 'pending'),
('2024-06-01 11:00:00', 'Feedback 2', 2, 6, 'pending'),
('2024-06-01 12:00:00', 'Feedback 3', 3, 7, 'pending'),
('2024-06-03 10:00:00', 'Observation 1 for Workspace 1', 1, 5, 'pending'),
('2024-06-03 12:00:00', 'Observation 2 for Workspace 2', 2, 6, 'completed'),
('2024-06-03 14:00:00', 'Observation 3 for Workspace 3', 3, 7, 'pending'),
('2024-06-03 16:00:00', 'Observation 4 for Workspace 1', 1, 5, 'archive'),
('2024-07-03 11:00:00', 'Feedback 8', 2, 6, 'archive'),
('2024-09-03 10:00:00', 'Feedback 7', 1, 5, 'archive');

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
(2, 'MQ-9', 2);

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
CREATE TABLE IF NOT EXISTS `task` (
  `date` datetime NOT NULL,
  `duree` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('inProgress','inReview','onHold','completed','expired') CHARACTER SET utf8mb4 COLLATE utf8mb4_icelandic_ci NOT NULL,
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
('2024-06-01 08:00:00', '2 hours', 'Task inProgress 1', 'inProgress', 2, 5),
('2024-06-01 08:00:00', '3 hours', 'Task B', 'inReview', 3, 6),
('2024-06-01 09:00:00', '3 hours', 'Task inProgress 2', 'inProgress', 3, 6),
('2024-06-01 10:00:00', '4 hours', 'Task inProgress 3', 'inProgress', 4, 7),
('2024-06-02 08:00:00', '2 hours', 'Task inReview 1', 'inReview', 2, 5),
('2024-06-02 09:00:00', '3 hours', 'Task inReview 2', 'inReview', 3, 6),
('2024-06-02 10:00:00', '4 hours', 'Task inReview 3', 'inReview', 4, 7),
('2024-06-03 08:00:00', '2 hours', 'Task onHold 1', 'onHold', 2, 5),
('2024-06-03 09:00:00', '3 hours', 'Task onHold 2', 'onHold', 3, 6),
('2024-06-03 10:00:00', '4 hours', 'Task onHold 3', 'onHold', 4, 7),
('2024-06-04 08:00:00', '2 hours', 'Task completed 1', 'completed', 2, 5),
('2024-06-04 09:00:00', '3 hours', 'Task completed 2', 'completed', 3, 6),
('2024-06-04 10:00:00', '4 hours', 'Task completed 3', 'completed', 4, 7),
('2024-06-05 08:00:00', '2 hours', 'Task expired 1', 'expired', 2, 5),
('2024-06-05 09:00:00', '3 hours', 'Task expired 2', 'expired', 3, 6),
('2024-06-05 10:00:00', '4 hours', 'Task expired 3', 'expired', 4, 7),
('2024-07-01 08:00:00', '4 hours', 'Task C', 'inProgress', 4, 7);

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
  `refreshToken` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `password` (`password`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `role`, `refreshToken`) VALUES
(1, 'iliass', 'wakkar', 'iliass@gmail.com', '$2a$10$ThNDXteWxsEJxhiRGwFpwewFdsCxZZDrGy7Hau48bRk6Y0mItGfpC', '', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE5MDcwMTY2LCJleHAiOjE3MTkxNTY1NjZ9.0MRBHoaw-w_nutNbIwEWe7Y9Y3zA6BxgdgBsK6IonwI'),
(2, 'John', 'Doe', 'john.doe@example.com', 'password1', 'ouvrier', ''),
(3, 'Jane', 'Smith', 'jane.smith@example.com', 'password2', 'ouvrier', ''),
(4, 'Bob', 'Brown', 'bob.brown@example.com', 'password3', 'ouvrier', ''),
(5, 'Alice', 'Johnson', 'alice.johnson@example.com', 'password4', 'responsable', ''),
(6, 'Charlie', 'Miller', 'charlie.miller@example.com', 'password5', 'responsable', ''),
(7, 'Eve', 'Davis', 'eve.davis@example.com', 'password6', 'responsable', ''),
(8, 'said', 'ibenariba', 'saidbenarabia55@gmail.com', 'said', 'admin', ''),
(10, 'root', 'root', 'root@gmail.com', '$2a$10$Mi8nL4YGYe0hl8UNnmCpre23E7NW.BXsGlRsm.59LnF.RxJA.9Txu', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTcxOTQxMzY4MywiZXhwIjoxNzE5NTAwMDgzfQ.8V01l0rec6rcEjIrYiKVk2xUpliabGLO8vqipel1OJA');

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workspace`
--

INSERT INTO `workspace` (`id`, `name`, `x`, `y`) VALUES
(1, 'Workspace 1', 34.0229, -6.
(2, 'Workspace 2', 34.0208, -6.84288),
(3, 'Workspace 3', 34.0234, -6.8551),
(4, 'Workspace 4', 34.024, -6.842),
(5, 'Workspace 5', 34.025, -6.843),
(6, 'Workspace 6', 34.026, -6.844);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `affectation`
--
ALTER TABLE `affectation`
  ADD CONSTRAINT `id_resp_affect` FOREIGN KEY (`id_resp`) REFERENCES `respensable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_ws_affect` FOREIGN KEY (`id_ws`) REFERENCES `workspace` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
