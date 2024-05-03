INSERT INTO department (department_name)
VALUES 
('Music Producer'),
('Artist Manager'),  
('Record Label Executive'),
('Legal');



INSERT INTO roles (title, salary, department_id)
VALUES
('Director', 750000.00, 1),
('Lead Sound', 150000.00, 1),
('Talent Scout', 220000.00, 2),
('Operations', 170000.00, 2),
('Legal Team lead', 210000.00, 3),
('Sound Engineer', 150000.00, 4),
('Lawyer', 95000.00, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Kendrick', 'Lamar', 1, 1),
('Lil', 'Wayne', 2, 1),
('Tupac', 'Shakur', 3, 2),
('Travis', 'Scott', 4, 2),
('Future', 'Nayvadius', 5, 3),
('Drake', 'Graham', 6, 3),
('Kanye', 'West', 7, 4);

