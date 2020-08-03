const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employeeTracker_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

//add, view or update 
inquirer.prompt([
    {
    type: "list",
    message: "What would you like to do?",
    name: "addViewUpdate",
    choices: [
            "Add a department, role or employee?",
            "View departments, roles or employees?",
            "Update employee roles?"
            ]
    }
])
.then(function(answer) {
    if (answer.addViewUpdateEmployee === "Add a department, role or employee?") {
        return inquirer
        .prompt({
            name: "add",
            type: "list",
            message: "Which would you like to update?",
            choices: 
            [
            "Department",
            "Role",
            "Employee"
            ]
        })
        .then(function(answer){
            if (answer.add === "Department"){
                return inquirer
                .prompt({
                    name: "addDepartment",
                    type: "input",
                    message: "Please type the new Department name."
                })
                addDept();
            }
            else if(answer.add === "Role") {
                return inquirer
                .prompt({
                    name: "addRole",
                    type: "input",
                    message: "Please type the new Role name."
                })
                addRole();
            }
            else if(answer.add === "Employee") {
                return inquirer
                .prompt({
                    name: "addEmployee",
                    type: "input",
                    message: "Please type the new Employee name."
                })
                addEmployee();
            }
        })
    }
    else if(answer.addViewUpdateEmployee === "View departments, roles or employees?") {
        return inquirer
        .prompt({
            name: "view",
            type: "list",
            message: "Which would you like to view?",
            choices:
            [
            "Department",
            "Role",
            "Employee"
            ]
        })
        .then(function(anser){
            if(answer.view === "Department") {
                viewDept();
            }
            else if(answer.view === "Role") {
                viewRole();
            }
            else if(answer.view === "Employee") {
                viewEmployee();
            }
        })
    }
    else if(answer.addViewUpdateEmployee === "Update employee roles?"){
        //list roles to update??
    }
});



app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
  