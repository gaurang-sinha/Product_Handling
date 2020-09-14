const express = require('express');
const app = express();
const user = require('./controller/user');
const db = require('./config/dbConnection'); 
app.use(express.json());


let connection = db.createMySqlConnection();
app.get('/list', user.listing);
app.set('db', connection);

// connection.query('SELECT * FROM user_detail', function (error, results, fields) {
//     if (error)
//         throw error;

//     results.forEach(result => {
//         console.log(result);
//     });
// });

app.listen(3000,() => console.log("Server running on port 3000"));

module.exports = {connection, app}



