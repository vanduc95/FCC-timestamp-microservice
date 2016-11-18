'use strict';

const path = require('path');
const moment = require('moment');

const express = require('express');
const app = express();

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('/:timestamp', (req,res) => {
  var time;
  if(/^\d{8,}$/.test(req.params.datestring)) {
    time = moment(req.params.datestring, "X");
  } else {
    time = moment(req.params.datestring, "MMMM D, YYYY");
  }
  
  if (!time.isValid()) {
    res.json({
      'unix': null,
      'natural': null
    });
  }
  else {
    res.json({
      'unix': time.format('X'),
      'natural': time.format('MMMM DD, YYYY')
    });
  }
});

app.listen(process.env.PORT || 8080)