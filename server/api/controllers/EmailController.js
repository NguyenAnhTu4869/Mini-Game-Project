//import nodemailer
const nodemailer = require("nodemailer");

const util = require('util');
const mysql = require('mysql');
const db = require('../db');

module.exports = {
    /** send mail */
    send: (req, res) => {
        let userData = Object.keys(req.body);
        let data = JSON.parse(userData[0]);
        let userEmail = data.userEmail;
        let giftName = data.giftName;

        // set account send mail
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'finalprojectmanagement@gmail.com', // mail user
                pass: 'admin@1234', // mail password
            },
        });

        // set mail content
        let info = transporter.sendMail({
            from: '"Mini Game App" <finalprojectmanagement@gmail.com>', // sender address
            to: userEmail, // list of receivers
            subject: "Confirmation of successful gift exchange", // Subject line
            text: "You recieved message from Mini Game App", // plain text body
            html: "<p>You have successfully exchange " + giftName + ".</p><p>Thank you for playing my game.</p>", // html body
        });

        // function send mail
        transporter.sendMail(info, function (err, response) {
            if (err) {
                console.log(err);
                res.redirect('/mail');
            } else {
                console.log('Message sent: ' + info.response);
                res.redirect('/mail');
            }
        })
    },
}