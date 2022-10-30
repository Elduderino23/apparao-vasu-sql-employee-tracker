const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTables = require('console.table')

const jobDataBaseArray = []

console.table("table the data") //

const initialPrompt = [{
    name: "initial question",
    message: "Please make a selection",
    type: "list",
    choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
    
}]

function departmentSelect(){
    inquirer.prompt(initialPrompt).then((response) =>{
        switch (nextRole) {
            case "job_department":
                departmentView()
                break;
}})

function roleSelect(){
    inquirer.prompt(initialPrompt).then((response) =>{
        switch (nextRole) {
            case "job_role":
                roleView()
                break;
}})

function employeeSelect(){
    inquirer.prompt(initialPrompt).then((response) =>{
        switch (nextRole) {
            case "job_employee":
                employeeView()
                break;
}})


}

function departmentView(){
    db.query('SELECT * FROM job_department', function (err, results){
        console.table(results);
    })
}
function roleView(){
    db.query('SELECT * FROM job_role', function (err, results){
        console.table(results);
    })
}
function employeeView(){
    db.query('SELECT * FROM job_employee', function (err, results){
        console.table(results);
    })
}




inquirer.prompt(initialPrompt )

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password
      password: 'liquidsnake@1',
      database: 'job_db'
    },
    console.log(`Connected to the job_db database.`)
  );

db.query('SELECT je.id, je.department_id, je.title, je.salary, job_roles.name FROM job_employee AS je JOIN job_department ON department_id = id', function (err, results){
    console.table(results);
})