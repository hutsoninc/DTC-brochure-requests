require('dotenv').config()
const Emma = require('emma-sdk');

var emma = new Emma({
    publicKey: process.env.EMMA_PUBLIC_KEY,
    privateKey: process.env.EMMA_PRIVATE_KEY,
    accountID: process.env.EMMA_ACCOUNT_ID
});

var webhookURL = process.env.HOST + "/content-request";

emma.webhook.create({
    event: "member_add", 
    url: webhookURL
}, (err, res) => console.log(res));
