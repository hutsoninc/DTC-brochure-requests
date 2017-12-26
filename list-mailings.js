require('dotenv').config()
const Emma = require('emma-sdk');

var emma = new Emma({
    publicKey: process.env.EMMA_PUBLIC_KEY,
    privateKey: process.env.EMMA_PRIVATE_KEY,
    accountID: process.env.EMMA_ACCOUNT_ID
});
/*
emma.mailing.list({mailing_types: "m", mailing_statuses: "c"}, (err,res) => 
    console.log(res)
);
*/
emma.mailing.withID(33359199).details((err, res) =>
    console.log(res)
);
