-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 17, 2024 at 04:19 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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

CREATE TABLE `affectation` (
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `id_ws` int(11) NOT NULL,
  `id_resp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `director`
--

CREATE TABLE `director` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `director`
--

INSERT INTO `director` (`id`) VALUES
(10);

-- --------------------------------------------------------

--
-- Table structure for table `measure`
--

CREATE TABLE `measure` (
  `id` int(11) NOT NULL,
  `gazlvl` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `id_cap` int(11) NOT NULL,
  `gaz_danger` enum('0','1') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

CREATE TABLE `meeting` (
  `start` datetime NOT NULL,
  `end` datetime DEFAULT NULL,
  `title` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `id_resp` int(11) NOT NULL,
  `id_dir` int(11) NOT NULL,
  `allDay` enum('0','1') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meeting`
--

INSERT INTO `meeting` (`start`, `end`, `title`, `description`, `id_resp`, `id_dir`, `allDay`) VALUES
('2024-07-05 00:00:00', NULL, 'just meeting with said', '', 21, 10, '1'),
('2024-07-08 08:00:00', '2024-07-08 11:00:00', 'just a title', '', 21, 10, '0'),
('2024-07-12 00:00:00', NULL, 'update capteurs', '', 21, 10, '1'),
('2024-07-12 07:00:00', '2024-07-12 09:00:00', 'meeting ', '', 21, 10, '0'),
('2024-07-13 00:00:00', NULL, 'title', 'description', 21, 10, '1');

-- --------------------------------------------------------

--
-- Table structure for table `mission`
--

CREATE TABLE `mission` (
  `start` date NOT NULL,
  `end` date NOT NULL,
  `title` varchar(40) NOT NULL,
  `description` text NOT NULL,
  `id_dir` int(11) NOT NULL,
  `id_resp` int(11) NOT NULL,
  `status` enum('inProgress','inReview','onHold','completed','expired') CHARACTER SET utf8mb4 COLLATE utf8mb4_icelandic_ci NOT NULL DEFAULT 'inReview'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mission`
--

INSERT INTO `mission` (`start`, `end`, `title`, `description`, `id_dir`, `id_resp`, `status`) VALUES
('2024-07-10', '2024-07-31', 'just atitle', 'just a description', 10, 21, 'inProgress'),
('2024-07-11', '2024-07-31', 'mission 2', '', 10, 21, 'inReview'),
('2024-07-14', '2024-07-31', 'mission 2 ', '', 10, 21, 'inProgress');

-- --------------------------------------------------------

--
-- Table structure for table `observation`
--

CREATE TABLE `observation` (
  `date` datetime NOT NULL,
  `feedback` text NOT NULL,
  `id_ws` int(11) NOT NULL,
  `id_resp` int(11) NOT NULL,
  `status` enum('pending','completed','archive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `observation`
--

INSERT INTO `observation` (`date`, `feedback`, `id_ws`, `id_resp`, `status`) VALUES
('2024-07-11 00:00:00', 'just feeback', 68, 21, 'pending'),
('2024-07-12 00:00:00', 'feedback fait par said ben ', 68, 21, 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `ouvrier`
--

CREATE TABLE `ouvrier` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ouvrier`
--

INSERT INTO `ouvrier` (`id`) VALUES
(45),
(48),
(50);

-- --------------------------------------------------------

--
-- Table structure for table `respensable`
--

CREATE TABLE `respensable` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `respensable`
--

INSERT INTO `respensable` (`id`) VALUES
(21),
(40),
(44),
(47),
(49);

-- --------------------------------------------------------

--
-- Table structure for table `sensor`
--

CREATE TABLE `sensor` (
  `id` int(11) NOT NULL,
  `type` varchar(60) NOT NULL,
  `id_ws` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sensor`
--

INSERT INTO `sensor` (`id`, `type`, `id_ws`) VALUES
(1, 'MQ-2', 68),
(2, 'MQ-9', 68);

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `date` datetime NOT NULL,
  `duree` varchar(30) NOT NULL,
  `description` text NOT NULL,
  `status` enum('inProgress','completed','expired') CHARACTER SET utf8mb4 COLLATE utf8mb4_icelandic_ci NOT NULL,
  `id_ouv` int(11) NOT NULL,
  `id_resp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`date`, `duree`, `description`, `status`, `id_ouv`, `id_resp`) VALUES
('2024-07-11 08:59:00', '2 hours', 'just a task', 'completed', 45, 21),
('2024-07-11 09:01:00', '2 hours', 'just a description', 'inProgress', 45, 21),
('2024-07-11 09:44:00', '2 hour ', 'just a task', 'inProgress', 45, 21),
('2024-07-11 18:09:00', '2 ', 'tache 1 pour ilyass', 'inProgress', 50, 21),
('2024-07-25 08:42:00', '2 hour ', 'just a description ', 'completed', 45, 21);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(20) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(500) NOT NULL,
  `role` enum('admin','responsable','ouvrier') CHARACTER SET utf8mb4 COLLATE utf8mb4_icelandic_ci NOT NULL,
  `refreshToken` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `role`, `refreshToken`) VALUES
(10, 'root', 'root', 'root@gmail.com', '$2a$10$Mi8nL4YGYe0hl8UNnmCpre23E7NW.BXsGlRsm.59LnF.RxJA.9Txu', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTcyMDgwNTk2OSwiZXhwIjoxNzIwODkyMzY5fQ.FHDlUR7oJZMynZT6mmoITZ_A_5-cwMgXLZ_LVaIkXOc'),
(21, 'said', 'ben', 'saidben@gmail.com', '$2a$10$NQMQKSrtmodYdt4cWfACSu8NxvhKxvh6P0T7f9yzmbXkj.gJntt1.', 'responsable', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImlhdCI6MTcyMDc4MTYwOCwiZXhwIjoxNzIwODY4MDA4fQ.mpTUC2kRn0T2Q44RXrI2VioxMzsZI2nqme5CsrABsws'),
(40, 'resp', 'resp', 'resp@gmail.com', '$2a$10$WaFVJ2P95Uwp4cdX47XIgunVJsz59eXaBAIhCGgqviEp40aFK6PS6', 'responsable', NULL),
(44, 'SAID', 'ibenariba', 'ASDFSDF@gmail.com', '$2a$10$8YfWw/TcybBbNai/URtyT.Ev9hX6UvQJuh55.kTE.wxCfVYnsm8IS', 'responsable', NULL),
(45, 'ouvrier', '', 'ouvrier@gmail.com', '$2a$10$VMWReupwGysRPt3x7DCPO.uI0L1O4G4zPw4iJL6xENXRa2Zv6mjSi', 'ouvrier', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUsImlhdCI6MTcyMDcxNzg2NCwiZXhwIjoxNzIwODA0MjY0fQ.0hQaZ0YXY0xQ4cqnb9jwQHrDes911kbzK4jXbhrWuA8'),
(47, 'Said', 'ibenariba', 'saidiben@gmail.com', '$2a$10$K7xfF4xL6rj1L9VUGJtEYOvnmSEtTMeiX0I/DhsnPSC/hWuTF75LG', 'responsable', NULL),
(48, 'ouvrier 3', 'ourvrier', 'ouvrier2@gmail.com', '$2a$10$D8HBSYqdv5wpR6idFJKBNu5RuO766ldzIESrHbvlJz.z2jDZ0/WY2', 'ouvrier', NULL),
(49, 'said', 'ibenar', 'saidibenariba@gmail.com', '$2a$10$bkVs1klbaRf8StsEdJRA9eDapv2s8DAl7j8Lg2lVe6bFYCxANET0.', 'responsable', NULL),
(50, 'ilyass', 'ilyass', 'ilyass4@gmail.coo', '$2a$10$hqT1rgCADjkDIH/VDdvPUeo051s0qLp7xHEwCfc/AIW.LAFpSwpIa', 'ouvrier', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `workspace`
--

CREATE TABLE `workspace` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workspace`
--

INSERT INTO `workspace` (`id`, `name`) VALUES
(68, 'workspace 1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `affectation`
--
ALTER TABLE `affectation`
  ADD PRIMARY KEY (`start`,`id_ws`,`id_resp`),
  ADD KEY `id_ws_affect` (`id_ws`),
  ADD KEY `id_resp_affect` (`id_resp`);

--
-- Indexes for table `director`
--
ALTER TABLE `director`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `measure`
--
ALTER TABLE `measure`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `date` (`date`,`id_cap`),
  ADD KEY `id_capteur` (`id_cap`);

--
-- Indexes for table `meeting`
--
ALTER TABLE `meeting`
  ADD PRIMARY KEY (`start`,`id_resp`,`id_dir`) USING BTREE,
  ADD UNIQUE KEY `start` (`start`,`id_resp`,`id_dir`) USING BTREE,
  ADD KEY `id_resp_reun` (`id_resp`),
  ADD KEY `id_dir_reun` (`id_dir`);

--
-- Indexes for table `mission`
--
ALTER TABLE `mission`
  ADD PRIMARY KEY (`start`,`id_dir`,`id_resp`),
  ADD UNIQUE KEY `startdate` (`start`,`id_dir`,`id_resp`),
  ADD KEY `id_resp_miss` (`id_resp`),
  ADD KEY `id_dir_miss` (`id_dir`);

--
-- Indexes for table `observation`
--
ALTER TABLE `observation`
  ADD PRIMARY KEY (`date`,`id_ws`,`id_resp`),
  ADD UNIQUE KEY `date` (`date`,`id_ws`,`id_resp`),
  ADD KEY `id_ET_obs` (`id_ws`),
  ADD KEY `id_resp_obs` (`id_resp`);

--
-- Indexes for table `ouvrier`
--
ALTER TABLE `ouvrier`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `respensable`
--
ALTER TABLE `respensable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sensor`
--
ALTER TABLE `sensor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_ws_fk` (`id_ws`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`date`,`id_ouv`,`id_resp`),
  ADD UNIQUE KEY `date` (`date`,`id_ouv`,`id_resp`),
  ADD KEY `id_ouv` (`id_ouv`),
  ADD KEY `id_resp_tache` (`id_resp`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `password` (`password`);

--
-- Indexes for table `workspace`
--
ALTER TABLE `workspace`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `director`
--
ALTER TABLE `director`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `measure`
--
ALTER TABLE `measure`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `ouvrier`
--
ALTER TABLE `ouvrier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `respensable`
--
ALTER TABLE `respensable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `sensor`
--
ALTER TABLE `sensor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `workspace`
--
ALTER TABLE `workspace`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

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
  ADD CONSTRAINT `id_ET_obs` FOREIGN KEY (`id_ws`) REFERENCES `workspace` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
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
  ADD CONSTRAINT `id_ws_fk` FOREIGN KEY (`id_ws`) REFERENCES `workspace` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
