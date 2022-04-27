const csvtojson = require("csvtojson");
const mongodb = require("mongodb");
const Look_up = require("./models/csv");
const resellers = require("./models/resellers");
const transactions = require('./models/transactions');
const mongoose = require("mongoose");

var url =
  "your mongodb url";

var dbConn;

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to database!");
  })
  .catch(() => {
    console.log("connection failed");
  });

const fileName = "t.csv";
var arrayToInsert = [];
csvtojson()
  .fromFile(fileName)
  .then((source) => {
    // Fetching the all data from each row
    for (var i = 0; i < source.length; i++) {
    let data = source[i].data;

    //console.log(data.items);

      //  var oneRow = {
      //     brandId: source[i]["brandId"],
      //     multiplier: source[i]["multiplier"],
      //     tierId: source[i]["tierId"]
      //  };
      //  const look_up = new Look_up({
      //     brandId: source[i]["brandId"],
      //     multiplier: source[i]["multiplier"],
      //     tierId: source[i]["tierId"]
      //  })

      let created = new Date(source[i]["createdAt"]);
      let updated = new Date(source[i]["updatedAt"]);

      //  const look_up = new resellers({
      //     _id: mongoose.Types.ObjectId(source[i]["_id"]),
      //     createdAt: created.toISOString(),
      //     points:source[i]["points"],
      //     resellerId: source[i]["resellerId"],
      //     tierId: source[i]["tierId"],
      //     updatedAt: updated.toISOString()
      //  })
      //let items = [{}]
      items = JSON.parse(data.items);
      let newItems = [];

      for (let j = 0; j < items.length; j++) {
        console.log(items[j]);
        let obj = {
          brandId: items[j].brandId,
          multiplier: items[j].multiplier,
          productId: items[j].productId,
          retailPrice: items[j].retailPrice,
          quantity: items[j].quantity,
          sku: items[j].sku,
          brandName: items[j].brandName,
          points: items[j].points,
          _id: mongoose.Types.ObjectId(items[j]["_id"]["$oid"]),
        };
        newItems.push(obj);
      }
      console.log(newItems);

      //break;

      const look_up = new transactions({
        _id: mongoose.Types.ObjectId(source[i]["_id"]),
        data: {
          id: data.id,
          currency: data.currency,
          entityType: data.entityType,
          items: newItems,
          totalAmount: data.totalAmount,
        },
        resellerId: source[i]["resellerId"],
        createdAt: created.toISOString(),
        eventType: source[i]["eventType"],
        points: source[i]["points"],
        resId: source[i]["resId"],
        status: source[i]["status"],
        tierId: source[i]["tierId"],
        updatedAt: updated.toISOString(),
      });

      //arrayToInsert.push(oneRow);
      look_up
        .save()
        .then((created) => {
          console.log("saved", created);
        })
        .catch((error) => {
          console.log("saving error");
        });
    }
  });

// mongodb.MongoClient.connect(url, function(err,db) {
//     if(err!=null){
//         return console.log(err.message)
//     }

//     const fileName = "finalBrands.csv";
//     var arrayToInsert = [];
//     csvtojson().fromFile(fileName).then(source => {
//         // Fetching the all data from each row
//         for (var i = 0; i < source.length; i++) {
//              var oneRow = {
//                 brandId: source[i]["brandId"],
//                 multiplier: source[i]["multiplier"],
//                 tierId: source[i]["tierId"]
//              };
//              arrayToInsert.push(oneRow);
//          }
//         });

//     db.collection("look_up_points")
//     console.log("db",db.collection("look_up_points"));
// })

// .then((client) => {
//     console.log('DB Connected!',client);
//     dbConn = client.dbName();
// }).catch(err => {
//     console.log('DB Connection Error: ${err.message}');
// });

// // CSV file name
// const fileName = "finalBrands.csv";
// var arrayToInsert = [];
// csvtojson().fromFile(fileName).then(source => {
//     // Fetching the all data from each row
//     for (var i = 0; i < source.length; i++) {
//          var oneRow = {
//             brandId: source[i]["brandId"],
//             multiplier: source[i]["multiplier"],
//             tierId: source[i]["tierId"]
//          };
//          arrayToInsert.push(oneRow);
//      }

//      console.log("db conn",dbConn)
//      //inserting into the table “employees”
//      var collectionName = 'look_up_points';
//      var collection = dbConn.collection(collectionName);
//      collection.insertMany(arrayToInsert, (err, result) => {
//          if (err) console.log(err);
//          if(result){
//              console.log("Import CSV into database successfully.");
//          }
//      });
// });
