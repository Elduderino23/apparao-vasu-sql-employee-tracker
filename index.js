const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTables = require('console.table')

const jobDataBaseArray = []

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

},{
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

},{
    name: "assignRole",
    message: "Which role do you want to assign this employee to?",
    type: "input",
        
    
},{
    name: "assignEmployeeManager",
    message: "Who is this employee's manager?",
    type: "input",
        
    
}]

function departmentSelect() {
    inquirer.prompt(initialPrompt).then((response) => {
        switch (response.initialQuestion) {
            case "view all department":
                departmentView()
                break;
            case "view all role":
                roleView()
                break;
            case "view all employees":
                employeeView()
                break;
            case "add a department":
                addDepartment()

                break;
            case "add a role":
                addRole()

                break;
            case "add an employee":
                addEmployee()

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

    function roleSelect() {
        inquirer.prompt(initialPrompt).then((response) => {

            }
        })

    function employeeSelect() {
        inquirer.prompt(initialPrompt).then((response) => {

            }
        })


}

function departmentView() {
    db.query('SELECT * FROM job_department', function (err, results) {
        console.table(results);

        departmentSelect()
    })
}

function roleView() {
    db.query('SELECT * FROM job_role', function (err, results) {
        console.table(results);

        departmentSelect()
        roleView()
    })
}

function employeeView() {
    db.query('SELECT * FROM job_employee', function (err, results) {
        console.table(results);

        departmentSelect()
        roleView()
        employeeSelect()
    })
}


inquirer.prompt(initialPrompt)

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

db.query('SELECT je.id, je.department_id, je.title, je.salary, job_roles.name FROM job_employee AS je JOIN job_department ON department_id = id', function (err, results) {
    console.table(results);
})