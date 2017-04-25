//database
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('1n2o3d4e.db');

//message parse
const pm = require("./ParseMessageBody");

//get Weather
const gw = require("./getWeather");

//twilio
var twilio = require('twilio');

//express stuffs
var express = require('express'),
bodyParser = require('body-parser'),
app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//twilio response
app.post('/message', function (req, res) {
    var resp = new twilio.TwimlResponse();
    pm.typeOfMessage(req.body.Body.trim(), function(err, body){
        if(err){
            console.error(err);
        }else{
            if(body.id==1){
                resp.message("You have been unsubscribed from Smart DressUp!");
                console.log("Message Sent");
                res.writeHead(200, {
                    'Content-Type':'text/xml'
                });
                res.end(resp.toString());
            }else if(body.id==2){
                resp.message("You have been subscribed to Smart DressUp!");
                console.log("Message Sent");
                res.writeHead(200, {
                    'Content-Type':'text/xml'
                });
                res.end(resp.toString());
            }else if(body.id==3){
                gw.getWeather(body.zipCode, function(err, body){
                    console.log(body);
                    if(!body){
                        resp.message("Sorry, our system is busy. Please try again in 5 mins!");
                    }else{
                        var send_message="Weather in " +body.name+"("+body.zipCode+") is "+body.temp+" degrees with "+body.detail+".";
                        console.log(send_message);
                        resp.message(send_message);
                    }
                    console.log("Message Sent");
                    res.writeHead(200, {
                        'Content-Type':'text/xml'
                    });
                    res.end(resp.toString());
                });
            }else{
                resp.message("Invalid SMS. Use START zipcode or NOW zipcode or STOP");
                console.log("Message Sent");
                res.writeHead(200, {
                    'Content-Type':'text/xml'
                });
                res.end(resp.toString());
            }
        }
    });
    
});



//server details
var server = app.listen(1622, function() {
  console.log('Listening on port %d', server.address().port);
});

//---------------------------------------------------------