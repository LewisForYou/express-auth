const db = require(`./db`);

db.query('CREATE DATABASE IF NOT EXISTS students_mtuci', (error, res) => {
  if (error) {
    console.log(error);
  } else {
    db.query(
      'CREATE TABLE IF NOT EXISTS Users (ID int NOT NULL AUTO_INCREMENT, login VARCHAR(255), pass VARCHAR (255), time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (ID))',
      (error, results) => {
        if (error) {
          console.log(error);
        }
      }
    );
  }
});
