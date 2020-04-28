const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req, res){
  res.sendFile(__dirname + "/try.html");
});
app.post("/", function(req, res){
  const firstName = req.body.FirstName;
  const lastName = req.body.LastName;
  const email = req.body.email;
  const data = {
    members :[
      {
        email_address:email,
        status : "subscribed",
        merge_fields : {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }
  const jsonData = JSON.stringify(data);

  var url = "https://us8.api.mailchimp.com/3.0/lists/f74fe7e5f4";

  const options = {
    method : "POST",
    auth : "Satyam:0f7e78ee397c4427694921c6790f1995-us8"
  }
  const request = https.request(url, options, function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }
  });
  request.write(jsonData);
  request.end();


});
app.post("/failure", function(req, res){
  res.redirect("/");
})
app.listen(process.env.PORT, function(){
  console.log("Server is started");
});
//api key
// 0f7e78ee397c4427694921c6790f1995-us8
//log id
// f74fe7e5f4
