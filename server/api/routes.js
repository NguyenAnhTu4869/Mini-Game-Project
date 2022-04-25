'use strict'
module.exports = function (app) {
    let usersCtrl = require('./controllers/UserController')

    // todoList Routes
    app.route('/users')
        .get(usersCtrl.get)
        .post(usersCtrl.create)

    app.route('/users/:userId')
        .get(usersCtrl.detail)
        .put(usersCtrl.updateScore)
        .put(usersCtrl.updateTimes)
};