DROP DATABASE IF EXISTS job_db;
CREATE DATABASE job_db;

USE job_db;

CREATE TABLE job_department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE job_role (
  id INT NOT NULL,
  department_id  INT,
  job_details TEXT,
  title VARCHAR(30),
  salary DECIMAL(8,2),
  FOREIGN KEY (department_id)
  REFERENCES job_department(id)
  ON DELETE SET NULL
);

CREATE TABLE job_employee (
  id INT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id  INT,
  FOREIGN KEY (role_id)
  REFERENCES job_role(id)
  manager_id  INT,
  FOREIGN KEY (manager_id)
  REFERENCES job_employee(id)
  ON DELETE SET NULL
);