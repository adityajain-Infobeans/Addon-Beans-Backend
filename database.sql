-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 26, 2021 at 10:59 AM
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
  `comment_by` varchar(200) NOT NULL,
  `comment` varchar(1000) NOT NULL,
  `created_on` varchar(45) NOT NULL,
  `updated_on` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `infobeans_employee_details`
--

CREATE TABLE `infobeans_employee_details` (
  `emp_id` int(11) NOT NULL,
  `emp_name` varchar(45) NOT NULL,
  `is_hr` int(11) NOT NULL DEFAULT 0 COMMENT '1 is for HR, 0 for manager',
  `emp_email` varchar(200) NOT NULL,
  `emp_password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `infobeans_employee_details`
--

INSERT INTO `infobeans_employee_details` (`emp_id`, `emp_name`, `is_hr`, `emp_email`, `emp_password`) VALUES
(1, 'Shivraj Singh Rawat', 1, 'shivraj@infobeans.com', '123456'),
(2, 'Aditya Jain', 0, 'aditya@infobeans.com', '123456'),
(3, 'Vikas Jangid', 0, 'vikas@infobeans.com', '123456'),
(4, 'Anajli Goyal', 0, 'anajli@infobeans.com', '123456'),
(5, 'Geetanjali Katare', 0, 'geetanjali@infobeans.com', '123456'),
(6, 'Aayush Sharma', 0, 'aayush@infobeans.com', '123456'),
(7, 'Ayushi Jain', 0, 'ayushi@infobeans.com', '123456'),
(8, 'Abhishek Patel', 0, 'abhishek.p@infobeans.com', '123456'),
(9, 'Abhishek Vishwakarma', 0, 'abhishek.v@infobeans.com', '123456'),
(10, 'Faizee Bano', 0, 'faizee.bano@infobeans.com', '123456'),
(11, 'Madhav Singh', 0, 'madhav@infobeans.com', '123456');

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
  `description` varchar(60000) NOT NULL,
  `priority` varchar(45) NOT NULL,
  `contact` varchar(15) DEFAULT NULL,
  `subject` varchar(500) NOT NULL,
  `client_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Indexes for table `infobeans_employee_details`
--
ALTER TABLE `infobeans_employee_details`
  ADD PRIMARY KEY (`emp_id`),
  ADD UNIQUE KEY `emp_email_UNIQUE` (`emp_email`),
  ADD UNIQUE KEY `emp_id_UNIQUE` (`emp_id`);

--
-- Indexes for table `infobeans_tickets`
--
ALTER TABLE `infobeans_tickets`
  ADD PRIMARY KEY (`ticket_id`),
  ADD UNIQUE KEY `ticket_id_UNIQUE` (`ticket_id`),
  ADD KEY `EMP_ID_REL_idx` (`emp_id`),
  ADD KEY `CLIENT_REL` (`client_id`);

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
-- AUTO_INCREMENT for table `infobeans_employee_details`
--
ALTER TABLE `infobeans_employee_details`
  MODIFY `emp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `infobeans_tickets`
--
ALTER TABLE `infobeans_tickets`
  MODIFY `ticket_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `infobeans_comments`
--
ALTER TABLE `infobeans_comments`
  ADD CONSTRAINT `EMPID_REL` FOREIGN KEY (`emp_id`) REFERENCES `infobeans_employee_details` (`emp_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `TICKET_REL` FOREIGN KEY (`ticket_id`) REFERENCES `infobeans_tickets` (`ticket_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `infobeans_tickets`
--
ALTER TABLE `infobeans_tickets`
  ADD CONSTRAINT `CLIENT_REL` FOREIGN KEY (`client_id`) REFERENCES `infobeans_clients` (`client_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `EMP_ID_REL` FOREIGN KEY (`emp_id`) REFERENCES `infobeans_employee_details` (`emp_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
