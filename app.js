const mongoose = require('mongoose');

const express = require('express');

const { login, createUser } = require('./controllers/users');

const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('Connected mongoose'))
  .catch((err) => console.log(`Troubles, mongoose: ${err}`));

app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => res.status(404).send({ message: 'NOT_FOUND' }));

app.listen(PORT, () => {
  console.log('Server started on port 3000');
});
