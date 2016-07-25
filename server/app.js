"use strict";

let express = require('express');
let app = express();

let mongoUtil = require('./mongoUtil');
mongoUtil.connect();

let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

app.use(express.static(__dirname + "/../client"));

//Serves the burn object from db to client app.js as json.
app.get("/burns", (req, res) => {
    let burns = mongoUtil.burns();
    burns.find().toArray((err, docs) => {
        if (err) {
            res.sendStatus(400);
        }
        res.json(docs);
    })
});

//Serves the full burn db object, based on search of name.
app.get("/burns/:burnId", (req, res) => {

    let burnId = req.params.burnId;
    console.log("Burn ID: ", burnId);

    let burns = mongoUtil.burns();
    burns.find({
        name: burnId
    }).limit(1).next((err, docs) => {
        if (err) {
            res.sendStatus(400);
        }
        res.json(docs);
    })

});

app.post("/burns/add/new", jsonParser, (request, response) => {
    let newBurn = request.body.burn || {};
    let burns = mongoUtil.burns();

    burns.save(newBurn);
    console.log("Burn: ", newBurn);
    response.sendStatus(201);
});

app.listen(8181, () => console.log("listening on 8181"));
