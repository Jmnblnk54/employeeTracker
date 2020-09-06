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
function start() {
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
            message: "Which would you like to add?",
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
                .then(function(answer) {
                  // when finished prompting, insert a new department into the db with that info
                  connection.query(
                    "INSERT INTO department SET ?",
                    {
                      name: answer.addDepartment,
                    },
                    function(err) {
                      if (err) throw err;
                      console.log("Your new department was created successfully!");
    
                      start();
                    }
                  );
                })
                
            }
            
            else if(answer.add === "Role") {
                return inquirer
                .prompt({
                    name: "addRole",
                    type: "input",
                    message: "Please type the new Role name."
                })
                .then(function(answer) {
                  // when finished prompting, insert a new department into the db with that info
                  connection.query(
                    "INSERT INTO department SET ?",
                    {
                      title: answer.addRole,
                    },
                    function(err) {
                      if (err) throw err;
                      console.log("Your new role was created successfully!");
    
                      start();
                    }
                  );
                })
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
        .then(function(answer){
            if(answer.view === "Department") {
                return inquirer
                .prompt({
                    name: "viewDept",
                    type: "input",
                    message: "Please type the employee to view."
                })
                viewDept();
            }
            else if(answer.view === "Role") {
                return inquirer
                .prompt({
                    name: "viewRole",
                    type: "input",
                    message: "Please type the role to view."
                })          
                viewRole();
            }
            else if(answer.view === "Employee") {
                return inquirer
                .prompt({
                    name: "viewEmployee",
                    type: "input",
                    message: "Please type the employee to view."
                }) 
                viewEmployee();
            }
        })
    }
    else if(answer.addViewUpdateEmployee === "Update employee roles?"){
        //list roles to update??
    }
});
};

// addDept
function addDept(){
  
}
// addRole
function addRole(){

}
// addEmployee
function addEmployee(){

}


function viewDept() {
    console.log("Here is the department\n");
    var query = connection.query(
      "SELECT FROM department WHERE ?",
      [
        {
          department: "viewDepartment"
        }
      ],
      function(err, res) {
        if (err) throw err;
      }
    )
};

function viewRole() {
    console.log("Here is the Role\n");
    var query = connection.query(
      "SELECT FROM role WHERE ?",
      [
        {
          role: "viewRole"
        }
      ],
      function(err, res) {
        if (err) throw err;
      }
    )
};


function viewEmployee() {
    console.log("Here is the employee\n");
    var query = connection.query(
      "SELECT FROM employee WHERE ?",
      [
        {
          employee: "viewEmployee"
        }
      ],
      function(err, res) {
        if (err) throw err;
      }
    )
};



app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
  