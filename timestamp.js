'use strict';

const path = require('path');
const moment = require('moment');

const express = require('express');
const app = express();

app.use(express.static(path.resolve(__dirname, 'client')));
app.get('/:timestamp', (req,res) => {
  let time = moment(req.params.timestamp, 'MMMM DD, YYYY', true); 

  if (!time.isValid())
    time = moment.unix(req.params.timestamp);


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