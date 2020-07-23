const express = require('express');
const itemRoutes = express.Router();
const mysql = require('./mysql.js');

itemRoutes.route('/:param1').get(function (req, res) {
  let location = req.query.location;
  let startTime = req.query.startTime;
  console.log(location,startTime)
  mysql.query(`select * from test.weather where location in ("${location}") and startTime >= "${startTime}"`,function(error,file){
    //console.log(file);
    if(error){
      console.log(error)
    return res.status(400).send("unable to get to database");
    }
    if(file === undefined){
    return res.status(400).send("undefined");
    }
    console.log(file)
    res.status(200).json({'weatherInfo': file});
  });
});

module.exports = itemRoutes;
