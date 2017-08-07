var faker = require('faker');
var AWS = require('aws-sdk');
var ep = new AWS.Endpoint("dynamodb.us-west-2.amazonaws.com");
AWS.config.update({
  region: "us-west-2",
  endpoint: ep
});




exports.handler = function(event, context){
  // return order details for a given order
  var order = {};
  // name, address, city, state, phone, order date, ship date, price, transaction type
  order.id = event.orderId;
  order.name = getName();
  order.address = getShippingAddress();
  order.city = getShippingCity();
  order.state = getShippingState();
  order.phone = getPhone();
  order.shipMethod = getShipMethod();
  order.price = getPrice();
  UpdateDb(order);
  context.succeed(order);
}

function UpdateDb(order){
var docClient = new AWS.DynamoDB.DocumentClient();
var table = "Shoes";
var params = {
  TableName: table,
  Item: {
    "orderId": order.orderId,
    "orderName": order.name,
    "price": order.price
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
function getName() {
  return faker.name.findName();
}

function getShippingAddress() {
  return faker.address.streetAddress() + " " + faker.address.streetSuffix();
}

function getShippingCity() {
  return faker.address.city();
}

function getShippingState() {
  return faker.address.state();
}

function getPhone() {
  return faker.phone.phoneNumber();
}

function getShipMethod() {
  var shippers = ['FedEx', 'UPS', 'USPS', 'DHL']
  return shippers[Math.floor(Math.random() * 4)];
}

function getPrice() {
  return faker.commerce.price();
}
