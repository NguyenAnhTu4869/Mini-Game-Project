/* CREATE DATABASE mini_game;  */

CREATE TABLE `users` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`userName` varchar(255) DEFAULT NULL UNIQUE,
	`userEmail` varchar(255) DEFAULT NULL UNIQUE,
	`userTimes` int(11) DEFAULT 10,
	`userScore` int(11) DEFAULT 0,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

INSERT INTO `users` VALUES ('1', 'admin', 'finalprojectmanagement@gmail.com', '30', '99999999');
INSERT INTO `users` VALUES ('2', 'anhtu', 'tunagcs18435@fpt.edu.vn', '10', '0');

CREATE TABLE `gifts` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) DEFAULT NULL,
	`amount` int(11) DEFAULT NULL,
	`point` int(11) DEFAULT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

INSERT INTO `gifts` VALUES ('1', 'Add 1 times', NULL, '10');
INSERT INTO `gifts` VALUES ('2', 'Add 11 times', NULL, '100');
INSERT INTO `gifts` VALUES ('3', 'Voucher 5$', '50', '200');
INSERT INTO `gifts` VALUES ('4', 'Voucher 10$', '20', '500');
INSERT INTO `gifts` VALUES ('5', 'Voucher 50$', '10', '1000');
INSERT INTO `gifts` VALUES ('6', 'Airpods Max 2022 ', '5', '3000');
INSERT INTO `gifts` VALUES ('7', 'Iphone 13 Pro Max', '1', '10000');