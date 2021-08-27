# STOCKBIT BACKEND NODE.JS PRACTICAL TEST

This application was made to fulfill the practical test as a **Backend Engineer - Node.JS** at **STOCKBIT**.



# INSTALLATION
- Clone the package
```bash
ubuntu@ip:~/$ git clone https://github.com/arfanseptianto/stockbit-backend-nodejs-practical-test.git FOLDER_NAME
```

- Install all dependencies
```bash
ubuntu@ip:~/$ cd FOLDER_NAME/
ubuntu@ip:~/FOLDER_NAME$ npm install
```

- Create the database
```bash
ubuntu@ip:~/FOLDER_NAME$ mysql -u root -p
mysql> CREATE DATABASE `DB_NAME` CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci';
```

- Create table **logs**
```bash
mysql> USE `DB_NAME`;
mysql> CREATE TABLE `logs`  (
    `id` int NOT NULL AUTO_INCREMENT,
    `endpoint` varchar(20) NOT NULL,
    `parameters` varchar(255) NULL,
    `response` varchar(255) NULL,
    `created_date` datetime NULL DEFAULT current_timestamp,
    PRIMARY KEY (`id`)
);
```

- Create a user for the database if needed.
```bash
mysql> CREATE USER `USERNAME`@`localhost` IDENTIFIED WITH mysql_native_password BY 'PASSWORD';
```

- Grant privileges for your selected user account to use the database
```bash
mysql> GRANT ALL ON `DB_NAME`.* TO `USERNAME`@`localhost`;
```

- Flush the privileges to refresh users privileges
```bash
mysql> FLUSH PRIVILEGES;
```

- Exit from MySQL
```bash
mysql> EXIT;
```

- Fill in the *database name*, *user*, and *password* into the *config.js* file. You may change any other option if needed.
```bash
ubuntu@ip:~/FOLDER_NAME$ vim config/config.js
```

- Start the server. You can use **npm start**
```bash
ubuntu@ip:~/FOLDER_NAME$ npm start
```
Or using <a href="https://pm2.keymetrics.io/" target="_blank">PM2</a> (recomended)
```bash
ubuntu@ip:~/FOLDER_NAME$ pm2 start ecosystem.config.js
```

- Now the API server is running and listening to the PORT configured in the *config.js* file. 

- You can use a browser or REST Client like POSTMAN to test the server. Or you can try use CURL.
```bash
ubuntu@ip:~/FOLDER_NAME$ curl "http://127.0.0.1:3030/movies/search?apikey=7be334c0&s=Batman"
```

