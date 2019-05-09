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

## Graphql and Mongodb

We will use mongodb  to persit the data. For this we will use Mongodb atlas. we create a user and add our ip.

Then we will use mongoose that allow to work with modules with graphql `npm i mongoose`.

The we will create a nodemon.json file to add configuration:

nodemon.js
```
{
    "env": {
        "MONGO_USER": "bookingUser",
        "MONGO_PASSWORD": "'XXXX",
        "MONGO_DB": "events-react-dev"
    }
}

```

Then in app.js we will create the connection. Remember that the password is the one defined in mongo atlas for the user and the template literal has to have double quotes for making it a string. Also passing the parameter of userNewUrlParse deletes the warning of deprecation.:

app.js
```
...
const mongoose = require("mongoose");
...

mongoose
  .connect(
    `"mongodb://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-shard-00-00-ly89x.mongodb.net:27017,cluster0-shard-00-01-ly89x.mongodb.net:27017,cluster0-shard-00-02-ly89x.mongodb.net:27017/${
      process.env.MONGO_DB
    }?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"`,
    { useNewUrlParser: true }
    )
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

```

Then we will add some logic and interact with the data base instead of creating in memory arrays. We will create a js models to manage data. Schemas area objects that we can use in the app. Our event schema will have a title, description, price and date. The id will be created for default by mongoose.For all the  properties we will defined as required because we don't want it as Null.:

models/events.js

```
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("Event", eventSchema);
```

In the last part we create a model with this schema that we defined.

Then we will return to the app and import this squema to create js objects based on this model. Then in the creation of the event we will transform the date to a js Date. Then we will save and catch to a data base. 

app.js
```
...
const Event = require("./models/event");
...
      createEvent: args => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date)
        });
        return event
          .save()
          .then(result => {
            console.log(result);
            return { ...result._doc, _id: result._doc._id.toString() };
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      }

```

Lets give it a try and in `http://localhost:3000/graphql`  we will create an event:

```
mutation {
  createEvent(eventInput: {title: "a test", description: "This is a test", price: 12.4, date: "2019-05-05T19:25:45.901Z"}) {
    title
    description
  }
}
```

Then if we go to mongodb atlas an access the colecctions, we will see the our new event. Also, we can see it in mongodb compass. We can see that the id was auto generated. Now that we can write data, we need to access the read data.

We will create find some entry colections. We will filter and return all the events except for the metadata(spread operator):

app.js
```
      events: () => {
        return Event.find()
          .then(events => {
            return events.map(event => {
              return { ...event._doc, _id: event.id };
            });
          })
          .catch(err => {
            throw err;
          });
      }

```

Also we can see that we return _id because we will access the id that can be converted to a normal string that is understandable by graphql. So we can do a query.If we call event.id, mongoose will access the id in an easy way instead of doing 'esult.doc_id_.toString()':

```
query{
  events{
    title,
    _id
  }
}
```

Now we can create events and returns those events.

## Adding relations

We will add users to the models for them to book an event. The user will have email, password and created events. The events can be null. User are conected to the event if they created an event and the other way is by booking an event. For now we will focus for the created event. A relation is made in brackets so in createdEvents. The event will have the type `Schema.Tpymes.ObjectId` because that is the the types that uses mongoose(a list of ids the user created). The ref will let mongoose know that 2 models are conected, we use the name of the object we want to conect `event`.

models/event.js
```
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event"
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
```

Also the events must have a reference to a user. It will have an id and a reference to a User:

models/events.js
```
...
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }

```

Then we will go to the mongodb to delete the events we previously created as test.

Now we will go to app.js and add the user. In my resolver I will never return the password.  We will add the user, the input and the mutation when creating a user. Then in the resolvers we will add the createUser().If a user is created, we should store an encrypted password. For this, we will install `npm i bcryptjs` to create a hash.

app.js
```
...
const bcrypt = require("bcryptjs");
...
        type User {
          _id: ID!
          email: String!
          password: String
        }
        ...
          input UserInput {
          email: String!
          password: String!
        }
        ...
            type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }
        ...
        createUser: args => {
        return User.findOne({ email: args.userInput.email })
          .then(user => {
            if (user) {
              throw new Error("User exists already.");
            }
            return bcrypt.hash(args.userInput.password, 12);
          })
          .then(hashedPassword => {
            const user = new User({
              email: args.userInput.email,
              password: hashedPassword
            });
            return user.save();
          })
          .then(result => {
            return { ...result._doc, password: null, _id: result.id };
          })
          .catch(err => {
            throw err;
          });
      }

```

Now we can create a user in graphiql:

```
mutation{
  createUser(userInput:{email:"test@test.com",password:"tested"}){
    email
    password
  }
}
```

We don't want to retrieve the password that we show `password:null`. For dealing duplicates and will throw an error if the user already exists. Don't forget the return to get a promise. If we go and try to enter a new user, it will fail because it already exist.

When creating and event we will atach the event creator. For now we will hardcode this.  When creating an event if we push event, it will be handle by mongoose. Then we will create a variable `createdEvent` that  has the information of the Event.

Lest create a new event:

```
mutation {
  createEvent(eventInput: {title: "a test", description: "This is a test", price: 12.4, date: "2019-05-05T19:25:45.901Z"}) {
    title
    description
  }
}

```

Now if we go to mongodb we will see the event attached to the user and the other way around.



