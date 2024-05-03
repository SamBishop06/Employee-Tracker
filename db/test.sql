-- test the database and see if it is working properly.
-- Purpose: To test the database and see if it is working properly.

-- Install dependencies ("npm i" on command line while in root directory.)
-- Navigate to db folder, run mySQL (mysql -u root -p), enter password. 
-- In your command line type "source schema.sql", "source seeds.sql", "source test.sql".
-- You should see all the data from the databases in your command line. 
select * from department; 
select * from roles; 
select * from employee;