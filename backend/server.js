const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const itemRoutes = require('./router/item_routes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://andreipagalilauan69:July1302281@restapi.f1rafvu.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log('Error connecting to MongoDB', err);
});

app.use('/items', itemRoutes);

app.listen(3000, () => {
  console.log('Server started');
});
