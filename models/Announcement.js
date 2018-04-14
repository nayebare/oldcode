"use strict"
var  DB_Controller = require("../controllers/DB_Controller.js");

class Announcement
{

    constructor(author, title, content, postedAt)
    {
        this.author = author
        this.title = title
        this.content = content
        this.postedAt = postedAt;
    }



    getAuthor()
    {
        return this.author;
    }

    setAuthor(theAuthor)
    {
        this.author = theAuthor
    }


    getTitle()
    {
        return this.title;
    }

    setTitle(theTitle)
    {
        this.title = theTitle
    }


    getContent()
    {
        return this.content;
    }

    setContent(theContent)
    {
        this.content = theContent;
    }


    getpostedAt()
    {
        return this.postedAt;
    }


    getPostedAt(timeStamp)
    {
        this.postedAt = timeStamp;
    }



    toString()
    {
        return `${this.author}, ${this.title}, ${this.content}, ${this.postedAt}`;
    }


    /**
     * Saves the current announcement object in the db
     * @returns -2, if something wrong happened when trying to read or access from the db 
     */

    save(callback)
    {
         DB_Controller.saveAnnouncement(this, function(err, result){
            callback(err, result)
        });
    }

}

module.exports = Announcement;

/**
* Get the Latest Announcements Objects from the database
* @returns the JSON Object containing the list of the announcements objects
* @returns -2, if something wrong happened when trying to access or read from the db
* @returns 0, if there are not announcements
*/

module.exports.getLatestAnnouncements = async function getLatestAnnouncements(callback)
{

    DB_Controller.getRecentAnnouncementDatetime(function(err, recentDateTimeString){
        
        /**
         * If errors occured during the retrieval of the recent announcement datetime
         */
        if(err)
        {
            console.log(err)
            callback(err,recentDateTime)

        }else{

            var recentDateTime
            var limitDateTime
         
            if(recentDateTimeString == 0){
                   recentDateTime = new Date()
                   limitDateTime = new Date()
                   limitDateTime.setHours(limitDateTime.getHours()-24)
            }else{
         
                   recentDateTime = new Date(recentDateTimeString)
                   limitDateTime = new Date(recentDateTimeString)
                   limitDateTime.setHours(limitDateTime.getHours()-24)
            } 

            DB_Controller.getLatestAnnouncements(recentDateTime.format("Y-MM-dd HH:mm:SS"), 
                limitDateTime.format("Y-MM-dd HH:mm:SS"), function(err_, latestAnnouncements){

                    callback(err_, latestAnnouncements)
                });
        }
    })


}
