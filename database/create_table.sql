CREATE TABLE `logs`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `endpoint` varchar(20) NOT NULL,
  `parameters` varchar(255) NULL,
  `response` varchar(255) NULL,
  `created_date` datetime NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`)
);