
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
MongoClient.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err, client) => {
  if (err) {
      return console.log(err);
  }

  // Specify database you want to access
  const db = client.db('exchRate');
  const coll = db.collection('baseTRY');
  console.log(`MongoDB Connected: ${url}`);
  var XMLHttpRequest = require('xhr2');
  var requestURL = 'https://api.exchangerate.host/latest?symbols=USD,EUR,GBP&base=TRY';
  var request = new XMLHttpRequest();
  setInterval(async ()=>{
    await updateCollections()
},10000)

async function updateCollections(){
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();

  request.onload =  function() {
  var response = request.response;
  delete response['motd'];
  response['rates']['EUR']= between(18,20,5).toString();
  response['rates']['USD']= between(16,18,5).toString();
  response['rates']['GBP']= between(20,21,5).toString();
  var updateResult =coll.updateOne(
    {"base":"TRY"},
    {$set:response},
    {"upsert":true},
    function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
    }
  );
  
};
}
});
function between(min, max, decimals) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);

  return parseFloat(str);
}



