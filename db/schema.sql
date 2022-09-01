CREATE DATABASE EMPLOYEES;

CREATE TABLE department(
    id PRIMARY KEY INT
    name VARCHAR(30)
)

CREATE TABLE role(
    id PRIMARY KEY INT
    title VARCHAR(30)
    salary DECIMAL
    department_id INT
)

CREATE TABLE emplyoee(
    id PRIMARY KEY INT
    first_name VARCHAR(30)
    last_name VARCHAR(30)
    role_id INT
    manager_id INT
)