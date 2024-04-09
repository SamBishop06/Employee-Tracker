INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Kendrick', 'Lamar', 1, 1),
('Lil', 'Wayne', 2, 2),
('Tupac', 'Shakur', 3, 3),
('Travis', 'Scott', 4, 4),
('Future', 'Nayvadius', 5, 5),
('Drake', 'Graham', 6, 6),
('Kanye', 'West', 7, 7);

INSERT INTO roles (title, salary, department_id)
VALUES
('Music Producer', 750000.00, 1),
('Artist Manager', 150000.00, 2),
('Talent Scout', 220000.00, 3),
('Record Label Executive', 170000.00, 4),
('Lead Guitarist', 210000.00, 5),
('Sound Engineer', 150000.00, 6),
('Publicist', 95000.00, 7);

INSERT INTO departments (department_name)
VALUES 
('Music Producer'),
('Artist Manager'),
('Talent Scout'),
('Record Label Executive'),
('Lead Guitarist'),
('Sound Engineer'),
('Publicist');