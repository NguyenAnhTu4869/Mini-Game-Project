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