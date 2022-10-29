INSERT INTO job_department (job_department)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO job_role (title, salary, job_details, department_id)
VALUES ("CFO", 700000.00, "Head Sales Chief Guy", 1),
       ("CTO", 700000.00, "Head Engineer Guy", 2),
       ("CEO", 6000000.00, "Main Guy", 3),
       ("CLO", 700000.00, "Head Legal Guy", 4),
       ("Sales Manager", 600000.00, "Assistant To CFO", 1),
       ("Technical Engineer", 600000.00, "Assistant To CTO", 2),
       ("Financial Manager", 600000.00, "Assistant To CEO", 3),
       ("Head Lawyer", 600000.00, "Assistant To CLO", 4),
       ("Salesman", 70000.00, "Employee in Sales", 1),
       ("Engineer", 70000.00, "Employee of Engineering", 2),
       ("Financial Officer", 70000.00, "Employee of Finance", 3),
       ("Lawyer", 70000.00, "Employee of Lawyer", 4);

INSERT INTO job_employee (first_name, last_name, role_id, manager_id)
VALUES ("Dominic", "Conrad", 3, NULL),
       ("Kyle", "Vance", 2, 1),
       ("Mason", "Davis", 4, 1),
       ("Jonathan", "Moreno", 1, 1),
       ("Teda", "Cheng", 8, 3),
       ("Kendrick", "Brown", 7, 4),
       ("Carlos", "Martinez", 6, 2),
       ("Angel", "Matias", 5, 1),
       ("Michael", "Seaman", 9, 6),
       ("Ying", "Ying", 10, 7),
       ("Rebecca", "Overton", 11, 8),
       ("Vasu", "Apparao", 12, 5);


