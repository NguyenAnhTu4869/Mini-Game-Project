'use strict'
module.exports = function (app) {
    let usersCtrl = require('./controllers/UserController')
    let giftsCtrl = require('./controllers/GiftController')

    // todoList Routes
    // api sign in and sign up
    app.route('/users')
        .get(usersCtrl.get)
        .post(usersCtrl.create)
    // api get user data
    app.route('/users/:userId')
        .get(usersCtrl.detail)
    // api update user times
    app.route('/users/times/:userId')
        .put(usersCtrl.updateTimes)
    // api update user score
    app.route('/users/score/:userId')
        .put(usersCtrl.updateScore)
    // api load list gift
    app.route('/gifts')
        .get(giftsCtrl.get)
    // api load list gift
    app.route('/gifts/:giftId')
        .put(giftsCtrl.update)
};