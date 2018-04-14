/***the main routes of the ens application***/
/*** the routes file uses express router ****/
/** routes.js - Wiki route module.***/
/**
 * Author : D.Bernard, Micheal, Gilbert, Jeannette
 */
var express = require('express');
var router = express.Router();
var http = require('http');
var session = require('express-session');
var bodyParser = require('body-parser');
var socket = require('socket.io');
var server = require('./app.js');
var JoinCommunityController = require('./controllers/JoinCommunity');
var urlencoded = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
var SocketController = require('./controllers/socketController')
const theApp = require('./app');
//var PrivateChatController = require('./controllers/PrivateChatController');



/**
* This is the default route of the app
*
*/
var user;
router.get('/', function(req, res) {

   /*
              Setting up session

   */
      user = req.session;
      console.log("Setting session variables");
      user.username;
      user.password;
      if (user.username) {
        console.log('User has session already');
        res.render('pages/landing');
        } else {
        res.render('pages/join');
      }

});

/**
* This is the join commmunity route
*
*/
router.get('/join', function (req, res) {
    res.render('pages/join');
});

/**
* This is the join confirmation route
*
*/
//define the confirmation route
router.get('/confirmation', function (req, res) {
    res.render('pages/confirmation');
});

/**
* This is the home route
*
*/
//define the confirmation route
router.get('/home', function (req, res) {
    res.render('pages/home');
});

/**
* This is the get route for private and public
* This is the API route call
*/
//define the confirmation route
router.get('/message/public', function(req, res) {
    let data =
    [{"username": "Anton", "status": "OK"},
     {"username": "Shumin", "status": "OK"},
     {"username": "Ritvik", "status": "EMERGENCY"}
 ];


    res.json(data);
});

/**
   * Get the getLatestPrivateMessages between two people
   * @param {*} req
   * * @param {*} res
   * @returns JSON  with 200 code status, and privates messages  in case request has been successfully processed
   * @return JSON with 400 code if there has been a problem in accessing or reading from the db
   */

router.get('/messages/private/', urlencoded, function (req, res) {
    var privateMessageUsers = {
        sendingUserName: req.query.sendingUserName,
        receivingUserName: req.query.receivingUserName
    };

    PrivateChatController.getLatestPrivateMessagesMongo(privateMessageUsers, function (err, result) {

        if (err) {
            console.log("\nUser list not found " + err);
            res.status(400).json(result);
        } else {

            console.log("\n Private messages found :" + result);
            res.status(200).json(result);
        }

    });
});


/**
* This is the get route for announcements
* Route is an API end point call
*/
//define the confirmation route

router.get('/announcements', function(req, res) {
    let data =
   [{"username": "Anton", "status": "OK"},
    {"username": "Shumin", "status": "OK"},
    {"username": "Ritvik", "status": "EMERGENCY"}
];


    res.json(data);
});

/**
* This is the get route for sharing status
*
*/
//define the confirmation route
router.get('/sharestatus', function (req, res) {
    res.render('pages/sharestatus');
});


/**
* This is the get route for searchin information
* This is API end point
*/
//define the confirmation route

router.get('/searchinfo', function(req, res) {
    let data =
    [{"username": "Anton", "status": "OK"},
     {"username": "Shumin", "status": "OK"},
     {"username": "Ritvik", "status": "EMERGENCY"}
 ];


    res.json(data);
});


/**
* This is the get route users
* This is an API end point
*/

router.get('/users', function (req, res) {
    //JoinCommunityController.getAllUsers().then(userList => {
      //  res.send(userList);
   // });
   let data =
   [{"username": "Anton", "status": "OK"},
    {"username": "Shumin", "status": "OK"},
    {"username": "Ritvik", "status": "EMERGENCY"}
];

    res.json(data);
});

/**
* This is the post  route users
* This is an API end point
*/

router.post('/users',jsonParser,function(req, res) {
     user = req.session;

     if(req.body.choice=="join"){
            user.username=req.body.username;
            user.password=req.body.password;
            console.log("Username:"+ user.username+"  password:"+user.password);
     }



     console.log(req.body.username);
     console.log("Reached here:"+req.body.username);
                JoinCommunityController.userLogin(user.username,user.password,req.body.choice,function(logs){
                console.log("username jc:"+logs.username);
                console.log("password jc:"+logs.password);
                res.json(logs);
                });


});


/**
* This is the post  route users
* This is an API end point
*/

router.get('/users/:userName',jsonParser,function(req, res) {

   let data =
   [{"username": "Anton", "status": "OK"},
    {"username": "Shumin", "status": "OK"},
    {"username": "Ritvik", "status": "EMERGENCY"}
];

   res.json(data);
});

/***
 * JSON page rendering with the data from the database
 */
router.get('/userdirectory', function (req, res) {

    let data =
        [{ "username": "Anton", "status": "OK" },
        { "username": "Shumin", "status": "OK" },
        { "username": "Ritvik", "status": "EMERGENCY" }
        ];
    res.render('pages/users', { listUsers: data });

});

/***
 * JSON page rendering with the data from the database
 */
router.get('/searchinfopage', function (req, res) {

    let data =
        [{ "username": "Anton", "status": "OK" },
        { "username": "Shumin", "status": "OK" },
        { "username": "Ritvik", "status": "EMERGENCY" }
        ];
    res.render('pages/searchinfo', { data: data });
});


/***
* JSON page rendering with the data from the database
*/
router.get('/chatprivately', function (req, res) {

    let data =
        [{ "username": "Anton", "status": "OK" },
        { "username": "Shumin", "status": "OK" },
        { "username": "Ritvik", "status": "EMERGENCY" }
        ];
    res.render('pages/chatprivately', { data: data });
});


/***
* JSON page rendering with the data from the database
*/
router.get('/chatpublicly', function (req, res) {

    let data =
        [{ "username": "Anton", "status": "OK" },
        { "username": "Shumin", "status": "OK" },
        { "username": "Ritvik", "status": "EMERGENCY" }
        ];
    res.render('pages/chatpublicly', { data: data });
});



/***
* JSON page rendering with the data from the database
*/
router.get('/announcementspage', function (req, res) {

    let data =
        [{ "username": "Anton", "status": "OK" },
        { "username": "Shumin", "status": "OK" },
        { "username": "Ritvik", "status": "EMERGENCY" }
        ];
    res.render('pages/announcements', { data: data });
});



/***
 * JSON page rendering with the data from the database
 */
router.post('/announcements',jsonParser, function(req, res) {

    var data = JSON.stringify(req.body);
     var theSocketController = new SocketController(theApp.serverSocket);
     theSocketController.Broadcast('NewAnnouncement', req.body);
     res.status(400).json(req.body);//tell the server socket connection
 
  });
 
 



module.exports = router;
