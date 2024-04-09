const inquirer = require("inquirer");
const mysql = require("mysql2");
const cfonts = require('cfonts');

// MySql connectin 
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Hello2024",
    database: "employee_Tracker_db",
});

// connect to the database
connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to Employee Database!");
    
    start();
});

// CFONT application 
cfonts.say('Employee Tracker', {
	font: 'block',              
	align: 'center',          
	colors: ['blue'],        
	background: 'transparent',  
	letterSpacing: 1,           
	lineHeight: 1,             
	space: true,               
	maxLength: '0',             
	gradient: false,           
	independentGradient: false, 
	transitionGradient: false,  
	env: 'node'                
});
// SQL Employee App
function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all roles",
                "View all departments",
                "View Employees by Manager",
                "View Employees by Department",
                "Add a Manager",
                "Add an employee",
                "Add a role",
                "Add a department",
                "Update an employee role",
                "View the total utilized budget of a department",
                "Delete Departments | Roles | Employees",
                "Exit",
            ],
        // Adjust the "pageSize" setting to control the maximum number of visible choices, effectively preventing endless scrolling.

            pageSize: 14,  
        })
        .then((answer) => {
            switch (answer.action) {
                case "View all employees":
                    viewAllEmployees();
                    break;
                case "View all roles":
                    viewAllRoles();
                    break;
                case "View all departments":
                    viewAllDepartments();
                    break;
                case "View Employees by Manager":
                    viewEmployeesByManager();
                    break;
                case "View Employees by Department":
                    viewEmployeesByDepartment();
                    break;
                case "Add a Manager":
                    addManager();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add a department":
                    addDepartment();
                    break;
                case "Update an employee role":
                    updateEmployeeRole();
                    break;
                case "View the total utilized budget of a department":
                    viewTotalUtilizedBudgetOfDepartment();
                    break;
                case "Delete Departments | Roles | Employees":
                    deleteDepartmentsRolesEmployees();
                    break;
                case "Exit":
                    connection.end();
                    console.log("");
                    break;
            }
        });
}
// View all employees
function viewAllEmployees() {
    const query = `
    SELECT e.id, e.first_name, e.last_name, r.title, d.department_name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
    FROM employee e
    LEFT JOIN roles r ON e.role_id = r.id
    LEFT JOIN department d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id;
    `;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        // restart app
        start();
    });
}
// View all Roles
function viewAllRoles() {
    const query = "SELECT roles.title, roles.id, department.department_name, roles.salary from roles join department on roles.department_id = department.id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        // restart app
        start();
    });
}
// View all departments 
function viewAllDepartments() {
    const query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        // restart app
        start();
    });
}
// View employee by manger 
function viewEmployeesByManager() {
    const query = `
    SELECT 
        e.id, 
        e.first_name, 
        e.last_name, 
        r.title, 
        d.department_name, 
        CONCAT(m.first_name, ' ', m.last_name) AS manager_name
    FROM 
        employee e
        INNER JOIN roles r ON e.role_id = r.id
        INNER JOIN departments d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id
    ORDER BY 
        manager_name, 
        e.last_name, 
        e.first_name
    `;

    connection.query(query, (err, res) => {
        if (err) throw err;

        // group employees by manager
        const employeesByManager = res.reduce((acc, cur) => {
            const managerName = cur.manager_name;
            if (acc[managerName]) {
                acc[managerName].push(cur);
            } else {
                acc[managerName] = [cur];
            }
            return acc;
        }, {});
        // employees by manger display 
        console.log("Employees by manager:");
        for (const managerName in employeesByManager) {
            console.log(`\n${managerName}:`);
            const employees = employeesByManager[managerName];
            employees.forEach((employee) => {
                console.log(
                    `  ${employee.first_name} ${employee.last_name} | ${employee.title} | ${employee.department_name}`
                );
            });
        }

        // restart the application
        start();
    });
}
// View employee by departments 
function viewEmployeesByDepartment() {
    const query =
        "SELECT departments.department_name, employee.first_name, employee.last_name FROM employee INNER JOIN roles ON employee.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id ORDER BY departments.department_name ASC";

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("\nEmployees by department:");
        console.table(res);
        // restart the application
        start();
    });
}
// 
function addManager() {
    const queryDepartments = "SELECT * FROM department";
    const queryEmployees = "SELECT * FROM employee";

    // get the list of departments and employees
    connection.query(queryDepartments, (err, resDepartments) => {
        if (err) throw err;
        connection.query(queryEmployees, (err, resEmployees) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "department",
                        message: "Select the department:",
                        choices: resDepartments.map(
                            (department) => department.department_name
                        ),
                    },
                    {
                        type: "list",
                        name: "employee",
                        message: "Select the employee to add a manager to:",
                        choices: resEmployees.map(
                            (employee) =>
                                `${employee.first_name} ${employee.last_name}`
                        ),
                    },
                    {
                        type: "list",
                        name: "manager",
                        message: "Select the employee's manager:",
                        choices: resEmployees.map(
                            (employee) =>
                                `${employee.first_name} ${employee.last_name}`
                        ),
                    },
                ])
                .then((answers) => {
                    const department = resDepartments.find(
                        (department) =>
                            department.department_name === answers.department
                    );
                    const employee = resEmployees.find(
                        (employee) =>
                            `${employee.first_name} ${employee.last_name}` ===
                            answers.employee
                    );
                    const manager = resEmployees.find(
                        (employee) =>
                            `${employee.first_name} ${employee.last_name}` ===
                            answers.manager
                    );
                    const query =
                        "UPDATE employee SET manager_id = ? WHERE id = ? AND role_id IN (SELECT id FROM roles WHERE department_id = ?)";
                    connection.query(
                        query,
                        [manager.id, employee.id, department.id],
                        (err, res) => {
                            if (err) throw err;
                            console.log(
                                `Added manager ${manager.first_name} ${manager.last_name} to employee ${employee.first_name} ${employee.last_name} in department ${department.department_name}!`
                            );
                            // restart app
                            start();
                        }
                    );
                });
        });
    });
}