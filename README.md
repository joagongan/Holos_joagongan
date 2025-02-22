## Requisitos

To launch this repository you will first need this software:

- Java 23
- MariaDB 11.4
- HeidiSQL (optional)

## Instalación

### 1. Clone the repo

```sh
git clone https://github.com/tu-usuario/holos.git
cd holos
```

### 2. Configure Database

Open mysql command line:

```sh
mysql -u root -p
```

if it shows an error check if MariaDB bin folder is added to the PATH:
C:\Program Files\MariaDB 11.4\bin

Create the database and user

```SQL
CREATE DATABASE holos_db;
CREATE USER 'H0l0s_DB'@'localhost' IDENTIFIED BY 'H0l0s1$PP';
GRANT ALL PRIVILEGES ON holos_db.* TO 'H0l0s_DB'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Run the app

Install the java extension package for VS Code, it will make everything easier

Go to the HolosApplication.java and press the run button over 'public static void'

## 3.1. Check database is connected (optional)

To check if the database and the backend are connected use HeidiSQL, create a new connection with the application.properties user and password and see how the user table has appeared inside de holos_db database 