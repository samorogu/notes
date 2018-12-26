## Introduction

This notes are my summary from the [mastering react course](https://codewithmosh.com/p/mastering-react).
In the next sections I will put my path while learning React. After installing npm with react-app module `npm i -g create-react-app` and visual studio code with the extensions prettier and simple react snippets lets create our first react app.

Because I was using a old version of node, I had to update it. In my windows computer I had to do the following [instrucctions](https://stackoverflow.com/questions/18412129/how-can-i-update-npm-on-windows)

and had to execute as adminitrator in powershell `Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force`

```bash
create-react-app counter-app
```

After all my attemps, I concluded I needed to asked for permisions for updating node (at the time I'm writting this, I haven't requested them yet jeje).

## Vidly proyect

### exercise solution

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

Next we need to dynamically put each movie en each row with the map method and a arrow function. With the snippets the code will end like this:

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

Next we add the count of movies in the movies object. We don't have to forget to include React.fragment to the return statement

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
Next we have to update the state method but withuout calling it directly. We call the `setstate` method.
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

Just one more thing. The message is so close at the top of the screen so we will use the padding so in index.js we will change the padding to 20 pixels margin bewteen the top:

```{css}

body {
  margin: 0;
  padding: 20px 0 0 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

```

### Like Component

Continuing with the vidley proyect, lets create a reusable `like` component. With this we will create a like button that can be used with other proyects. First in a new directory called common we will create a file named like.jsx. As an input we need a boolean(liked or not) and as an output we need to raise an event: onClick for the compononent that will handle the event do what it is requiered. Back in the font awesome documentary, there is the heart taht we will used for the [like component](https://fontawesome.com/v4.7.0/icon/heart-o).

For the first part we need to include the heart component:

```
import React from "react";

//Input: liked: boolean
//Output: onClick

const Like = props => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default Like;

```
We use a stateless component because the component is only rassing events. the onClick event receaves the event and the movies.jsx is handle the event. if the atribute liked is true, the heart will be filled and if not it will render an empy heart.

Back in the movies.jsx component, we include the handdleLike:

```
  handleLike = movie => {
    //console.log("movie liked", movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

```

if the like event is called, it will togle the like atributed in the movies.

Finally we include another row and call the like component with the handle like event.

```
<td>
  <Like
    liked={movie.liked}
    onClick={() => this.handleLike(movie)}
  />
</td>

```

### Pagination, sorting and filtering

#### Pagination

Like the like component we will create pagination.jsx as an standalone component. To render the pagination we will use [bootstrap pagination](https://getbootstrap.com/docs/4.2/components/pagination/):

```

imr+tab//snippet
sfc+tab//snippet

const Pagination = props => {
  return nav>ul.pagination>li.page-item>a.page-link;//snippet
};

export default Pagination;

```

this will create the basic pagination stateless function component:

```
import React from "react";

const Pagination = props => {
  return <nav>
      <ul className="pagination">
          <li className="page-item"><a href="" className="page-link"></a></li>
      </ul>
  </nav>;
};

export default Pagination;

```




