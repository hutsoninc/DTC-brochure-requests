require('dotenv').config()
const Emma = require('emma-sdk');
var request = require('request');

request = request.defaults({json: true});

var emma = new Emma({
    publicKey: process.env.EMMA_PUBLIC_KEY,
    privateKey: process.env.EMMA_PRIVATE_KEY,
    accountID: process.env.EMMA_ACCOUNT_ID
});

exports.send = function(req, res){
    // /#account_id/mailings/#mailing_id
    var config = {
        baseURL: "https://api.e2ma.net",
        publicKey: process.env.EMMA_PUBLIC_KEY,
        privateKey: process.env.EMMA_PRIVATE_KEY,
        accountID: process.env.EMMA_ACCOUNT_ID,
        mailingID: 32546143,
        //groupIDs: req.body.data.group_ids,
        //memberID: req.body.data.member_id
        memberID: 1159983455
    };

    var requestOptions = {
        //url: config.baseURL + '/' + config.accountID + '/forwards/' + config.mailingID + '/' + config.memberID,
        url: config.baseURL + '/' + config.accountID + '/mailings/' + config.mailingID,
        method: "POST",
        auth: {
            username: config.publicKey,
            password: config.privateKey,
            sendImmediately: true
        }
    };

    // filter by group ids to decide which email to send
    // 3064159 1R
    // 3065183 3E
    // 3061087 5E
    // 1025R - http://www.deere.com/en_US/docs/html/brochures/publication.html?id=7e6b8be9#1
    // 3E - http://www.deere.com/en_US/docs/html/brochures/publication.html?id=1cd311a3#1
    // 5E - http://www.deere.com/en_US/docs/html/brochures/publication.html?id=9930e238#1

    request(requestOptions, (err, res, body) => {
        console.log("err: " + err);
        console.log("res: " + JSON.stringify(res));
        console.log("body: " + JSON.stringify(body));
    });
}
