-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: May 19, 2024 at 01:03 PM
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
-- Database: `pfe-project`
--

-- --------------------------------------------------------

--
-- Table structure for table `affectation`
--

CREATE TABLE `affectation` (
  `datedebut` datetime NOT NULL,
  `datefin` datetime NOT NULL,
  `id_ET` int(11) NOT NULL,
  `id_resp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `capteur`
--

CREATE TABLE `capteur` (
  `id` int(11) NOT NULL,
  `type` varchar(60) NOT NULL,
  `id_ET` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `directeur`
--

CREATE TABLE `directeur` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `telphone` int(11) NOT NULL,
  `dir_email` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `espace de travail`
--

CREATE TABLE `espace de travail` (
  `id` int(11) NOT NULL,
  `nom` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `mission`
--

CREATE TABLE `mission` (
  `startdate` datetime NOT NULL,
  `duree` int(11) NOT NULL,
  `discription` text NOT NULL,
  `id_dir` int(11) NOT NULL,
  `id_resp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `observation`
--

CREATE TABLE `observation` (
  `date` datetime NOT NULL,
  `sujet` text NOT NULL,
  `id_ET` int(11) NOT NULL,
  `id_resp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ouvrier`
--

CREATE TABLE `ouvrier` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `telphone` int(11) NOT NULL,
  `ouv_email` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `respensable`
--

CREATE TABLE `respensable` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `telphone` int(11) NOT NULL,
  `resp_email` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reunion`
--

CREATE TABLE `reunion` (
  `date` datetime NOT NULL,
  `sujet` text NOT NULL,
  `id_resp` int(11) NOT NULL,
  `id_dir` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tache`
--

CREATE TABLE `tache` (
  `date` datetime NOT NULL,
  `duree` varchar(30) NOT NULL,
  `description` text NOT NULL,
  `id_ouv` int(11) NOT NULL,
  `id_resp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `refreshToken` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `role`, `refreshToken`) VALUES
(0, 'said', 'ibenariba', 'saidbenarabia55@gmail.com', 'said', 'admin', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `affectation`
--
ALTER TABLE `affectation`
  ADD PRIMARY KEY (`datedebut`,`id_ET`,`id_resp`),
  ADD KEY `id_ET_affect` (`id_ET`),
  ADD KEY `id_resp_affect` (`id_resp`);

--
-- Indexes for table `capteur`
--
ALTER TABLE `capteur`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_ET` (`id_ET`);

--
-- Indexes for table `directeur`
--
ALTER TABLE `directeur`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dir_email` (`dir_email`);

--
-- Indexes for table `espace de travail`
--
ALTER TABLE `espace de travail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `measure`
--
ALTER TABLE `measure`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_cap` (`id_cap`);

--
-- Indexes for table `mission`
--
ALTER TABLE `mission`
  ADD PRIMARY KEY (`startdate`,`id_dir`,`id_resp`),
  ADD KEY `id_resp_miss` (`id_resp`),
  ADD KEY `id_dir_miss` (`id_dir`);

--
-- Indexes for table `observation`
--
ALTER TABLE `observation`
  ADD PRIMARY KEY (`date`,`id_ET`,`id_resp`),
  ADD KEY `id_ET_obs` (`id_ET`),
  ADD KEY `id_resp_obs` (`id_resp`);

--
-- Indexes for table `ouvrier`
--
ALTER TABLE `ouvrier`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ouv_email` (`ouv_email`);

--
-- Indexes for table `respensable`
--
ALTER TABLE `respensable`
  ADD PRIMARY KEY (`id`),
  ADD KEY `resp_email` (`resp_email`);

--
-- Indexes for table `reunion`
--
ALTER TABLE `reunion`
  ADD PRIMARY KEY (`date`,`id_resp`,`id_dir`),
  ADD KEY `id_resp_reun` (`id_resp`),
  ADD KEY `id_dir_reun` (`id_dir`);

--
-- Indexes for table `tache`
--
ALTER TABLE `tache`
  ADD PRIMARY KEY (`date`,`id_ouv`,`id_resp`),
  ADD KEY `id_ouv` (`id_ouv`),
  ADD KEY `id_resp_tache` (`id_resp`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `password` (`password`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `capteur`
--
ALTER TABLE `capteur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `directeur`
--
ALTER TABLE `directeur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `espace de travail`
--
ALTER TABLE `espace de travail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `measure`
--
ALTER TABLE `measure`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=282;

--
-- AUTO_INCREMENT for table `ouvrier`
--
ALTER TABLE `ouvrier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `respensable`
--
ALTER TABLE `respensable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
-- Constraints for table `measure`
--
ALTER TABLE `measure`
  ADD CONSTRAINT `id_capteur` FOREIGN KEY (`id_cap`) REFERENCES `capteur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `mission`
--
ALTER TABLE `mission`
  ADD CONSTRAINT `id_dir_miss` FOREIGN KEY (`id_dir`) REFERENCES `directeur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_resp_miss` FOREIGN KEY (`id_resp`) REFERENCES `respensable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `observation`
--
ALTER TABLE `observation`
  ADD CONSTRAINT `id_ET_obs` FOREIGN KEY (`id_ET`) REFERENCES `espace de travail` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_resp_obs` FOREIGN KEY (`id_resp`) REFERENCES `respensable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reunion`
--
ALTER TABLE `reunion`
  ADD CONSTRAINT `id_dir_reun` FOREIGN KEY (`id_dir`) REFERENCES `directeur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
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
