const mongodb = require("mongodb");

const bcrypt = require("bcrypt");
const saltRounds = 10;

function MongoUtils() {
  const mu = {},
    dbName = "nutricheck",
    uri = `${process.env.uriNutri}`;

  mu.findOne = (query, colName, cbk) => {
    console.log("entra la base de datoss findOne", query);
    const client = new mongodb.MongoClient(uri, { useNewUrlParser: true });
    client.connect((err) => {
      if (err) throw err;
      const collection = client.db(dbName).collection(colName);

      if (query) {
        user = collection.findOne(query).then((user) => {
          cbk(user);
          client.close();
        });
      }
    });
  };

  mu.findMany = (query, colName, cbk) => {
    console.log("entra la base de datoss findMany", query);
    const client = new mongodb.MongoClient(uri, { useNewUrlParser: true });
    client.connect((err) => {
      if (err) throw err;
      const collection = client.db(dbName).collection(colName);

      if (query) {
        collection.find(query).toArray((err, list) => {
          if (err) throw err;
          cbk(list);
          client.close();
        });
      } else {
        collection.find({}).toArray((err, list) => {
          if (err) throw err;
          cbk(list);
          client.close();
        });
      }
    });
  };

  mu.insertOne = (object, colName, cbk) => {
    console.log("entra la base de datoss insertOne", object);
    mu.findOne({ username: object.username }, "users", (user) => {
      if (user) cbk({ error: "El userName ya existe" });
      else {
        const client = new mongodb.MongoClient(uri, { useNewUrlParser: true });
        console.log("base de datos insert", object);
        client.connect((err) => {
          if (err) throw err;
          if (object == undefined) {
            throw new Error("Object can't be null or udefined");
          }
          const collection = client.db(dbName).collection(colName);
          let encrypt = object.password;
          bcrypt.hash(encrypt, saltRounds).then(function (hash) {
            object.password = hash;
            // Store hash in your password DB.
            collection.insertOne(object, (err, result) => {
              if (err) throw err;
              cbk(result.ops);
              client.close();
            });
          });
        });
      }
    });
  };

  mu.insertOneGeneric = (cbk, colName, object) => {
    const client = new mongodb.MongoClient(uri, { useNewUrlParser: true });
    console.log("base de datos insert", object);
    client.connect((err) => {
      if (err) throw err;
      if (object == undefined) {
        throw new Error("Object can't be null or udefined");
      }
      const collection = client.db(dbName).collection(colName);

      collection.insertOne(object, (err, result) => {
        if (err) throw err;
        cbk(result.ops);
        client.close();
      });
    });
  };

  mu.updateOne = (cbk, colName, object, update) => {
    const client = new mongodb.MongoClient(uri, { useNewUrlParser: true });
    client.connect((err) => {
      if (err) throw err;
      console.log(update, "UPDATE");
      console.log(object, "OBJECT");
      if (object == undefined) {
        throw new Error("Object can't be null or udefined");
      }
      const collection = client.db(dbName).collection(colName);
      collection.updateOne(object, update, (err, result) => {
        if (err) throw err;
        cbk(result);
        client.close();
      });
    });
  };

  return mu;
}

module.exports = MongoUtils();
