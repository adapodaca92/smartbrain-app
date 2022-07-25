const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const PORT = process.env.PORT || 3000;

const { handleRegister } = require('./controllers/register');
const { handleSignIn } = require('./controllers/signin');
const { handleImage, handleApiCall } = require('./controllers/image');
const { handleProfileGet } = require('./controllers/profile');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5433,
    user: 'postgres',
    password: 'admin',
    database: 'smart-brain',
  },
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('IT WORKS!');
});
app.post('/signin', (req, res) => handleSignIn(req, res, db, bcrypt));
app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => handleProfileGet(req, res, db));
app.put('/image', (req, res) => handleImage(req, res, db));
app.post('/imageurl', (req, res) => handleApiCall(req, res));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
