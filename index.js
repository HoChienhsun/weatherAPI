const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const weatherRoute = require('./weather.route');
const cors = require('cors');
const basicAuth= require('./module/auth/basicAuth.js');
const errorHandler = require('./module/auth/errHandler.js');
const authController = require('./module/auth/authController');

app.use(cors());
app.use(basicAuth);
app.use('/users', authController);
app.use(errorHandler);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/weather', weatherRoute);


app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});