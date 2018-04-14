var schemas = require("../middleware/schemas");
var  DB_Controller = require("../controllers/DB_Controller")
var bodyParser = require('body-parser');
var urlencoded = bodyParser.urlencoded({extended:false});
var Announcement = require("../models/Announcement.js");
const dateformat = require("node.date-time");



/**
 * Creates and saves the Announcement Object in the database
 * @param {*} theAuthor 
 * @param {*} theTitle 
 * @param {*} theContent
 * @returns -2, if something wrong happened when trying to access or read from the db 
 * @returns announcementID
 */
module.exports.saveAnnouncement = async function saveAnnouncement(theAuthor, theTitle, theContent, callback) {

    let timeStamp = new Date().format("Y-MM-dd HH:mm:SS");
    var theAnnouncement = new Announcement(theAuthor, theTitle, theContent, timeStamp);
    theAnnouncement.save(function(err,result){

        if(err){
            console.log(err)
        }
        callback(err, result)
    })
}


/**
 * Get the Latest Announcements Objects from the database
 * @returns the JSON Object containing the list of the announcements objects
 * @returns -2, if something wrong happened when trying to access or read from the db
 * @returns 0, if there are not announcements
 */
module.exports.getLatestAnnouncements = async function getLatestAnnouncements(callback) {

    Announcement.getLatestAnnouncements(function(err, result){

        /**
         * If error has happened during the retrieval of the latestAnnouncements 
         */
        if(err)
        {
            console.log(err)
            callback(err, result)
        }else
        
        {

            var announcementsData = result

            /**
             * Create JSON object containing the list of announcements objects
            */
            var announcementDataJSON = {announcementData : []}

            for (var i=0; i<announcementsData.length; i++){

                var announcement = new Announcement(announcementsData[i].author, 
                    announcementsData[i].title,announcementsData[i].content,
                    announcementsData[i].postedAt)
                
                announcementDataJSON.announcementData.push({
                    "announcementObj":announcement
                })
            }

            callback(err, announcementDataJSON) 
        }
    });
}


          
      var postedAt = new Date()
     console.log(postedAt)


    