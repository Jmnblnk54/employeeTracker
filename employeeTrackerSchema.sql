DROP DATABASE IF EXSISTS employeeTracker_DB;
CREATE DATABASE employeeTracker_DB;

USE employeeTracker_DB;

CREATE TABLE department(
    id INT NOT NULL AUTO INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT NOT NULL AUTO INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT(10),
    PRIMARY KEY (id)
);

CREATE TABLE employee(
    id INT NOT NULL AUTO INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT(10),
    manager_id INT(10),
    PRIMARY KEY (id)
);