const express = require('express');
const app = express();
const port = 5000;
const itemRouter = require('./routes/inventoryItemRoutes');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const mongoose = require('mongoose');

const username='';
const pwrd='';
const clustername='inventoryapp';

const dbURI = 'mongodb+srv://' + username + ':' + pwrd + '@inventoryapp.besii.mongodb.net/' + clustername + '?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
         console.log('Database connection successful')
       }).catch(err => {
         console.error('Database connection error')
       })

app.use(itemRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})