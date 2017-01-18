-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 18, 2017 at 06:01 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `mobiradeon`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE IF NOT EXISTS `chat` (
  `Chat_ID` int(255) NOT NULL AUTO_INCREMENT,
  `Chat_Sender` int(255) NOT NULL,
  `Chat_Receiver` int(255) NOT NULL,
  `Chat_MSG` varchar(255) NOT NULL,
  `Chat_Time` timestamp NOT NULL,
  PRIMARY KEY (`Chat_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=100029 ;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`Chat_ID`, `Chat_Sender`, `Chat_Receiver`, `Chat_MSG`, `Chat_Time`) VALUES
(100008, 1001, 1002, 'Mushi2?', '2016-01-26 08:33:08'),
(100009, 1002, 1001, 'Ape mushi2?', '2016-01-26 08:33:28'),
(100010, 1001, 1002, 'Sun is shining', '2016-01-26 08:33:57'),
(100011, 1001, 1002, 'run them redlights', '2016-01-26 02:19:52'),
(100012, 1002, 1001, 'You suk dick la macha', '2016-01-26 02:22:44'),
(100013, 1003, 1001, 'aaaaaa', '2016-01-28 08:08:53'),
(100014, 1003, 1001, 'kau dah kenapa', '2016-01-28 08:32:11'),
(100015, 1001, 1003, 'kau ah kenapa sial!', '2016-01-28 08:32:21'),
(100016, 1003, 1001, 'burger satu', '2016-01-28 11:17:17'),
(100017, 1001, 1003, 'wtf burger?', '2016-01-28 11:17:25'),
(100018, 1003, 1001, 'mushi2', '2016-01-28 11:17:54'),
(100019, 1003, 1001, 'chat sikit!', '2016-01-28 12:08:48'),
(100020, 1001, 1003, 'mental ke bro?', '2016-01-28 12:09:04'),
(100021, 1003, 1001, 'hi admin', '2016-01-28 12:09:09'),
(100022, 1001, 1003, 'Bonjour', '2016-02-10 05:00:55'),
(100023, 1001, 1003, 'i mean hi', '2016-02-10 05:05:17'),
(100024, 1001, 1003, 'What can i help you with today?', '2016-02-10 05:22:58'),
(100025, 1003, 1001, 'can i haz a cheeseburger?', '2016-02-10 05:34:54'),
(100026, 1003, 1002, 'Buat ape tu', '2016-02-12 06:53:45'),
(100027, 1002, 1003, 'Buat bodo', '2016-02-12 06:54:55'),
(100028, 1001, 1003, 'no cheese burger for you fool!', '2017-01-18 09:56:57');

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE IF NOT EXISTS `ticket` (
  `TIC_ID` int(255) NOT NULL AUTO_INCREMENT,
  `TIC_Status` varchar(255) NOT NULL,
  `TIC_Date` timestamp NOT NULL,
  `TIC_Subject` varchar(255) NOT NULL,
  `TIC_Body` varchar(255) NOT NULL,
  `User_ID` int(255) NOT NULL,
  `Admin_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`TIC_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1022 ;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`TIC_ID`, `TIC_Status`, `TIC_Date`, `TIC_Subject`, `TIC_Body`, `User_ID`, `Admin_ID`) VALUES
(1018, 'PENDING', '2016-02-12 06:38:37', 'Problem', 'So many problem to tell', 1003, 1001),
(1019, 'PENDING', '2016-02-12 06:41:00', 'more problems', 'more problems brah', 1003, 1001),
(1020, 'NEW', '2016-02-12 06:41:45', 'Yolo', 'yolo here', 1005, NULL),
(1021, 'SOLVED', '2017-01-18 09:41:41', 'System BSOD', 'hi im having problem with the installation of the software, i kept getting the  Windows infamous  "Blue screen of death" whenever i tried to install the software that your company provided', 1003, 1001);

-- --------------------------------------------------------

--
-- Table structure for table `ticket_reply`
--

CREATE TABLE IF NOT EXISTS `ticket_reply` (
  `TReply_ID` int(255) NOT NULL AUTO_INCREMENT,
  `TIC_ID` int(255) NOT NULL,
  `TReply_Date` timestamp NOT NULL,
  `TReply_Message` varchar(255) NOT NULL,
  `TReply_Sender` int(11) NOT NULL,
  PRIMARY KEY (`TReply_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1076 ;

--
-- Dumping data for table `ticket_reply`
--

INSERT INTO `ticket_reply` (`TReply_ID`, `TIC_ID`, `TReply_Date`, `TReply_Message`, `TReply_Sender`) VALUES
(1061, 1017, '2016-01-28 12:07:54', 'Kau ah sakit masalah betul dia ni', 1003),
(1062, 1015, '2016-02-10 04:15:52', 'YOlo?', 1001),
(1063, 1015, '2016-02-10 04:16:02', 'yolo malo?', 1001),
(1064, 1015, '2016-02-10 05:22:23', 'Mushi', 1001),
(1065, 1015, '2016-02-12 06:32:51', 'Okey la camtu', 1003),
(1066, 1015, '2016-02-12 06:34:18', 'Sure?', 1001),
(1067, 1018, '2016-02-12 06:38:56', 'You good brah?', 1003),
(1068, 1018, '2016-02-12 06:39:42', 'You got problems?', 1001),
(1069, 1018, '2016-02-12 06:40:00', 'Yes my problem is i cant sent stuff', 1003),
(1070, 1019, '2016-02-12 06:41:11', 'more problem here', 1003),
(1071, 1020, '2016-02-12 06:42:04', 'new york city?', 1005),
(1072, 1019, '2016-02-12 06:43:15', 'alright whats the problem?', 1001),
(1073, 1021, '2017-01-18 09:44:19', 'Is there a probability that your software have virus in it???', 1003),
(1075, 1021, '2017-01-18 09:56:05', 'Hi\nwe are 100% sure that our software is clean', 1001);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `User_ID` int(255) NOT NULL AUTO_INCREMENT,
  `User_Name` varchar(255) NOT NULL,
  `User_Pass` varchar(255) NOT NULL,
  `User_Nick` varchar(255) NOT NULL,
  `User_Access` varchar(255) NOT NULL,
  `User_Status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`User_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1010 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`User_ID`, `User_Name`, `User_Pass`, `User_Nick`, `User_Access`, `User_Status`) VALUES
(1001, 'Ariff', '12345', 'Andrew', 'ADMIN', 'AVAILABLE'),
(1002, 'Fatin', '1234qwer', 'Fatini', 'ADMIN', 'Available'),
(1003, 'Zulox', '12345', 'KyloV', 'USER', 'masaka'),
(1005, 'Fosnivel', '1234qwer', 'Fosnivel', 'USER', 'I am New'),
(1009, 'shingen', '123456', 'shingen', 'USER', 'yolo');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
