console.log('Loading event');
var AWS = require('aws-sdk/dist/aws-sdk');
var dynamodb = new AWS.DynamoDB.documentClient({region: "us-west-2"});

exports.handler = function(event, context) {
    console.log(JSON.stringify(event, null, '  '));
    dynamodb.listTables(function(err, data) {
      console.log(JSON.stringify(data, null, '  '));
    });
    var tableName = "chat";
    var datetime = new Date().getTime().toString();
    dynamodb.putItem({
        "TableName": tableName,
        "Item" : {
            "user": {"S": event.user },
            "date": {"S": datetime },
            "msg": {"S": event.msg}
        }
    }, function(err, data) {
        if (err) {
            context.done('error','putting item into dynamodb failed: '+err);
        }
        else {
            console.log('great success: '+JSON.stringify(data, null, '  '));
            context.done('K THX BY');
        }
    });
};

// sample event
//{
//  "user": "bart",
//  "msg": "hey otto man"
//}