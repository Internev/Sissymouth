"use strict";

let express = require('express');
let app = express();

let mongoUtil = require('./mongoUtil');
mongoUtil.connect();

app.use( express.static(__dirname + "/../client"));

app.get("/burns", (req, res) => {
	let burns = mongoUtil.burns();
	burns.find().toArray((err, docs) => {
		// console.log(JSON.stringify(docs));
		let burnNames = docs.map((burn) => burn.name);
		res.json(burnNames);
	})
	// res.json(["Soup", "Coffee", "Tea"]);
});

app.listen(8181, () => console.log("listening on 8181"));