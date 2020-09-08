const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Yana5624!",
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
  //Add department role or employee
    .then(function(answer) {
      if (answer.addViewUpdate === "Add a department, role or employee?") {
        inquirer
        .prompt({
          name: "add",
          type: "list",
          message: "Which would you like to add?",
          choices: [
            "Department",
            "Role",
            "Employee"
          ]
        })
      
        //add department
      .then(function(answer) {

      if (answer.add === "Department") {
        return inquirer
          .prompt({
            name: "addDepartment",
            type: "input",
            message: "Please type the new Department name."
          })
          .then(function (answer) {
            // when finished prompting, insert a new department into the db with that info
            connection.query(
              "INSERT INTO department SET ?",
              {
                name: answer.addDepartment,
              },
              function (err) {
                if (err)
                  throw err;
                console.log("Your new department was created successfully!");

                start();
              }
            );
          });
      } 
      
    
      //add role
      else if(answer.add === "Role") {
        inquirer
        .prompt({
          name: "addRole",
          type: "input",
          message: "Please type the new Role name."
        })
      // when finished prompting, insert a new department into the db with that info
      .then(function(answer){
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.addRole,
        },
        function (err) {
          if (err)
            throw err;
          console.log("Your new role was created successfully!");

          start();
        }
      )
      });
    }
    //add employee, including their department, role and salary
      else if(answer.add === "Employee") {
        connection.query("SELECT * FROM department", function(err, results) {
                if (err) throw err;
                // once you have the departments, prompt the user for which department the new employee belongs to
                inquirer
                  .prompt([
                    {
                      name: "choice",
                      type: "list",
                      choices: function() 
                      {
                        let deptArray = [];
                        for (var i = 0; i < results.length; i++) 
                        {
                          deptArray.push(results[i].item_name);
                        }
                        return deptArray;
                      },
                      message: "Which department does the new Employee belong to?",
                    }
                  ]);
                return inquirer
                .prompt(
                {
                    name: "addEmployeeFirstName",
                    type: "input",
                    message: "Please type the new Employee's first name."
                },
                {
                    name: "addEmployeeLastName",
                    type: "input",
                    message: "Please type the new Employee's last name."
                },
                )
                .then(function(answer) {
                  // when finished prompting, insert a new employee into the db with that info
                  connection.query(
                    "INSERT INTO employee SET ?",
                    {
                      first_name: answer.addEmployeeFirstName,
                      last_name: answer.addEmployeeLastName
                    },
                    "INSTERT INTO role SET ?",
                    {
                      title: answer.addEmployeeRole,
                      salary: answer.addEmployeeSalary
                    },
                    "INSERT INTO department SET ?",
                    {
                      name: answer.addEmployeeDepartment
                    },
                    function(err) {
                      if (err) throw err;
                      console.log("Your new employee was added successfully!");
    
                      start();
                    }
                  );
                });
              }
        )}  //end of add employee function
    })
    }       //end of add role, dept, emp function
    
  //view departments, roles, or employees
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
        //view department
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
            //view role
            else if(answer.view === "Role") {
                return inquirer
                .prompt({
                    name: "viewRole",
                    type: "input",
                    message: "Please type the role to view."
                })          
                viewRole();
            }
            //view employee
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
    //update employee roles
    else if(answer.addViewUpdateEmployee === "Update employee roles?")
    {
        //list roles to update??
    }

  })
}





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

  