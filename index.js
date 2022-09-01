const inquirer = require("inquirer")
const mysql2 = require("mysql2")
const consoleTable = require("console.table")
require("dotenv").config()

var connection = mysql2.createConnection(
    {
        host: 'localhost',
        user: 'root',
        database: 'EMPLOYEES',
        password: process.env.pw
    }
)
connection.connect(
    function(
        ERR, data
    ){
        if (ERR) console.log(ERR)
    }
)
function mainMenu(){
    inquirer.prompt(
        {
            type: "list",
            message: "What does the user want to do",
            name: "want",
            choices: [
                "View All Employees" , 
                "Add Employees" ,
                "Update Employee Role" ,
                "View All Roles" ,
                "Add Role" ,
                "View All Departments" ,
                "Add Departments"
            ]
        }
    ).then((answers) => {
        console.log(answers)
        if(answers.want == "View All Departments"){
            viewAllDepartments()
        }else if(answers.want == "View All Employees"){
            viewAllEmployees()
        }else if(answers.want == "View All Roles"){
            viewAllRoles()
        }else if(answers.want == "Add Departments"){
            addDepartment()
        }
    })
}

function viewAllRoles(){
    connection.query(
        "SELECT * FROM role",
        function(err, results, fields) {
            console.table(results)
            mainMenu()
        }
    )
}

function viewAllEmployees(){
    connection.query(
        "SELECT * FROM employee",
        function(err, results, fields) {
            console.table(results)
            mainMenu()
        }
    )
}

function viewAllDepartments(){
    connection.query(
        "SELECT * FROM department",
        function(err, results, fields) {
            console.table(results)
            mainMenu()
        }
    )
}

function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            message:"What is the department id?",
            name: "id"
        },

        {
            type: "input",
            message:"What is the department name?",
            name: "name"
        }
    ]
    ).then((answers) => {
        connection.query(
            "INSERT INTO department (id, name) VALUES (?,?);",
            [answers.id, answers.name],
            function(err, results, fields) {
                console.log("Department Added Successfully")
                mainMenu()
            }
        )
    })
}

mainMenu()