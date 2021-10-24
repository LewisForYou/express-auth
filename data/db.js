const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'students_mtuci',
});

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    return console.log(`[MySQL] База данных успешно подключена!`);
  }
});

module.exports = connection;
