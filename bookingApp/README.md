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

Now we will go to the console and define the packages that will deal with the midleware function and schema: ` npm i --save express-graphql graphql`.express-graphql is a middleware function to handle them in a schema.

Now we will start defining our squema.express-grapql only exports one thing: a valid middleware function. we will use object destructuring to access a method that can define multilang schemas that can understand our multiline schema.

app.js
```
const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`
    type RootQuery{
      events:[String!]!
    }
    type RootMutation{
      createEvent(name: String): String
    }
    schema{
      query: RootQuery
      mutation:RootMutation
    }
  `),
    rootValue: {
      events: () => {
        return ["Sailing", "Cooking", "Playing"];
      },
      createEvent: args => {
        const eventName = args.name;
        return eventName;
      }
    },
    graphiql: true
  })
);
app.listen(3000);

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

With this we can get the information of the events

Remember, double cuotes are important.

## Types and data in graphql

For now we hav created 2 types: RootQuery and RootMutation. Now we will define the schema for the event. Events will have _id (this notation is for mongodb), name, description, price and date. When a property in a type has !, it cannot be null, not optional.

app.js
```
...
buildSchema{

  Type Event{
    _id:String!
    name:String!
    description:String!
    price: float!
    date: String!
  }

...

    type RootMutation{
      createEvent(name: String): Event
    }
}
```

Graphql reads an array of events, it can be an array of empty objects but it cannot be null. In the createEvent we could put all the parameters the type events needs, but we will create an input schema to avoid inecessary code in the RootMutation. We can see  that we not need the commas 

app.js
```
...
        input EventInput {
          title: String!
          description: String!
          price: Float!
          date: String!
        }
...
    type RootMutation{
      createEvent(eventInput: EventInput): Event
    }

```
Now we will create in memory array that will be change later for a database. 

app.js
```
...
const app = express();

const events= [];

app.use(bodyParser.json());

```

Then in the createEvent we will create a random id, get the title, description, price and date from the args and finally push it to an array.

```
events: () => {
        return events;
      },
      createEvent: args => {
        const event = {
          _id: Math.random().toString(),
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: args.eventInput.date
        };
        events.push(event);
        return event;
      }
```

Then we can visit graphiql to pick data from the events that we want:

```
query{
  events{

  }
}

```

Now we will create an event:

```
mutation{
  createEvent(eventInput:{title:"a test",description:"Works!",price:12.4,date:"01-05-2019"}){
    title
    description
    
  }

```

We can only read the data that we want from the api without any transformation in the frontend. Our resolves gives everything and we only take what we want.



