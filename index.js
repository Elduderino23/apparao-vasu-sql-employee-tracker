const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTables = require('console.table')


// Pulls from MySQL stuff from local server and allows the data to show as a table when running the index.js.
const db = mysql.createConnection({
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password
        password: 'liquidsnake@1',
        database: 'job_db'
    },
    console.log(`Connected to the job_db database.`)
);

console.table("table the data") //
// Initial question well as the other questions that generated in the terminal when running the index.js file
const initialPrompt = [{
    name: "initialQuestion",
    message: "Please make a selection",
    type: "list",
    choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "exit application"]

}]
const newDepartment = [{
    name: "department",
    message: "Input department name",
    type: "input",

}]
const newRole = [{
    name: "name",
    message: "Input role name.",
    type: "input",

}, {
    name: "salary",
    message: "Input salary",
    type: "input",

}, {
    name: "assignDepartment",
    message: "Which department do you want to assign this role to?",
    type: "input",

}]
const newEmployee = [{
    name: "firstName",
    message: "Input employee first name.",
    type: "input",

}, {
    name: "lastName",
    message: "Input employee last name.",
    type: "input",

}, {
    name: "assignRole",
    message: "Which role do you want to assign this employee to? Numbers only",
    type: "input",


}, {
    name: "assignEmployeeManager",
    message: "Who is this employee's manager? Numbers only",
    type: "input",


}]
const clearRole = [{
    name: "first_name",
    message: "Input employee first name.",
    type: "input",

}, {
    name: "last_name",
    message: "Input employee last name.",
    type: "input",

}, {
    name: "role_id",
    message: "Which role do you want to assign this employee to? Numbers only",
    type: "input",

}]

// Switch case that allows cycling questions to happen.
function start() {
    inquirer.prompt(initialPrompt).then((response) => {
        switch (response.initialQuestion) {
            case "view all departments":
                departmentView()
                break;
            case "view all roles":
                roleView()
                break;
            case "view all employees":
                employeeView()
                break;
            case "add a department":
                addDepartment()

                break;
            case "add a role":
                roleSelect()

                break;
            case "add an employee":
                employeeSelect()

                break;

            case "update an employee role":
                updateRole()

                break;

            case "exit application":
                exitApp()

                break;
            default:

                return;
        }
    })
}

// Inserts information generated from user input and put it into the table roles
function roleSelect() {
    inquirer.prompt(newRole).then((response) => {
        db.query('INSERT INTO job_role (title, salary, job_details, department_id) VALUES (?,?,?,(SELECT id FROM job_department WHERE name = ?))', [response.name, response.salary, response.job_details, response.assignDepartment], function (err, results) {
            if (err) {
                console.log(err)
            }
            console.table(results);
            start()

        })
    })
}

// Inserts information generated from user input and put it into the table employee
function employeeSelect() {
    inquirer.prompt(newEmployee).then((response) => {
            db.query(`INSERT INTO job_employee (first_name, last_name, role_id, manager_id) VALUES ("${response.firstName}","${response.lastName}","${response.assignRole}", "${response.assignEmployeeManager}")`, function (err, results) {
                if (err) {
                    console.log(err)
                }
                console.table(results);
                start()
            })
        }

    )
}
// Inserts information generated from user input and put it into the table department
function addDepartment() {
    inquirer.prompt(newDepartment).then((response) => {
        db.query('INSERT INTO job_department (name) VALUES (?)', [response.department], function (err, results) {
            if (err) {
                console.log(err)
            }
            console.table(results);
            start()
        })
    })
}

// Shows department table in the terminal
function departmentView() {
    db.query('SELECT * FROM job_department', function (err, results) {
        console.table(results);
        start()
    })
}

// Shows role table in the terminal
function roleView() {
    db.query('SELECT job_role.id, job_role.title, job_role.salary, job_role.department_id, job_department.name FROM job_department JOIN job_role ON job_department.id = job_role.department_id ORDER BY job_role.id', function (err, results) {
        console.log()
        console.table(results);
        start()
    })
}

// Shows employee table in the terminal
function employeeView() {
    db.query('SELECT job_employee.id, job_employee.first_name, job_employee.last_name, job_role.id, job_role.title AS description, job_employee.manager_id, job_role.salary, manager.first_name AS manager_name FROM job_employee JOIN job_role ON job_employee.role_id = job_role.id LEFT JOIN job_employee manager ON manager.id = job_employee.manager_id ORDER BY job_employee.manager_id', function (err, results) {
        console.table(results);
        start()
    })
}

// Updates information generated from user input and put it into the table employee
function updateRole() {
    inquirer.prompt(clearRole).then(response => {
        console.log(response.role_id)
        console.log(response.first_name)
        console.log(response.last_name)
        db.query("UPDATE job_employee SET role_id = ? WHERE first_name = ? AND last_name = ?",[response.role_id, response.first_name, response.last_name], function (err, results) {
            console.table(results);
            start()
        })
    })


}

// exits application
function exitApp() {
    process.exit()

}

// initiates the questions
start()
