const mongodb = require("mongodb");
function MongoUtils() {

	const mu = {},
		dbName = "nutricheck",
		uri = `${process.env.uriNutri}`;

	mu.findMany = (cbk, colName, query) => {
		const client = new mongodb.MongoClient(uri, { useNewUrlParser: true });
		client.connect(err => {
			if (err) throw err;
			const collection = client.db(dbName).collection(colName);

			if (query) {
				collection.find(query).toArray((err, list) => {
					if (err) throw err;
					cbk(list);
					client.close();
				});
			}
			else {
				collection.find({}).toArray((err, list) => {
					if (err) throw err;
					cbk(list);
					client.close();
				});


			}
		});
	};


	mu.insertOne = (cbk, colName, object) => {
		const client = new mongodb.MongoClient(uri, { useNewUrlParser: true });
		client.connect(err => {
			if (err) throw err;
			if (object == undefined) {
				throw new Error("Object can't be null or udefined");
			}
			const collection = client.db(dbName).collection(colName);
			collection.insertOne(
				object,
				(err, result) => {
					if (err) throw err;
					cbk(result.ops);
					client.close();
				}
			);
		});
	};

	

	return mu;

}

module.exports = MongoUtils();