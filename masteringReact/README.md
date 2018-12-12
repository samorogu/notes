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

```{javascript}
import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies() //until I use lifehooks, this will be the way I will set the state
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.state.movies.map(movie => (
            <tr>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>{movie.dailyRentalRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Movies;
```

Finally to conclude the first part of the exercise, in the App.js we will include de movies component:

```{javascript}
import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Movies from "./components/movies";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <main className="container" />
        <Movies />
      </React.Fragment>
    );
  }
}

export default App;

```

Next we have to include a button with boostrap style `button.btn.btn-danger.btn-sm+tab`  without forgeting that each time We iterative render an object, it has to have a unique id:

```{javascript}


        <tbody>
          {this.state.movies.map(movie => (
            
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <button className="btn btn-danger btn-sm ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>

```

Next we add the count of movies in the movies object. We dont have to forget to include React.fragment to the return statement

```
 <React.Fragment>
        <h4>The total number of movies is {this.state.movies.length}</h4>
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
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
```
Next we have to update the state method but withuout calling directly. We call the setstate method.
We create an array without the movie we will delete in the method handleDelte(movie)

```{javascript}
handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    //in modern javascript when we have this repetition, we can leave only the movie
    //this.setState({ movies: movies });
    this.setState({ movies });
  };
```

Finally we have to conditional rendering the message of movies if there are 0 movies left, we use object destructuring for not having to type a lot:


```{javascript}
const { length: count } = this.state.movies; //object destructuring
    if (count === 0) return <p>There are no movies</p>;

    return (
      <React.Fragment>
        <p>There are {count} movies in the database</p>
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
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>

``` 


