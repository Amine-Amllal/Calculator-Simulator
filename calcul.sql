-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 06, 2025 at 06:40 PM
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
-- Database: `calcul`
--

-- --------------------------------------------------------

--
-- Table structure for table `historique_calcul`
--

CREATE TABLE `historique_calcul` (
  `id` int(11) NOT NULL,
  `formule` varchar(255) NOT NULL,
  `date_heure` timestamp NOT NULL DEFAULT current_timestamp(),
  `utilisateur_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `historique_calcul`
--

INSERT INTO `historique_calcul` (`id`, `formule`, `date_heure`, `utilisateur_id`) VALUES
(160, '√(2)*20 = 28.284271247461902', '2025-01-03 01:36:35', 48),
(161, '28.284271247461902/π = 9.003163161571061', '2025-01-03 01:36:42', 48),
(162, '99 = 99', '2025-01-03 21:21:07', 48),
(163, '99 = 99', '2025-01-03 21:21:07', 48),
(164, '99 = 99', '2025-01-03 21:21:08', 48),
(165, '99 = 99', '2025-01-03 21:21:08', 48),
(166, '99 = 99', '2025-01-03 21:21:08', 48),
(167, '99 = 99', '2025-01-03 21:21:08', 48),
(168, '17/10/2004 = 0.0008483033932135728', '2025-01-05 19:31:36', 49),
(169, '√(16) = 4', '2025-01-06 17:23:05', 49),
(174, '15*(15+5) = 300', '2025-01-06 17:23:53', 49),
(175, '17+10*(2004) = 20057', '2025-01-06 17:24:13', 49),
(176, '5^2 = 25', '2025-01-06 17:24:31', 49);

-- --------------------------------------------------------

--
-- Table structure for table `historique_graph`
--

CREATE TABLE `historique_graph` (
  `id` int(11) NOT NULL,
  `funct` varchar(255) NOT NULL,
  `date_heure` datetime NOT NULL DEFAULT current_timestamp(),
  `utilisateur_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `historique_graph`
--

INSERT INTO `historique_graph` (`id`, `funct`, `date_heure`, `utilisateur_id`) VALUES
(10, '1/x', '2025-01-02 18:28:21', 48),
(11, 'sin(x)', '2025-01-03 22:21:51', 48),
(12, 'sin(x)', '2025-01-05 20:30:35', 48),
(13, '1/x', '2025-01-05 20:30:42', 48),
(14, 'sin(x)', '2025-01-05 20:30:44', 48),
(15, '1/x', '2025-01-06 09:51:31', 49),
(16, 'sin(x)', '2025-01-06 18:25:50', 49),
(17, 'abs(x)', '2025-01-06 18:26:05', 49);

-- --------------------------------------------------------

--
-- Table structure for table `historique_matrice`
--

CREATE TABLE `historique_matrice` (
  `id` int(11) NOT NULL,
  `utilisateur_id` int(11) NOT NULL,
  `operation` varchar(255) NOT NULL,
  `matrices` text NOT NULL,
  `result` text NOT NULL,
  `date_heure` varchar(255) NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `historique_matrice`
--

INSERT INTO `historique_matrice` (`id`, `utilisateur_id`, `operation`, `matrices`, `result`, `date_heure`) VALUES
(28, 48, 'addition', '{\"matrixA\":[[17,0,0],[0,0,0],[0,0,0]],\"matrixB\":[[0,0,0],[0,0,0],[0,0,0]]}', '[[17,0,0],[0,0,0],[0,0,0]]', '2025-01-02 18:27:49'),
(29, 48, 'addition', '{\"matrixA\":[[45,45,0],[0,0,0],[0,0,0]],\"matrixB\":[[0,0,0],[0,0,0],[0,0,0]]}', '[[45,45,0],[0,0,0],[0,0,0]]', '2025-01-02 18:28:01'),
(30, 48, 'multiply', '{\"matrixA\":[[0,0,0],[0,0,0],[0,0,0]],\"matrixB\":[[0,0,0],[0,0,0],[0,0,0]]}', '[[0,0,0],[0,0,0],[0,0,0]]', '2025-01-03 22:21:31'),
(31, 48, 'addition', '{\"matrixA\":[[0,0,0],[0,0,0],[0,0,0]],\"matrixB\":[[0,0,0],[0,0,0],[0,0,0]]}', '[[0,0,0],[0,0,0],[0,0,0]]', '2025-01-03 22:21:31'),
(32, 48, 'subtract', '{\"matrixA\":[[0,0,0],[0,0,0],[0,0,0]],\"matrixB\":[[0,0,0],[0,0,0],[0,0,0]]}', '[[0,0,0],[0,0,0],[0,0,0]]', '2025-01-03 22:21:32'),
(33, 48, 'multiply', '{\"matrixA\":[[0,0,45],[0,0,45],[0,0,45]],\"matrixB\":[[4545,4545,454],[5445,454,545],[4545,454,545]]}', '[[204525,20430,24525],[204525,20430,24525],[204525,20430,24525]]', '2025-01-05 19:50:32'),
(34, 49, 'determinant', '{\"matrix\":\"A\",\"input\":[[1,0,0],[0,2,0],[0,0,3]]}', '6', '2025-01-06 09:27:56'),
(35, 49, 'addition', '{\"matrixA\":[[0,0,0],[0,0,0],[0,0,0]],\"matrixB\":[[0,0,0],[0,0,0],[0,0,0]]}', '[[0,0,0],[0,0,0],[0,0,0]]', '2025-01-06 09:54:21'),
(36, 49, 'subtract', '{\"matrixA\":[[0,0,0],[0,0,0],[0,0,0]],\"matrixB\":[[2,0,0],[0,0,0],[0,0,0]]}', '[[-2,0,0],[0,0,0],[0,0,0]]', '2025-01-06 09:54:33'),
(37, 49, 'multiply', '{\"matrixA\":[[17,65,74],[10,45,13],[45,56,47]],\"matrixB\":[[15,85,78],[34,45,98],[15,65,34]]}', '[[3575,9180,10212],[1875,3720,5632],[3284,9400,10596]]', '2025-01-06 18:25:18'),
(38, 49, 'addition', '{\"matrixA\":[[17,65,74],[10,45,13],[45,56,47]],\"matrixB\":[[15,85,78],[34,45,98],[15,65,34]]}', '[[32,150,152],[44,90,111],[60,121,81]]', '2025-01-06 18:25:18'),
(39, 49, 'subtract', '{\"matrixA\":[[17,65,74],[10,45,13],[45,56,47]],\"matrixB\":[[15,85,78],[34,45,98],[15,65,34]]}', '[[2,-20,-4],[-24,0,-85],[30,-9,13]]', '2025-01-06 18:25:19'),
(40, 49, 'scalarMultiply', '{\"matrix\":\"A\",\"scalar\":5}', '[[85,325,370],[50,225,65],[225,280,235]]', '2025-01-06 18:25:23'),
(41, 49, 'scalarMultiply', '{\"matrix\":\"B\",\"scalar\":4}', '[[60,340,312],[136,180,392],[60,260,136]]', '2025-01-06 18:25:25');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `statut` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `prenom`, `nom`, `email`, `password`, `statut`) VALUES
(42, 'nv', 'nv', 'nv@gmail.com', '$2y$10$k5SIk1QaoOoemWbyJOniFuC4T5wgwec1eC58XfAZDOeNFBf4J.yIa', 'student'),
(43, 'Amine', 'Amllal', 'cruel6527@rustyload.com', '$2y$10$ACjFx.1HtwkZtY6l/cn7q.biYldR1IWaa4Z9HORclDlEKVOGSntHG', 'student'),
(46, 'Ouissam', 'Benalla', 'ouissambenalla@gmail.com', '$2y$10$gYSTeLFzZV6tHgsSuG4cLe4oP/PWmjiWv6cy5pYU2fLTasjrTlKDS', 'professor'),
(48, 'Ismail', 'Allouch', 'ismailallouch@gmail.com', '$2y$10$GVpuulJFDCZE9Blqxwq4a.eauqlQkXqLKN0lP7Fnd9CN7pvQdM4h6', 'professor'),
(49, 'Amine', 'Amllal', 'amineamllal@gmail.com', '$2y$10$ouhawm2UwQUo6VgSxQKKBOgZyAlMkySqM36jOLDs0DNJBZ2fomJKm', 'student');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `historique_calcul`
--
ALTER TABLE `historique_calcul`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_utilisateur` (`utilisateur_id`);

--
-- Indexes for table `historique_graph`
--
ALTER TABLE `historique_graph`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_utilisateur_id` (`utilisateur_id`);

--
-- Indexes for table `historique_matrice`
--
ALTER TABLE `historique_matrice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `utilisateur_id` (`utilisateur_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `historique_calcul`
--
ALTER TABLE `historique_calcul`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=178;

--
-- AUTO_INCREMENT for table `historique_graph`
--
ALTER TABLE `historique_graph`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `historique_matrice`
--
ALTER TABLE `historique_matrice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `historique_calcul`
--
ALTER TABLE `historique_calcul`
  ADD CONSTRAINT `FK_utilisateur` FOREIGN KEY (`utilisateur_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `historique_graph`
--
ALTER TABLE `historique_graph`
  ADD CONSTRAINT `fk_utilisateur_id` FOREIGN KEY (`utilisateur_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `historique_matrice`
--
ALTER TABLE `historique_matrice`
  ADD CONSTRAINT `historique_matrice_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
