'use strict'
module.exports = function (app) {
    let usersCtrl = require('./controllers/UserController')
    let giftsCtrl = require('./controllers/GiftController')
    let emailCtrl = require('./controllers/EmailController')

    // todoList Routes
    // api sign in and sign up
    app.route('/users')
        .get(usersCtrl.get)
        .post(usersCtrl.create)
    // api get list user
    app.route('/users/list')
        .get(usersCtrl.getList)
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
    //api send mail
    app.route('/mail')
        .post(emailCtrl.send)
};