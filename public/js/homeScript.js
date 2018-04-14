/*
 Filename:homeScript
 purpose: processing home page events

*/

/* 
               Declaration of global variable
               1. socket:
               2.username:



*/
     var usernamepassed="";
      var socket = io.connect('http://localhost:8000');
      var $username= $('#username');
      socket=io.connect({query: `userId=${$username.val()}`});


/* 
                When a document loads

*/


      $(document).ready(function (){

    /*
              Method to handle log out events
    */

            $('#usernameSpan').html("Gilbert");

            $('#logout').click(function(e){
                   
                    var $username= $('#username');
                    alert($username.val());
                    $.ajax({
                                type: 'POST',
                                data: JSON.stringify(statuscrumb),
                                contentType: 'application/json',
                                url:'/updateuserstatus',
                                success: function(response) {
                                                    // For example, filter the response
                                                    console.log('success');
                                                    //console.log(JSON.stringify(response));
                                                    alert(JSON.stringify(response));
                                                    //callback(response);
                                }
                     });
              
              });


/*
                                      Method to handle listing directory 
*/
        $('#btnDirectory').click(function(e){
                    
                                      alert("Directory clicked");

                                      $("#listDirectiory").show();
                                      shatList_Handler();
                                      $.ajax({
                                                    type: 'POST',
                                                    data: JSON.stringify(statuscrumb),
                                                    contentType: 'application/json',
                                                    url:'/updateuserstatus',
                                                    success: function(response) {
                                                              // For example, filter the response
                                                                console.log('success');
                                                                //console.log(JSON.stringify(response));
                                                                  alert(JSON.stringify(response));
                                                                //callback(response);
                                                      }
                                      });


        });



  });//END OF DOCUMENT


/*
                  **Method to be called when listing user directory

*/
              function userDirectoryList_Handler(){

                                  var $hideUserDirectory=$('#hideUserDirectory');
                                  console.log("Start handling list of users");
                                  var $username= $('#username');                         
                                  socket.connect($username.val());
                                  socket.emit('directory-list',{userId:$username.val()});
                                  console.log("directory _ call#1");
                                  socket.on('directory-list-response',function(response){
                                                        alert("come back");
                                                        var rep=$.parseJSON(response);
                                                        var results = document.getElementById("hideUserDirectory");                                  
                                                        results.innerHTML="";
                                                        hideUserDirectory.innerHTML+='<div class="my-3 p-3 bg-white rounded box-shadow"><h6 class="border-bottom border-gray pb-2 mb-0">UserDirectory</h6>';
                                                        for (var obj in rep){
                                                                      results.innerHTML += '<div class="media text-muted pt-3"><img data-src="holder.js/32x32?theme=thumb&bg=6f42c1&fg=6f42c1&size=1" alt="" class="mr-2 rounded"><p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"><strong class="d-block text-gray-dark">';
                                                                      results.innerHTML += rep[obj].username+' '+rep[obj].onlineStatus+' '+rep[obj].lastStatusCode+'</strong></p></div>'; 
                                                          }
                                                        results.innerHTML +='</div>';
                                                 
                                                          //$hideUserDirectory.val(results);
                                  });


                    }


/*

Populating username on home page


*/
