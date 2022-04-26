'use strict'
const util = require('util');
const mysql = require('mysql');
const db = require('../db');

module.exports = {
    /** Get list gift */
    get: (req, res) => {
        let sql = 'SELECT * FROM gifts'
        db.query(sql, (err, response) => {
            if (err) {
                res.json({ message: "Can't load the list of gift", code: '-1' })
            } else {
                let dataGift = response;
                var x = dataGift.length;
                var data = [];
                for (var i = 0; i < x; i++) {
                    var temp = {
                        id: dataGift[i].id,
                        name: dataGift[i].name,
                        amount: dataGift[i].amount,
                        point: dataGift[i].point,
                    }
                    data.push(temp)
                }
                if (response.length > 0) {
                    res.json({ message: 'Load list success', code: '1', data })
                } else {
                    res.json({ message: "Can't load the list of gift", code: '-1' })
                }
            }
        })
    },

    update: (req, res) => {
        let data = 0
        if (Object.keys(req.body).length === 0) {
            data = 0;
        } else {
            let userData = Object.keys(req.body);
            data = JSON.parse(userData[0]);
        }
        let giftId = req.params.giftId;
        let sql = 'UPDATE gifts SET amount = ? WHERE id = ?'
        db.query(sql, [data, giftId], (err, response) => {
            if (err) {
                res.json({ message: 'Warning error', code: '-1' })
            } else {
                if (response.length > 0) {
                    res.json({ message: 'Update amount success', code: '1', data })
                }
            }
        })
    },
}