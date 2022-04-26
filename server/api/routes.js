'use strict'
module.exports = function (app) {
    let usersCtrl = require('./controllers/UserController')

    // todoList Routes
    // api sign in and sign up
    app.route('/users')
        .get(usersCtrl.get)
        .post(usersCtrl.create)
    // api get user data
    app.route('/users/:userId')
        .get(usersCtrl.detail)
    // api update user score
    app.route('/users/score/:userId')
        .put(usersCtrl.updateScore)
    // api update user times
    app.route('/users/times/:userId')
        .put(usersCtrl.updateTimes)
};