require('dotenv').config()
const Emma = require('emma-sdk');

var emma = new Emma({
    publicKey: process.env.EMMA_PUBLIC_KEY,
    privateKey: process.env.EMMA_PRIVATE_KEY,
    accountID: process.env.EMMA_ACCOUNT_ID
});

exports.send = function(req, res){

    var reqBody = req.body;
    var memberID = reqBody.data.member_id;
    var groupIDs = reqBody.data.group_ids;
    // filter by group ids to decide which email to send
    var mailingID = 32953695;

    // 3064159 1R
    // 3065183 3E
    // 3061087 5E
    // 1025R - http://www.deere.com/en_US/docs/html/brochures/publication.html?id=7e6b8be9#1
    // 3E - http://www.deere.com/en_US/docs/html/brochures/publication.html?id=1cd311a3#1
    // 5E - http://www.deere.com/en_US/docs/html/brochures/publication.html?id=9930e238#1


    console.log(reqBody);
    console.log("memberID " + memberID);
    console.log("groupIDs " + groupIDs);

    emma.mailing.withID(mailingID).forwardToMembers(memberID);

    res.status(200);
    res.send();
};