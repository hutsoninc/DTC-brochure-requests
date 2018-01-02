require('dotenv').config()
const Emma = require('emma-sdk');
const fs = require('fs');

var emma = new Emma({
    publicKey: process.env.EMMA_PUBLIC_KEY,
    privateKey: process.env.EMMA_PRIVATE_KEY,
    accountID: process.env.EMMA_ACCOUNT_ID
});

/*
emma.mailing.list({mailing_types: "t"}, (err, res) => {

    var jsonFormat = {res: res};

    fs.writeFile('mailingData.json', (JSON.stringify(jsonFormat)), (err) => {
        if (err) throw err;
        console.log('The data was written to mailingData.json.');
    });

});
*/

emma.mailing.withID(33403231).details((err, res) => {
    console.log(res);
});
