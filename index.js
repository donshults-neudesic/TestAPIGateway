var faker = require('faker');
var AWS = require("aws-sdk/dist/aws-sdk");
var ep = new AWS.Endpoint("dynamodb.us-west-2.amazonaws.com");
AWS.config.update({
  region: "us-west-2",
  endpoint: ep
});

exports.handler = function(event, context){
  // return an array of 10 items in inventory
  // include product name, color, description
  // size, and price
  var inventory = [];
  for (var i = 0; i < 10; i++){
    var myShoe = getMyShoe();
    var item = {};
    item.name = getShoeName(myShoe);
    item.color = getShoeColor();
    item.description = getShoeDescription(myShoe);
    item.size = getShoeSize();
    item.price = getShoePrice();
    inventory.push(item);
    var movie = {};
    movie.movieId = i;
    movie.movieName = item.name;
    UpdateDb(movie);
  }
  
  context.succeed(inventory);
}

function UpdateDb(movie){
var docClient = new AWS.DynamoDB.DocumentClient();
var table = "Movies";
var params = {
  TableName: table,
  Item: {
    "movieId": movie.movieId,
    "movieName": movie.movieName
  }
}
  docClient.put(params,function(err,data){
    if(err){
      console.error("Unable to add item. Error JSON:", JSON.stringify(err,null,2));
    }else{
      console.log("Added item:", JSON.stringify(data,null,2));
    }
  });
}

function getMyShoe() {
  var shoeType = [
    "running shoe",
    "cross-training shoe",
    "tennis shoe",
    "basketball shoe",
    "aerobic shoe",
    "spinning shoe"
  ]
  return shoeType[getNum(0, 5)];
}

function getShoeName(myShoe){
  return faker.company.catchPhraseNoun() + " " + faker.company.catchPhraseDescriptor() + " " + myShoe;
}

function getShoeColor() {
  return faker.commerce.color();
}

function getShoeDescription(myShoe) {
  return "A(n) " + faker.commerce.productAdjective() + ", " + faker.commerce.productAdjective() +
  " " + myShoe + " made from the finest " + faker.commerce.productMaterial() +
  " designed for the " + faker.company.bsBuzz() + " individual!"
}

function getShoeSize() {
  return getNum(1, 13);
}

function getShoePrice() {
  return faker.commerce.price();
}

function getNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
