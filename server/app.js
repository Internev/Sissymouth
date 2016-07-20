"use strict";

let express = require('express');
let app = express();

let mongoUtil = require('./mongoUtil');
mongoUtil.connect();

let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

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
		res.json(docs);
	})

});

app.post("/burns/add/new", jsonParser, (request, response) => {
	let newBurn = request.body.burn || {};

	console.log(newBurn.name);
	// if (!newBurn.consistency || !newBurn.type || newBurn.level){
	// 	response.sendStatus(400);
	// }

	let burns = mongoUtil.burns();
	let query = {name: newBurn.name};
	let update = {$push: {burns: newBurn}};

	// burns.findOneAndUpdate(query, update, (err, res) => {
	// 	if (err){
	// 		console.log("failure");
	// 	}
	// 	console.log("SUCCESS...ish");
	// 	response.sendStatus(201);

	// });
	burns.save(newBurn);
	console.log("Burn: ", newBurn);
	response.sendStatus(201);
});

app.listen(8181, () => console.log("listening on 8181"));