// server.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app); 
var io = require('socket.io')(server); 

//start our web server and socket.io server listening
server.listen(3000, function(){
  console.log('listening on *:3000');
}); 


app.use(express.static(__dirname)); 
//redirect / to our index.html file
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});


var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://launchpad-f189d.firebaseio.com"
});


var db = firebase.database();
var ref = db.ref("Circles");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});


io.on('connection', function(client) { 
	
	console.log('Client connected...'); 

    client.on('createCircleClicked', function(data) {

        var randomID = '_' + Math.random().toString(36).substr(2, 9);
		var userArr = data.usersAdd.split(',');
		var users = JSON.stringify(userArr);
	
	ref.set({
          randomID: {
          circle_name: data.circle,
          circle_partipants: users
        }
    });

        client.emit('createCircleSuccess')

    });
    
});

