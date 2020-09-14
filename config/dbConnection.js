const mysql = require('mysql');
var connection;
function createMySqlConnection(){
    var mysql      = require('mysql');
    connection = mysql.createConnection({
    host     : '127.0.0.1',
    database : 'escape_solutions',
    user     : 'root',
    password : 'password',
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});

return connection;
}

module.exports = {createMySqlConnection};