const express = require('express');
const fs = require('fs');
const app = express();
const port = 80;

app.use(express.json())

app.get('/number', (req, res) => {
    const value = Math.random();
    const status = value > 0.1 ? 200 : 400;
    const number = Math.round(Math.random() * 100);
    const directory = fs.existsSync('./logs');
    if (!directory) {
        fs.mkdirSync('./logs');
    }
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const date = new Date();
    const datetime = `${date.getDay() < 10 ? '0' + date.getDay() : date.getDay()}/${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}/${date.getFullYear()}-${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`
    fs.writeFileSync('./logs/logs.log', `GET ${req.url} ${datetime} ${ip} ${status} ${number}\n`, {
        flag: 'a+'
    });
    res.status(status).json({
        number: number
    });
})

app.post('/number', (req, res) => {
    const value = Math.random();
    const status = value > 0.15 ? 200 : 400;
    const directory = fs.existsSync('./logs');
    console.log(req.body);
    if (!directory) {
        fs.mkdirSync('./logs');
    }
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const date = new Date();
    const datetime = `${date.getDay() < 10 ? '0' + date.getDay() : date.getDay()}/${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}/${date.getFullYear()}-${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`
    fs.writeFileSync('./logs/logs.log', `POST ${req.url} ${datetime} ${ip} ${status} ${req?.body?.number ? req?.body?.number : 0}\n`, {
        flag: 'a+'
    });
    res.status(status).json({
        number: req?.body?.number ? req?.body?.number : 0
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})