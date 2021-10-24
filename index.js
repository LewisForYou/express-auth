const express = require('express');
const db = require(`./data/db`);
const path = require(`path`);

const app = express();

const port = 3000;

const urlencodedParser = express.urlencoded({ extended: false }); //парсер поолучаемых данных

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'templates'));

app.get('/', function (request, response) {
  response.render('index', { description: '' });
});
app.post('/', urlencodedParser, function (request, response) {
  if (!request.body) return response.sendStatus(400);
  db.query(
    `SELECT * FROM users WHERE login = '${request.body.userName}' AND pass = '${request.body.userPass}'`,
    (error, res) => {
      if (error) {
        console.log(error);
      } else if (res == 0) {
        response.render('index', {
          description: 'Вы ввели неверные данные. Хотите Зарегистрироваться?',
        });
      } else if (res) {
        response.send(
          `Добро пожаловать, ${request.body.userName}. <a href="/">Выйти</a>`
        );
      }
    }
  );
});

app.get('/reg', function (request, response) {
  response.render('reg', { error: '' });
});
app.post('/reg', urlencodedParser, function (request, response) {
  if (!request.body) return response.sendStatus(400);
  if (request.body.userName > 0 && request.body.userPass > 0) {
    db.query(
      `INSERT INTO users(login, pass) VALUE(${request.body.userName}, ${request.body.userPass})`,
      (error, res) => {
        if (error) {
          console.log(error);
        } else {
          response.send(`Добро пожаловать, ${request.body.userName}`);
        }
      }
    );
  } else {
    response.render('reg', { error: 'Вы должны ввести логин/пароль' });
  }
});

app.listen(port, () => {
  console.log(`App listen at http://localhost:${port}`);
});
