require('dotenv').config()
const Emma = require('emma-sdk');
var fs = require('fs');

var memberData = require('../memberData.json');

var emma = new Emma({
    publicKey: process.env.EMMA_PUBLIC_KEY,
    privateKey: process.env.EMMA_PRIVATE_KEY,
    accountID: process.env.EMMA_ACCOUNT_ID
});

exports.send = function(req, res){

    var config = {
        groupIDs: req.body.data.group_ids,
        memberID: req.body.data.member_id,
        currentMemberIndex: undefined
    }

    var currentMemberData;

    // Look for member in database
    for(var i = 0; i < memberData.data.length; i++){

        var entry = memberData.data[i];

        // If member is found, store their data and index
        if(entry.id == config.memberID){
            currentMemberData = entry;
            config.currentMemberIndex = i;
            break;
        }

    }

    // If member is found, figure out which group is new and send only that email
    //  then update the groups info in the database
    if(currentMemberData){

        var currentSet = new Set(currentMemberData.groupIDs);

        // Filter out the new group ids
        var newGroups = config.groupIDs.filter((num) => {
            return !currentSet.has(num);
        })

        // Send message based on new group id
        if(newGroups){

            // Filters out undesired groups
            newGroups.forEach(el => {
    
                var mailingID = getMailingID(el);
    
                if(mailingID){
    
                    sendMessage(mailingID, currentMemberData.email);
    
                    // Add group id to local current member data
                    currentMemberData.groupIDs.push(el);
                    
                }
    
            });
        
        }

        // Update member data to be written to database
        memberData.data[config.currentMemberIndex] = currentMemberData;

        // Write updated data to json file
        writeToDB();

    // If member is not found, get their email and add info to data variable
    }else{

        // Get member data so email can be stored
        emma.member.withID(config.memberID).details((err, response) => {

            // Add new member info to local data variable
            memberData.data.push({
                id: config.memberID,
                groupIDs: config.groupIDs,
                email: response.email
            });

            // Filters out undesired groups
            config.groupIDs.forEach(el => {
    
                var mailingID = getMailingID(el);
    
                if(mailingID){

                    sendMessage(mailingID, response.email);

                }
    
            });

            // Write updated data to json file
            writeToDB();

        });

    }

    // Returns mailing ID for corresponding group
    function getMailingID(groupID){

        if(groupID == 3064159){
            return 33650015; // 1025R
        }else if(groupID == 3065183){
            return 33648991; // 3E
        }else if(groupID == 3061087){
            return 33647967; // 5E
        }else{
            return undefined;
        }

    }

    function sendMessage(mailingID, email){
        
        emma.mailing.withID(mailingID).resend({
            recipient_emails: [email]
        }, (err, res) => {
            console.log({err: err, res: res});
        });

    }

    function writeToDB(){

        // Write new data to file
        fs.writeFile('memberData.json', (JSON.stringify(memberData)), (err) => {
            if (err) throw err;
            console.log('the new data was saved');
        });

    }

    res.send();
    
}