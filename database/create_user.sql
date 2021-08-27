CREATE USER `user`@`localhost` IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL ON `db_test_stockbit`.* TO `user`@`localhost`;