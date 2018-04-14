/*
               

                *Authors


                1. Gilbert N. Adding Join Communty related methods
                2.
                3.

                *Main Purpose:This file is to hold all mongodb queries based on required schema

*/


/*
              Required files
              1. Schemas:Containing collection/tables definition for for all use cases
              2.

*/

var mongoSchemas = require("../middleware/schemas.js");

/*
     Schema and model for message,statuscrumb,announcement and user tables
*/

var  userSchema=mongoSchemas.User;
var  messageSchema=mongoSchemas.Message;
var  announcementSchema=mongoSchemas.Announcement;
var  statusSchema=mongoSchemas.StatusCrumb;


/*

                            Method name:registerNewUser
                            Purpose:function helping user to login.
                            Parameters:{user:user definition data, callback: a function to hold the returned output}
                            Return:{err: error value if not executed succesfully or result: containing data for the newly created user}
  
 */

module.exports.registerNewUser = async function regsterNewUser(user,callback){
        var userModel=new userSchema(user);
        userModel.save(function(err,result){
                if (err){
                              console.log('Fail to insert new user....!'+err);//
                              //return  false;
                              callback(err,result);
                }else{
                              console.log('DB controller initiate the schemas to insert a user.....');
                                //return  true;
                              callback(err,result);
                } 

        });
           
}

/*
                            Method name:getUserList
                            Purpose:getting a list of all registered users
                            Parameters:
                            Return:                 

*/
module.exports.getUserList = async function getUserList(callback){
        
      userSchema.model('User').find(function(err,result){
          if(err){
                    console.log("errorr"+err);//
                    callback(err,result);
          }else{
                    console.log("List of found users");//
                    callback(err,result);
          }
                
      });

}


/**
                            Method name:isUserExists
                            Purpose:Checking if the incoming user is already registered or not
                            Parameters:
                            Return:

 */

module.exports.isUserExists = async function isUserExists(theUsername,callback) {
   
    userSchema.findOne({ username: theUsername.username }, function (err, user) {
            if (err) {
                        callback(err,users);
            }else if(user){
                        callback(err,users);
            }else{
                        callback(err,users);
            }       
     });
}

  /* 
                            Method name:userLogin
                            Purpose:Verifying all user credential for authentication
                            Parameters:
                            Return:

  */

module.exports.userLogin = async function userLogin(logUser,callback) {

   var logResult={};
   logResult.message="";logResult.status=false;logResult.err="";logResult.exist=false,logResult.code=-1,logResult.created=false,logResult.username="",logResult.password="";
   logResult.username=logUser.username;
   logResult.password=logUser.password;
   userSchema.findOne({username:logUser.username}, function (err,user) {
        if (err) {
    
   
                     logResult.status=false;
                     logResult.message="Error: checking username of the existing user";
                     logResult.err=err;
                     console.log(logResult.message);
                     callback(logResult);
        }else{
                  if (user){
                                logResult.exist=true;
                                if (logUser.password== user.password) {
                                            logResult.status=true;
                                            logResult.message="the user credential match";
                                             console.log(logResult.message);
                                            logResult.code=200;
                                            callback(logResult);
                                 }else{
                                             /* The password doesn't exist*/
                                           
                                             logResult.status=false;
                                             logResult.message="The username or passowrd does not match";
                                              console.log(logResult.message);
                                             logResult.code=400;
                                              callback(logResult);
                                  }
                  }else{
                                 /* The user does not exist*/
                                 
                                             logResult.status=false;
                                             logResult.message="The user does not exist";
                                              console.log(logResult.message);
                                             
                                             callback(logResult);
                    }
        }
  });
}

/*
                            Method name:getUserSortedList
                            Purpose:
                            Parameters:
                            Return:
*/
module.exports.getUserSortedList = async function getUserSortedList(callback){

       userSchema.find({}).sort({onlineStatus:-1,username:1}).exec(function(err, docs){ 
           callback(err,docs);

       });
}

           /* 

                            Method name:updateOnlineStatusForLogin
                            Purpose:
                            Parameters:
                            Return:


           */

module.exports.updateOnlineStatusForLogin = async function updateOnlineStatusForLogin(theUsername,callback) {
            userModel.update({username:theUsername}, { $set: { onlineStatus: 'Y' }}, options, function(err,numAffected){
                  callback(err);
            });
}

/*
                            Method name:verifyUserOnline
                            Purpose:
                            Parameters:
                            Return:
                            

 */

module.exports.verifyUserOnline = async function verifyUserOnline(theUsername,callback) {

        userModel.findOne({username:theUsername,onlineStatus:'Y'}, function(err, data) {
                callback(err,data);
        });
}
    
  /*
                            Method name:AssignUserSocketId
                            Purpose:
                            Parameters:
                            Return:
  */

  module.exports.AssignUserSocketId = async function AssignUserSocketId(user,callback) {
          userModel.update({username:user.username}, { $set: { socketId: user.socketid}}, options, function(err,numAffected){
                callback(err,numAffected);
          });
  }

/*
                            Method name:updateLastStatusCode
                            Purpose:
                            Parameters:
                            Return:

*/

 module.exports.updateLastStatusCode = async function updateLastStatusCode(user,callback) {
   
        userModel.update({username:user.username}, { $set: {lastStatusCode:user.lastStatusCode}}, options, function(err,numAffected){
            callback(err,numAffected);
        });
}

/*

                            Method name:updateOnlineStatusForLogout
                            Purpose:
                            Parameters:
                            Return:


*/
    
module.exports.updateOnlineStatusForLogout = async function updateOnlineStatusForLogout(theUsername,callback) {
   
     userModel.update({username:theUsername},{ $set:{ onlineStatus: 'N' }}, options, function(err,numAffected){
              callback(err);
});

}

/*
                            Method name:updateOnlineStatusForLogoutbySocketID
                            Purpose:
                            Parameters:
                            Return:
*/

module.exports.updateOnlineStatusForLogoutbySocketID = async function uupdateOnlineStatusForLogoutbySocketID(theSocketId,callback) {
     userModel.update({socketId:theSocketId},{ $set:{ onlineStatus: 'N' }}, options, function(err,numAffected){
              callback(err,numAffected);
      });
}


/*
                         
                            Method name:
                            Purpose:
                            Parameters:
                            Return:


*/



/**
 * Save the Announcement Object in the db
 * @param {*} announcement 
 * @param {*} callback 
 * @returns set of elements which are just added in the db
 */
module.exports.saveAnnouncement = async function saveAnnouncement(announcement, callback)
{
        var theAnnouncementSchema=new announcementSchema(announcement);
        theAnnouncementSchema.save(function(err,result){
                if (err){
                              console.log('Fail to insert new Announcement....!'+err);
                              callback(err,result);
                }else{
                              console.log('DB controller initiate the schemas to insert an announcement.....');
                              callback(err,result);
                } 

        });
}







module.exports.getRecentAnnouncementDatetime = async function getRecentAnnouncementDatetime(
        recentDatetime, limitDatetime, callback)
{
        announcementSchema  
}