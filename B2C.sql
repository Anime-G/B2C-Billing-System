-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 16, 2024 at 01:33 PM
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
-- Database: `B2C`
--

-- --------------------------------------------------------

--
-- Table structure for table `Forms`
--

CREATE TABLE `Forms` (
  `id` int(11) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `shortName` varchar(250) DEFAULT NULL,
  `formGst` varchar(15) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  `phno` bigint(10) DEFAULT NULL,
  `logo` varchar(1000) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Forms`
--

INSERT INTO `Forms` (`id`, `name`, `shortName`, `formGst`, `address`, `phno`, `logo`, `createdAt`, `updatedAt`, `UserId`) VALUES
(1, 'spider corporation', 'SC', '67MNDOE1203R3ZT', '9/67 STREET 8,NEW CITY ,NEW YORK ,UNITED STATES', 3456789010, 'https://i.pinimg.com/736x/e8/5d/6d/e85d6d00d589ad361387d07170908ba4.jpg', '2024-02-16 05:56:57', '2024-02-16 05:56:57', 7),
(2, 'formula 2', 'F2', '78PQRST3456D2ZE', '8/567,SARDAR MARKET ,SURAT   ,GUJARAT   ,INDIA', 1234563210, 'https://i.pinimg.com/736x/83/29/bf/8329bf432a74b5fe4fbb1f1021c7ce0c.jpg', '2024-02-16 06:13:47', '2024-02-16 10:31:42', 7);

-- --------------------------------------------------------

--
-- Table structure for table `Goods`
--

CREATE TABLE `Goods` (
  `id` int(11) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `HsnCode` int(11) DEFAULT NULL,
  `GstRate` double DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `FormId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `emailid` varchar(250) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `name`, `password`, `emailid`, `createdAt`, `updatedAt`) VALUES
(4, 'sagar', '$2a$10$8FUMCKOCfJaDFWQM5qO1meZSUBXeC6h/k05CTvmmBLVR3ybCX4I7y', 'sagar@gamil.com', '2024-02-14 12:08:06', '2024-02-14 12:08:06'),
(5, 'aniket', '$2a$10$igd5St6bXreH6bqtU6JnM.akgJUT0PdrgU5pnlu/tdyknFkMdVV8G', 'a@g.co', '2024-02-14 12:09:04', '2024-02-14 12:09:04'),
(6, 'sagar123', '$2a$10$SJI8cxsaYHzjwGAywskIY.SSO3KXcJMiZrTa76bCP4./N7XtGgzmy', 'sagar@gmail.com', '2024-02-14 12:09:52', '2024-02-14 12:09:52'),
(7, 'bill gates', '$2a$10$bY7IsB4Is6iZ75XtFI9Nt.xW9P.2bWc0BRl38wAVP.70YQrwDIeMy', 'bill@gmail.com', '2024-02-15 05:20:42', '2024-02-15 05:20:42'),
(8, 'mukesh ambani', '$2a$10$M3/OI0YTmPFrt8II.xBa9ecPFn8slYE4BkrYk1BALIfwBg0qTTLXK', 'mukesh@gmail.com', '2024-02-15 05:21:25', '2024-02-15 05:21:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Forms`
--
ALTER TABLE `Forms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `formGst` (`formGst`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `Goods`
--
ALTER TABLE `Goods`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FormId` (`FormId`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `emailid` (`emailid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Forms`
--
ALTER TABLE `Forms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Goods`
--
ALTER TABLE `Goods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Forms`
--
ALTER TABLE `Forms`
  ADD CONSTRAINT `Forms_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Goods`
--
ALTER TABLE `Goods`
  ADD CONSTRAINT `Goods_ibfk_1` FOREIGN KEY (`FormId`) REFERENCES `Forms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
