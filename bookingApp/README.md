## Booking App

## Set up

we will start by starting the npm package 
controller `npm init` then we will install 
the sever, json manager `npm i --save 
express body-parser. Then only for 
develompment we install nodedemon `npm i 
--save-dev nodedemon`.

In app.js we will start our server:

app.js
```
const express=requiere('express');
const body-parser = 
requiere('body-parser');

const app = (express);

app.get("/",(req, res, next)=>{
res.send("hello world");
});
app.listen(5000);

```

Now we go to package.json and define the 
start script:

package.json
```
...
"start": "nodemon app.js"
```

with this we will start the server with 
nodemon and automatically when save, we 
will see the changes. we can visit that 
port and see the hello world example.


