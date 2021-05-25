-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2021 at 04:31 PM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql6412967`
--

-- --------------------------------------------------------

--
-- Table structure for table `infobeans_clients`
--

CREATE TABLE `infobeans_clients` (
  `client_id` int(11) NOT NULL,
  `client_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `infobeans_clients`
--

INSERT INTO `infobeans_clients` (`client_id`, `client_name`) VALUES
(1, 'Chalhoub'),
(2, 'Automattic'),
(3, 'Survey Monkey'),
(4, 'Green Thumb Industries (Gti)'),
(5, 'Siemens'),
(6, 'Hilton Grand');

-- --------------------------------------------------------

--
-- Table structure for table `infobeans_comments`
--

CREATE TABLE `infobeans_comments` (
  `comment_id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `comment` varchar(1000) NOT NULL,
  `created_on` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `infobeans_tickets`
--

CREATE TABLE `infobeans_tickets` (
  `ticket_id` int(11) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `created_on` varchar(45) NOT NULL,
  `updated_on` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT 'Open',
  `priority` varchar(45) NOT NULL,
  `contact` varchar(15) DEFAULT NULL,
  `subject` varchar(500) NOT NULL,
  `client_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `infobeans_user_details`
--

CREATE TABLE `infobeans_user_details` (
  `emp_id` int(11) NOT NULL,
  `emp_name` varchar(45) NOT NULL,
  `emp_role` int(11) NOT NULL DEFAULT 0 COMMENT '0 is for HR, 1 for manager',
  `emp_email` varchar(200) NOT NULL,
  `emp_password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `infobeans_user_details`
--

INSERT INTO `infobeans_user_details` (`emp_id`, `emp_name`, `emp_role`, `emp_email`, `emp_password`) VALUES
(1, 'Shivraj Singh Rawat', 0, 'shivraj@infobeanns.com', '123456'),
(2, 'Aditya Jain', 1, 'aditya@infobeans.com', '123456');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `infobeans_clients`
--
ALTER TABLE `infobeans_clients`
  ADD PRIMARY KEY (`client_id`);

--
-- Indexes for table `infobeans_comments`
--
ALTER TABLE `infobeans_comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `EMPID_REL_idx` (`emp_id`),
  ADD KEY `TICKET_REL_idx` (`ticket_id`);

--
-- Indexes for table `infobeans_tickets`
--
ALTER TABLE `infobeans_tickets`
  ADD PRIMARY KEY (`ticket_id`),
  ADD UNIQUE KEY `ticket_id_UNIQUE` (`ticket_id`),
  ADD KEY `EMP_ID_REL_idx` (`emp_id`),
  ADD KEY `CLIENT_REL` (`client_id`);

--
-- Indexes for table `infobeans_user_details`
--
ALTER TABLE `infobeans_user_details`
  ADD PRIMARY KEY (`emp_id`),
  ADD UNIQUE KEY `emp_email_UNIQUE` (`emp_email`),
  ADD UNIQUE KEY `emp_id_UNIQUE` (`emp_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `infobeans_clients`
--
ALTER TABLE `infobeans_clients`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `infobeans_comments`
--
ALTER TABLE `infobeans_comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `infobeans_tickets`
--
ALTER TABLE `infobeans_tickets`
  MODIFY `ticket_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `infobeans_user_details`
--
ALTER TABLE `infobeans_user_details`
  MODIFY `emp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `infobeans_comments`
--
ALTER TABLE `infobeans_comments`
  ADD CONSTRAINT `EMPID_REL` FOREIGN KEY (`emp_id`) REFERENCES `infobeans_user_details` (`emp_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `TICKET_REL` FOREIGN KEY (`ticket_id`) REFERENCES `infobeans_tickets` (`ticket_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `infobeans_tickets`
--
ALTER TABLE `infobeans_tickets`
  ADD CONSTRAINT `CLIENT_REL` FOREIGN KEY (`client_id`) REFERENCES `infobeans_clients` (`client_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `EMP_ID_REL` FOREIGN KEY (`emp_id`) REFERENCES `infobeans_user_details` (`emp_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
