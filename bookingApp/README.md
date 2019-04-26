# Booking App

We will implement a booking simple application with mongodb, react, node and grapql within the academy tutorial.
The api will have the next functionality:
(wn4jj5h ww/logic.png).

## Set up

we will start by starting the npm package controller `npm init`, enter all the defaults. then we will install the sever, json manager `npm i --save express body-parser. Then only for develompment we install nodedemon `npm i --save-dev nodemon`.

In app.js we will start our server:

app.js
```
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.send("hello world");
});
app.listen(3000);


```
Now we go to package.json and define the start script:

package.json
```
...
"start": "nodemon app.js"
```

with this we will start the server with nodemon and automatically when save, we will see the changes. we can visit that port and see the hello world example.

## graphql

Now we will go to the console and define the packages that will deal with the midleware function and schema: ` npm i --save express-graphql graphql`

Now we will start defining our squema.express-grapql only exports one thing: a valid middleware function. we will use object destructuring to access a method that can define multilang schemas that can understand our multiline schema.

app.js
```
...
const grapqlHttp= requiere('express-graphql');
const {buildScmeha} = requiere('graphq');
...
/*app.get("/",(req, res, next)=>{
res.send("hello world");
});*/
app.use("graphql",grapqlHttp({
schema:buildSchema(`
Type RootQuery{
events:[String!]!
}
Type RootMutation{
createEvent(name String):String
}
schema{
query: RootQuery
mutation:RootMutation
`),
rootValue:{
events: ()=>{
return: ['a','b','c'];
},
createEvent: (args)=>{
eventName = args.name;
return eventName;
}, graphiql: true

}

}));
```
If we visit localhost:3000/graphql, we will see a interface to interact with our api. tha autocompletion is done with `crt+space`. Now we can test the two queries that we define:

localhost:3000/graphql
```
query{
events
}

mutation{
createEvent(name: " sports")
}
```

Remember, double cuotes are important.

## types and data in graphql

Now we will define the schema for the events:
app.js
```
...buildSchema{

Type Event{
_id:String!
name:String!
description:String!
price: float!
date: String!
}
Type RootQuery{
events:[String!]!
}
...
```


