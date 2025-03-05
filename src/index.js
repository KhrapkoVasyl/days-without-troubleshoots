const express = require('express');
const path = require('path');
const cron = require('node-cron');
const moment = require('moment-timezone');
const app = express();

let counter = 0;
let lastUpdateDay = moment.tz('Europe/Kiev').format('YYYY-MM-DD');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/get-counter', (req, res) => {
  res.json({ counter });
});

app.post('/reset-counter', (req, res) => {
  counter = 0;
  res.json({ success: true, counter });
});

app.post('/increment-counter', (req, res) => {
  counter++;
  console.log(`Counter incremented manually. Current value: ${counter}`);
  res.json({ success: true, counter });
});

cron.schedule('* * * * *', () => {
  const kyivTime = moment.tz('Europe/Kiev');
  const currentDay = kyivTime.format('YYYY-MM-DD');

  // if (currentDay !== lastUpdateDay) {
  counter++;
  // lastUpdateDay = currentDay;
  console.log(`Counter incremented in CRON job. Current value: ${counter}`);
  // }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
