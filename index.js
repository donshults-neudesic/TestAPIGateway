var faker = require('faker');
var AWS = require("aws-sdk/dist/aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});

exports.handler = function(event, context, callback){
var table = "Movies";
var params = {
  TableName: table,
  Item: {
    "movieId": Math.floor((Math.random() * 100) + 1),
    "movieName": "GhostBusters"
  }
}

  docClient.put(params,function(err,data){
    if(err){
      callback(err,null);
    }else{
      callback(null,data);
    }
  });
  //callback(null,movie);
  //context.succeed(inventory);
}

function UpdateDb(movie){


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
