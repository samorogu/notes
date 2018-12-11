## Introduction

This notes are my summary from the [mastering react course](https://codewithmosh.com/p/mastering-react).
In the next sections I will put my path while learning React. After installing npm with react-app module `npm i -g create-react-app` and visual studio code with the extensions prettier and simple react snippets lets create our first react app.

Because I was using a old version of node, I had to update it. In my windows computer I had to do the following [instrucctions](https://stackoverflow.com/questions/18412129/how-can-i-update-npm-on-windows)

and had to execute as adminitrator in powershell `Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force`

```bash
create-react-app counter-app
```

After all my attemps, I concluded I needed to permisions for updating node (at the time I'm writting this, I haven't requested them yet jeje).

## Vidly proyect

## exercise solution

First we create a movies.jsx component in the components folder:

```
imrc+tab//import react component
css+tab//create generic class
import getMovies from'../services/fakeMoviesService';

class Movies extends Component{
    state{
        movies=getMovies();
    };
    render(){
        return table.table>thead>tr>th*4+tab//zencode
        //Just up to the closer table we include the rows
        tbody>tr>td*4+ta
    }
}
export default Movies;

```

Next we need to dynamically put each movie en each row with teh map method and a arrow function. With the snippets the code will end like this:

```
import React, { Component } from 'react';
import getMovies from'../services/fakeMoviesService';

class Movies extends Component {
    state = {
        movies:getMovies();//until I use lifehooks, this will be the way I will set the state
     };
    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.movies.map(movie =>{
                        <tr>
                            <td>movies.title</td>
                            <td>movies.genre.name</td>
                            <td>movies.numberInStock</td>
                            <td>movies.dailyRentalRate</td>
                        </tr>
                    })}

                </tbody>
            </table>
         );
    }
}

export default Movies;
```
