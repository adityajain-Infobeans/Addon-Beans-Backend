-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 22, 2021 at 02:19 PM
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
  `client_id` int(3) NOT NULL,
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
  `comment_id` int(4) NOT NULL,
  `requirement_id` int(3) NOT NULL,
  `emp_id` int(2) NOT NULL,
  `comment_by` varchar(50) NOT NULL,
  `comment` varchar(500) NOT NULL,
  `created_on` varchar(45) NOT NULL,
  `updated_on` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `infobeans_employee_details`
--

CREATE TABLE `infobeans_employee_details` (
  `emp_id` int(2) NOT NULL,
  `emp_name` varchar(50) NOT NULL,
  `is_active` int(1) NOT NULL DEFAULT 1,
  `is_hr` int(1) NOT NULL DEFAULT 0,
  `emp_email` varchar(50) NOT NULL,
  `emp_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `infobeans_employee_details`
--

INSERT INTO `infobeans_employee_details` (`emp_id`, `emp_name`, `is_active`, `is_hr`, `emp_email`, `emp_password`) VALUES
(1, 'Shivraj Singh Rawat', 1, 1, 'shivraj@infobeans.com', '$2b$10$OwHZbXnPqe50qAEv/BNabu.RrIZ1ioDSxqGNFfBzkUfF38FoHsuT6'),
(2, 'Aditya Jain', 1, 0, 'aditya@infobeans.com', '$2b$10$OwHZbXnPqe50qAEv/BNabu.RrIZ1ioDSxqGNFfBzkUfF38FoHsuT6'),
(3, 'Vikas Jangid', 1, 0, 'vikas@infobeans.com', '$2b$10$OwHZbXnPqe50qAEv/BNabu.RrIZ1ioDSxqGNFfBzkUfF38FoHsuT6'),
(4, 'Anajli Goyal', 1, 0, 'anajli@infobeans.com', '$2b$10$OwHZbXnPqe50qAEv/BNabu.RrIZ1ioDSxqGNFfBzkUfF38FoHsuT6'),
(5, 'Geetanjali Katare', 1, 0, 'geetanjali@infobeans.com', '$2b$10$OwHZbXnPqe50qAEv/BNabu.RrIZ1ioDSxqGNFfBzkUfF38FoHsuT6'),
(6, 'Aayush Sharma', 1, 0, 'aayush@infobeans.com', '$2b$10$OwHZbXnPqe50qAEv/BNabu.RrIZ1ioDSxqGNFfBzkUfF38FoHsuT6'),
(7, 'Ayushi Jain', 1, 0, 'ayushi@infobeans.com', '$2b$10$OwHZbXnPqe50qAEv/BNabu.RrIZ1ioDSxqGNFfBzkUfF38FoHsuT6'),
(8, 'Abhishek Patel', 1, 0, 'abhishek.p@infobeans.com', '$2b$10$OwHZbXnPqe50qAEv/BNabu.RrIZ1ioDSxqGNFfBzkUfF38FoHsuT6'),
(9, 'Abhishek Vishwakarma', 1, 0, 'abhishek.v@infobeans.com', '$2b$10$OwHZbXnPqe50qAEv/BNabu.RrIZ1ioDSxqGNFfBzkUfF38FoHsuT6'),
(10, 'Faizee Bano', 1, 0, 'faizee.bano@infobeans.com', '$2b$10$OwHZbXnPqe50qAEv/BNabu.RrIZ1ioDSxqGNFfBzkUfF38FoHsuT6'),
(11, 'Madhav Singh', 1, 0, 'madhav@infobeans.com', '$2b$10$OwHZbXnPqe50qAEv/BNabu.RrIZ1ioDSxqGNFfBzkUfF38FoHsuT6');

-- --------------------------------------------------------

--
-- Table structure for table `infobeans_requirements`
--

CREATE TABLE `infobeans_requirements` (
  `requirement_id` int(3) NOT NULL,
  `emp_id` int(2) NOT NULL,
  `created_on` varchar(45) NOT NULL,
  `updated_on` varchar(45) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 1,
  `additional_note` varchar(600) DEFAULT NULL,
  `timeline` int(1) NOT NULL,
  `number_of_position` int(2) NOT NULL,
  `skill_set` varchar(300) NOT NULL,
  `experience` int(2) NOT NULL,
  `client_id` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `infobeans_requirements`
--

INSERT INTO `infobeans_requirements` (`requirement_id`, `emp_id`, `created_on`, `updated_on`, `status`, `additional_note`, `timeline`, `number_of_position`, `skill_set`, `experience`, `client_id`) VALUES
(1, 2, '22-06-2021 by Aditya Jain', '22-06-2021 by Aditya Jain', 1, NULL, 2, 3, '[8,6]', 1, 2),
(2, 3, '22-06-2021 by Vikas Jangid', '22-06-2021 by Vikas Jangid', 1, NULL, 4, 2, '[5]', 3, 5),
(3, 4, '22-06-2021 by Anajli Goyal', '22-06-2021 by Anajli Goyal', 1, NULL, 6, 3, '[6]', 10, 3),
(4, 5, '22-06-2021 by Geetanjali Katare', '22-06-2021 by Geetanjali Katare', 1, NULL, 1, 2, '[11]', 4, 1),
(5, 6, '22-06-2021 by Aayush Sharma', '22-06-2021 by Aayush Sharma', 1, NULL, 2, 19, '[11]', 1, 2),
(6, 7, '22-06-2021 by Ayushi Jain', '22-06-2021 by Ayushi Jain', 1, NULL, 7, 2, '[12]', 2, 4),
(7, 8, '22-06-2021 by Abhishek Patel', '22-06-2021 by Abhishek Patel', 1, NULL, 4, 12, '[10,5]', 1, 6),
(8, 8, '22-06-2021 by Abhishek Patel', '22-06-2021 by Shivraj Singh Rawat', 2, NULL, 2, 10, '[4,9]', 2, 5),
(9, 9, '22-06-2021 by Abhishek Vishwakarma', '22-06-2021 by Abhishek Vishwakarma', 1, NULL, 1, 2, '[3,8]', 2, 3),
(10, 10, '22-06-2021 by Faizee Bano', '22-06-2021 by Faizee Bano', 1, NULL, 5, 3, '[2,9]', 5, 5),
(11, 11, '22-06-2021 by Madhav Singh', '22-06-2021 by Madhav Singh', 1, NULL, 6, 12, '[12]', 2, 4),
(12, 2, '22-06-2021 by Aditya Jain', '22-06-2021 by Aditya Jain', 1, NULL, 1, 2, '[9,5]', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `infobeans_skill_sets`
--

CREATE TABLE `infobeans_skill_sets` (
  `skill_id` int(2) NOT NULL,
  `skill_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `infobeans_skill_sets`
--

INSERT INTO `infobeans_skill_sets` (`skill_id`, `skill_name`) VALUES
(10, 'Angular'),
(12, 'Drupal'),
(4, 'Go'),
(1, 'Java'),
(6, 'NodeJs'),
(7, 'Perl'),
(5, 'PHP'),
(2, 'Python 2'),
(3, 'Python 3'),
(8, 'React'),
(9, 'Vue'),
(11, 'Wordpress');

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
  ADD KEY `TICKET_REL_idx` (`requirement_id`);

--
-- Indexes for table `infobeans_employee_details`
--
ALTER TABLE `infobeans_employee_details`
  ADD PRIMARY KEY (`emp_id`),
  ADD UNIQUE KEY `emp_email_UNIQUE` (`emp_email`),
  ADD UNIQUE KEY `emp_id_UNIQUE` (`emp_id`);

--
-- Indexes for table `infobeans_requirements`
--
ALTER TABLE `infobeans_requirements`
  ADD PRIMARY KEY (`requirement_id`),
  ADD UNIQUE KEY `ticket_id_UNIQUE` (`requirement_id`),
  ADD KEY `EMP_ID_REL_idx` (`emp_id`),
  ADD KEY `CLIENT_REL` (`client_id`);

--
-- Indexes for table `infobeans_skill_sets`
--
ALTER TABLE `infobeans_skill_sets`
  ADD PRIMARY KEY (`skill_id`),
  ADD UNIQUE KEY `skill_name` (`skill_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `infobeans_clients`
--
ALTER TABLE `infobeans_clients`
  MODIFY `client_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `infobeans_comments`
--
ALTER TABLE `infobeans_comments`
  MODIFY `comment_id` int(4) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `infobeans_employee_details`
--
ALTER TABLE `infobeans_employee_details`
  MODIFY `emp_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `infobeans_requirements`
--
ALTER TABLE `infobeans_requirements`
  MODIFY `requirement_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `infobeans_skill_sets`
--
ALTER TABLE `infobeans_skill_sets`
  MODIFY `skill_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `infobeans_comments`
--
ALTER TABLE `infobeans_comments`
  ADD CONSTRAINT `EMPID_REL` FOREIGN KEY (`emp_id`) REFERENCES `infobeans_employee_details` (`emp_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `TICKET_REL` FOREIGN KEY (`requirement_id`) REFERENCES `infobeans_requirements` (`requirement_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `infobeans_requirements`
--
ALTER TABLE `infobeans_requirements`
  ADD CONSTRAINT `CLIENT_REL` FOREIGN KEY (`client_id`) REFERENCES `infobeans_clients` (`client_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `EMP_ID_REL` FOREIGN KEY (`emp_id`) REFERENCES `infobeans_employee_details` (`emp_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
