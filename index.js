const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTables = require('console.table')

const jobDataBaseArray = []

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
    message: "Which role do you want to assign this employee to?",
    type: "input",


}, {
    name: "assignEmployeeManager",
    message: "Who is this employee's manager?",
    type: "input",


}]

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
                addDetail()

                break;

            case "exit application":
                exitApp()

                break;
            default:

                return;
        }
    })
}

function roleSelect() {
    inquirer.prompt(newRole).then((response) => {
        db.query('INSERT INTO job_role (title, salary, job_details, department_id) VALUES (?,?,?,?)', [response.name, response.salary, response.job_details, response.assignDepartment], function (err, results) {
            if (err) {
                console.log(err)
            }
            console.table(results);
            start()

        })
})}


function employeeSelect() {
    inquirer.prompt(newEmployee).then((response) => {
        db.query('INSERT INTO job_employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', [response.first_name, response.last_name, response.role_id, response.manager_id], function (err, results) {
            if (err) {
                console.log(err)
            }
            console.table(results);
            start()
        }
        )
    }

    )
}

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

function departmentView() {
    db.query('SELECT * FROM job_department', function (err, results) {
        console.table(results);
        start()
    })
}

function roleView() {
    db.query('SELECT job_role.id, job_role.title, job_role.salary, job_role.job_details, job_department.name FROM job_role JOIN job_department ON job_role.department_id = job_department.id ORDER BY job_role.role_id', function (err, results) {
        console.table(results);
        start()
    })
}

function employeeView() {
    db.query('SELECT job_employee.id, job_employee.first_name, job_employee.last_name, job_employee.role_id, job_employee.manager_id, job_role.salary FROM job_employee JOIN job_role ON job_employee.role_id = job_employee.id ORDER BY job_employee.role_id', function (err, results) {
        console.table(results);
        start()
    })
}


// const db = mysql.createConnection({
//         host: 'localhost',
//         // MySQL username,
//         user: 'root',
//         // TODO: Add MySQL password
//         password: 'liquidsnake@1',
//         database: 'job_db'
//     },
//     console.log(`Connected to the job_db database.`)
// );

// db.query('SELECT je.id, je.department_id, je.title, je.salary, job_roles.name FROM job_employee AS je JOIN job_department ON department_id = id', function (err, results) {
//     console.table(results);
// })

start()
