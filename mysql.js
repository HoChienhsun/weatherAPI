const util = require('util')
const config = require('config');
const mysql = require('mysql');
const sqlconfig = config.get('rdsconnection');
const test = config.get('test')


var connection = mysql.createConnection({
    host: sqlconfig.get('host'),
    port: sqlconfig.get('port'),
    user: sqlconfig.get('user'),
    database:'test',
    password: sqlconfig.get('password'),
    insecureAuth : sqlconfig.get('insecureAuth')
});

connection.connect(function(err) {
  if (err) {
    console.trace('fatal error: ' + err.message);
    return 
  }
 // if (err) return err;
  console.log("MySQL is connected with oddityDB !");
});
connection.query = util.promisify(connection.query);

module.exports = connection;


