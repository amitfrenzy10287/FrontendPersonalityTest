# Frontend Personality Test
Personality Test App

How to use the downloaded files

# For frontend client side

1) Run "npm install" in the extracted folder
2) Run "npm start" to view the project
3) If backedn server is running on host other than 9000 then edit the axios-test.js and change this line:

baseURL: 'http://localhost:9000/api'
to 
baseURL: 'http://localhost:[ host in which backend server is running for eg: http://localhost:8080/api]/api' etc..


======================================================================================== 

#For backend server
1) Create a database named personality_test in MySql
2) Import MySql file personality_test.sql to database
3) Run Mysql server so that Api should have access to Database tables 
4) Default configuration for database connectivity is written in Model/Questionnaire.js File
5) Change the database configuration for eg:

// Configure database connection here
const db = mysql.createConnection({
	host: "localhost", // change hostname of MySQL server here
	user: "root", // change username of MySQL server here
	password: "", // change password of MySQL server here
	database: "personality_test", // change database name of MySQL server here if required
});

1) Run "npm install" in the extracted folder
2) Run "nodemon" to run the api on server host 9000
