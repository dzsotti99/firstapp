const express = require('express');
const fs = require('fs');
const app = express();
const port = 80;

app.get('/number', (req, res) => {
    const number = Math.round(Math.random() * 100);
    const directory = fs.existsSync('./logs');
    if (!directory) {
        fs.mkdirSync('./logs');
    }
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const date = new Date();
    const datetime = `${date.getDay() < 10 ? '0' + date.getDay() : date.getDay()}/${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}/${date.getFullYear()}-${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`
    fs.writeFileSync('./logs/logs.log', `GET ${req.url} ${datetime} ${ip} ${200} ${number}\n`, {
        flag: 'a+'
    });
    res.json({
        number: number
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})