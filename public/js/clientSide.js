//connect the socket

var host = location.origin.replace(/^http/, 'ws');
var socket = io.connect(host)
var currentDate = new Date().toLocaleString();

$("#postMessage").click(function () {
    var message = document.getElementById('messageArea');
    var username = document.getElementById('username');
    var messageType = 'public';
    //push the data to the array
    var data = {};
    data.message = message.value;
    data.author = username.value,
        data.postedAt = currentDate;
    data.messageType = messageType;

    //make sure the message field is empty
    message.value = " ";

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/messages/public',
        success: function (data) {
            console.log('success');
            console.log(JSON.stringify(data));
        },
        error: function (error) {
            console.log(error);

        }
    });


});

//brodacast this message to everyone to receive
socket.on('NewPublicMessage', function (messageData) {
    var md = jQuery.parseJSON(JSON.stringify(messageData));
    //showmessages.innerHTML += '<div class="media text-muted pt-3"><img src="../images/user-holder.png" alt="" class="mr-2 rounded"> <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark">@' + data + "  " + data + '</strong>' + data + ' </p></div>';
    showmessages.innerHTML += '<div class="media text-muted pt-3"><img src="../images/user-holder.png" alt="" class="mr-2 rounded"> <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark">@' + md.author + " " + md.messageType + '</strong>' + md.postedAt + '<br/>' + md.message + '</p></div>';
});

// adding broadcast messages when an annoucement is posted.
$("#postAnnouncement").click(function () {
    var announcement = document.getElementById('announcementArea');
    var coordinator = document.getElementById('coordinator');
    var AnnouncementTitle = document.getElementById('AnnouncementTitle');
    var messageType = 'announcement';
    var postedAt = currentDate;

    //push the form elements into a data array to be passed on to the url
    var data = {};
    data.announcement = announcement.value;
    data.coordinator = coordinator.value,
        data.AnnouncementTitle = AnnouncementTitle.value;
    data.messageType = messageType;

    if (announcement.value == " ") {
        alert("Please Enter Announcement")
    } else {
    //make sure the message field is empty after pressing send message
    announcement.value = " ";
    AnnouncementTitle.value = " ";


        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/announcements',
            success: function (data) {
                console.log('success');
                console.log(JSON.stringify(data));
            },
            error: function (error) {
                console.log(error);

            }
        });
    }
}); //end post announcement

//receive and broadcast the lastes announcement
//brodacast this message to everyone to receive
socket.on('NewAnnouncement', function (data) {
    showannouncements.innerHTML += '<div class="media text-muted pt-3"><img src="../images/user-holder.png" alt="" class="mr-2 rounded"> <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"> <strong class="d-block text-gray-dark">@' + data.coordinator + "  " + currentDate + " " + '</strong>Title:' + data.AnnouncementTitle + '<br/>' + data.announcement + '</p></div>';
});

// adding broadcast messages when an annoucement is posted.
$("#btnUpdatestatus").click(function () {
    var username = document.getElementById('username');
    var ShareStatusCode = "";
    var selected = $("input[type='radio'][name='group100']:checked");
    if (selected.length > 0) {
        selectedVal = selected.val();
        //push the form elements into a data array to be passed on to the url
        var data = {};
        data.username = username.value;
        data.ShareStatusCode = selectedVal;

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/users/status/statuscode',
            success: function (data) {
                console.log('success');
                console.log(JSON.stringify(data));
            },
            error: function (error) {
                console.log(error);
            }
        });
    }//close if selected document
}); //end post announcement

//receive and broadcast the lastes announcement
//brodacast this message to everyone to receive
socket.on('NewShareStatusRequest', function (data) {
    ShareStatus.innerHTML += '<b>' + data.status + '</b>';
});

//place all this under chat privately button click event
//get the url paramenters
// adding broadcast messages when an annoucement is posted.
$("#postPrivateChat").click(function () {
    //push the form elements into a data array to be passed on to the url
    var username = document.getElementById('username');
    var data = {};
    data.username = username.value;

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/chatprivately/username',
        success: function (data) {
            console.log('success');
            console.log(JSON.stringify(data));
        },
        error: function (error) {

        }
    });
}); //end post announcement
