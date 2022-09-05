const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.get("/" , function (req, res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/" , function(req , res) {
    const firstName = req.body.fName;''
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address:email,
                status:"subscribed",
                merge_fields: {
                    FNAME :firstName,
                    LNAME :lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us9.api.mailchimp.com/3.0/list/13578f5d95";

    const option = {
        method : "POST", 
        auth : "raju1:b5a650b3a1d426a5cc3440ddcd3060a1-us9"
    }
    const request = https.request(url , option , function(response) {
        response.on("data" , function(data) {
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();
})

app.listen(3000 , function(){
    console.log("Your server is running at port 3000");
})

// API key
// b5a650b3a1d426a5cc3440ddcd3060a1-us9

// List id /audiance id
// 13578f5d95