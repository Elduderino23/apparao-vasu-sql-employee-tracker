const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTables = require('console.table')

const jobDataBaseArray = []

console.table("table the data") //

inquirer.prompt()

const initialPrompt = [{
    name: "initial question",
    message: "Please make a selection",
    type: "list",
    choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
    
}]

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

db.query('SELECT * FROM job_employee', function (err, results){
    console.table(results);
})
