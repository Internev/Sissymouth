# MEAN Stack

* MongoDB
* Express
* Angular
* Node

*Requires MongoDB server running*

## Developing

* `npm install` to resolve dependencies
* `npm run watch` to start transpile watch. This command will read files under `client/src` and generate a single file under `client/dist/bundle.js` which should be included by index.html

* Is using gulp to transpile from ES2015. *

Remember to import seed data: mongoimport --db sissy-dev --collection burns --type json --file server/burns-seed.json --jsonArray --drop


