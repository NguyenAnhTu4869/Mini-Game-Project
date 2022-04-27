'use strict'
const util = require('util');
const mysql = require('mysql');
const db = require('../db');

module.exports = {
    /** Sign up */
    create: (req, res) => {
        let userData = Object.keys(req.body);
        let data = JSON.parse(userData[0]);
        let userName = data.userName;
        let userEmail = data.userEmail;
        let sql = "INSERT INTO users (userName, userEmail) VALUES (?, ?)";
        db.query(sql, [userName, userEmail], (err, response) => {
            if (err) {
                switch (err.code) {
                    case "ER_DUP_ENTRY":
                        res.json({ message: 'This account have been used', code: '-1' })
                        break;
                    default:
                        break;
                }
            } else {
                res.json({ message: 'Create success!', code: '1' })
            }
        })
    },

    /** Sign in */
    get: (req, res) => {
        let data = req.query
        let userName = data.userName;
        let userEmail = data.userEmail;
        let sql = 'SELECT * FROM users WHERE userName = ? AND userEmail = ?'
        db.query(sql, [userName, userEmail], (err, response) => {
            if (err) {
                res.json({ message: 'Please check your account again', code: '-1' })
            } else {
                if (response.length > 0) {
                    let data = {
                        id: response[0].id,
                        userName: response[0].userName,
                        userEmail: response[0].userEmail,
                        userTimes: response[0].userTimes,
                        userScore: response[0].userScore
                    }
                    res.json({ message: 'Login success', code: '1', data })
                } else {
                    res.json({ message: 'Please check your account again', code: '-1' })
                }
            }
        })
    },

    /** Get user data */
    detail: (req, res) => {
        let sql = 'SELECT * FROM users WHERE id = ?'
        db.query(sql, [req.params.userId], (err, response) => {
            if (err) {
                res.json({ message: 'This account is not exist', code: '-1' })
            } else {
                if (response.length > 0) {
                    let data = {
                        id: response[0].id,
                        userName: response[0].userName,
                        userEmail: response[0].userEmail,
                        userTimes: response[0].userTimes,
                        userScore: response[0].userScore
                    }
                    res.json({ message: 'This account is exist', code: '1', data })
                }
            }
        })
    },

    /** Update user times */
    updateTimes: (req, res) => {
        let userData = Object.keys(req.body);
        let data = JSON.parse(userData[0]);
        let userTimes = data.userTimes;
        let userId = req.params.userId;
        let sql = 'UPDATE users SET userTimes = ? WHERE id = ?'
        db.query(sql, [userTimes, userId], (err, response) => {
            if (err) {
                res.json({ message: 'Warning error', code: '-1' })
            } else {
                if (response.length > 0) {
                    res.json({ message: 'Update times success', code: '1', data })
                }
            }
        })
    },

    /** Update user score */
    updateScore: (req, res) => {
        let userData = Object.keys(req.body);
        let data = JSON.parse(userData[0]);
        let userScore = data.userScore;
        let userId = req.params.userId;
        let sql = 'UPDATE users SET userScore = ? WHERE id = ?'
        db.query(sql, [userScore, userId], (err, response) => {
            if (err) {
                res.json({ message: 'Warning error', code: '-1' })
            } else {
                if (response.length > 0) {
                    res.json({ message: 'Update score success', code: '1', data })
                }
            }
        })
    },

    /** Get top user score */
    getList: (req, res) => {
        let sql = 'SELECT * FROM users WHERE id > 1 ORDER BY userScore DESC LIMIT 5;'
        db.query(sql, (err, response) => {
            if (err) {
                res.json({ message: "Can't load the list user", code: '-1' })
            } else {
                let dataUser = response;
                var x = dataUser.length;
                var data = [];
                for (var i = 0; i < x; i++) {
                    var temp = {
                        username: dataUser[i].userName,
                        userscore: dataUser[i].userScore,
                    }
                    data.push(temp)
                }
                if (response.length > 0) {
                    res.json({ message: 'Load list success', code: '1', data })
                } else {
                    res.json({ message: "Can't load the list user", code: '-1' })
                }
            }
        })
    }
}