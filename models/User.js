"use strict"

/*
               

                *Authors:
                1. Gilbert N: creating User model class with all related methods
                *Main Purpose:This file is to contain all user attributes and methods

*/

/*
              Required files/libraries
             
              1. DB_COntroller: this file contains db controller methods to be called by user model
              

*/

const DB_Controller = require('../controllers/DB_Controller.js');


/*
           Class definition:
           1. Name: USer
           2. Attribute:
           3. Operations:



*/

class User {

    /*
           Class constructor: to initialize all user attribute for each crated on object

    */
    constructor(username, password, createdAt, lastLogin, lastStatusCode, accountStatus, approvalStatus, onlineStatus,socketId) {
        

        this.username = username;
        this.password = password;
        this.createdAt = createdAt;
        this.lastLogin = lastLogin;
        this.lastStatusCode = lastStatusCode;
        this.accountStatus = accountStatus;
        this.approvalStatus = approvalStatus;
        this.onlineStatus = onlineStatus;
        this.socketId=socketId;
    }

/*

         Getters and setters  definition for each class attribute:



*/

    getLastStatusCode() {
        return this.lastStatusCode
    }

    setLastStatusCode(statusCode) {
        this.lastStatusCode = statusCode;
    }

    getUsername() {
        return this.username
    }

    setUsername(username) {
        return this.username = username;
    }

    getPassword() {
        return this.password;
    }

    setPassword(password) {
        return this.password = password;
    }

    getCreatedAt() {
        return this.createdAt;
    }

    setCreatedAt(createdAt) {
        return this.createdAt = createdAt;
    }

    getLastLogin() {
        return this.lastLogin;
    }

    setLastLogin(lastLogin) {
        return this.lastLogin = lastLogin;
    }



    toString() {
        return `${this.username}, ${this.password}, ${this.createdAt}, ${this.lastLogin}, ${this.lastStatusCode}, ${this.accountStatus}, ${this.approvalStatus}`;
    }

/*

         Class methods definition
         


*/

/*
          Method:getUserList
          Purpose: 
          Parameter:
          Return:
  */
    getUserList(callback){
       DB_Controller.getUserList(function(err,result){
              callback(err,result);
       });
    }
/*
          Method: isUserExists
          Purpose: 
          Parameter:
          Return:
*/
    isUserExists(theUsername,callback) {
         DB_Controller.isUserExists(theUsername,function(err,result){
            callback(err,result);
        });
    }



   /*
          Method:getUserSortedList
          Purpose: 
          Parameter:
          Return:

  */
    getUserSortedList(callback) {

        DB_Controller.getUserSortedList(function(err,result){
         callback(result);

        });
    }

   /*
          Method: userLogin
          Purpose: 
          Parameter:
          Return:

  */

    userLogin(username, password,callback){
              this.username=username;
              this.password=password;
               DB_Controller.userLogin(this, function(logs){
                callback(logs);
               });
    }

   /*
          Method: updateOnlineStatusForLogin
          Purpose: 
          Parameter:
          Return:

  */
    updateOnlineStatusForLogin(username,callback) {

            DB_Controller.updateOnlineStatusForLogin(username,function(err,numAffected){
            callback(err,numAffected);

            });
        }
       
/*
          Method:updateLastStatusCode
          Purpose: 
          Parameter:
          Return:

  */
  updateLastStatusCode(userId,code,callback) {

            DB_Controller.updateLastStatusCode(this,function(err,numAffected){

                callback(err,numAffected);
            });
        }
/*
          Method:registerNewUser
          Purpose: 
          Parameter:
          Return:

  */

        registerNewUser(callback){

             DB_Controller.registerNewUser(this,function(err,result){
               
                callback(err,result)
            });
        }

/*
          Method:  verifyUserOnline
          Purpose: 
          Parameter:
          Return:

*/
    verifyUserOnline(username,callback) {
            DB_Controller.verifyUserOnline(username,function(err,result){

                callback(err,result);
            });
        }
/*
          
          Method: AssignUserSocketId
          Purpose: 
          Parameter:
          Return:

  */
    AssignUserSocketId(username,socketId,callback) {
       
            DB_Controller.AssignUserSocketId(username, socketId,function(err,numAffected){

                callback(err,numAffected);
            });
        }
/*
          Method:updateOnlineStatusForLogout
          Purpose: 
          Parameter:
          Return:
*/
    
    updateOnlineStatusForLogout(username,callback) {
            MDB_Controller.updateOnlineStatusForLogout(username,function(err,numAffected){
            callback(err,numAffected);

            });
        }
    
/*
          Method: updateOnlineStatusForLogoutbySocketID
          Purpose: 
          Parameter:
          Return:

*/
    updateOnlineStatusForLogoutbySocketID(socketid,callback) {
        DB_Controller.updateOnlineStatusForLogoutbySocketID(socketid,function(err,numAffected){

             callback(err,numAffected);
        });
    }



/*
          Method:
          Purpose: 
          Parameter:
          Return:

  */


}


module.exports = User
