var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("WEBSHIZ");
  var query = { first_name: "Disank" };
  dbo.collection("users").find(query).toArray(function(err, result) {
    if (err){
        console.log('hehehe');
      }
    if(result=='')
    {
        console.log('hehehe');
    }
    console.log(result);
    db.close();
  });
});