"use strict";

let express = require('express');
let app = express();

let mongoUtil = require('./mongoUtil');
mongoUtil.connect();

app.use( express.static(__dirname + "/../client"));

app.get("/burns", (req, res) => {
	let burns = mongoUtil.burns();
	burns.find().toArray((err, docs) => {
		if (err) {
			res.sendStatus(400);
		}
		let burnNames = docs.map((burn) => burn.name);
		res.json(burnNames);
	})
});

app.get("/burns/:burnId", (req, res) => {

	let burnId = req.params.burnId;
	console.log("Burn ID: ", burnId);

	let burns = mongoUtil.burns();
	burns.find({name: burnId}).limit(1).next((err, docs) => {
		if (err) {
			res.sendStatus(400);
		}
		//console.log("burn doc: ", docs);
		res.json(docs);
	})

})

app.listen(8181, () => console.log("listening on 8181"));