const express = require('express');
const router = express.Router();

const config = require('config');
const random = require('random');

var mysql = require('mysql');


/**
 *  Main Library
 */
// const { TestData } = require('../Models/data');


const con = mysql.createConnection({
    host: config.get('HOST'),
    user: config.get('USER'),
    password: config.get('PASSWORD'),
    database: config.get('DATABASE')
});
con.connect(function (err) {
    if (err) throw err;
    console.log('Connected');
});

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

router.get('/view', async (req, res) => {
    console.log('en view');
    con.query("SELECT * FROM dataTest", function (err, result, fields) {
        if (err) throw err;
        var total = [];
        for (var i = 0; i < result.length; i++) {
            var test = Object.entries(result[i]);
            total.push(test);
        }
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.send(total);
    });
});

router.get('/view2', async (req, res) => {
    console.log('en view');
    con.query("SELECT * FROM dataTest", function (err, result, fields) {
        if (err) throw err;
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(result);
    });
});

router.post('/add', (req, res) => {
    console.log('add');
    var num = random.int(min = 0, max = 100);
    var name = makeid(7);
    var sql = "INSERT INTO dataTest (num, name) VALUES ('" + num + "', '" + name + "')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Element created");
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(result);
    });
});
module.exports = router;
