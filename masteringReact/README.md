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

### 1 exercise solution

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

### 2 Like Component

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

#### 3 Pagination

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
  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link">1</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

```

then we will install loadash from the  terminal (we can open the terminal from vsc with the shortcut: `backtick+ctrl`) `npm -i lodash@4.17.10`. Lodash is the optimize version from underscore.

Then we create dinamically the number of pages with the 2 properties given by props:

```
import React from "react";
import _ from "lodash"; //optimization from underscore

const Pagination = props => {
  const { itemsCount, pageSize } = props;

  const pagesCount = itemsCount / pageSize;

  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li key={page} className="page-item">
            <a className="page-link">{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

```

If we have a movie count of 10, the pages count most be 1 but because we don't want it to render only the page 1, we wont render the pagination:

```

const Pagination = props => {
  const { itemsCount, pageSize } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);//if we dont take the ceil, it wont equal 1 and will be a floting number

  if (pagesCount === 1) return null;

  const pages = _.range(1, pagesCount + 1); //if pages count is 3, the range will be 2, so we need to increment by 1

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li key={page} className="page-item">
            <a className="page-link">{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

```

##### Handling Page Changes

Right now we aren't handdling the `handlePageChange` event inside the pagination so if the user cliks on the anchor, we need to raise the event. if the anchor is clicked, we call the `onPageChange` event.

Also if we want to highlight the page that we actually are we need to compare so we need to include another property `currentPage`

```

const Pagination = props => {
  const { itemsCount, pageSize, onPageChange } = props;// we include the event onPageChange

  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) return null;

  const pages = _.range(1, pagesCount + 1); 

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li key={page} className="page-item">
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

```
cmd+p or crtl+p to search for the methods of the class, so in this case we can search for hadlePageChange and edit it in the movies.jsx:

```
 handlePageChange = page => {
    this.setState({ currentPage: page });
  };

```

Finally we will change dinamically the active page depending if the page is equal to the current page:

```

   <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>

```

##### Pagination- Paginating Data

We are ready to paginating the data. For this we need to create a utility function that we can call in others components. First we create a utils directory in the proyect and we create the paginate file and define the algorithm to return the number of items that are needed to diplay in the page:

```
import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value(); //wrap the array to a lodash object
}
```

We slice the array staring with the current page and take the items needed to render. We need to apply the value property to convert it to a simple array.

Back to the moves.jsx we desctructure the moves to allMovies and call the function that will change dinamically when the page is updated. Not to forget to change this.props.moves that was called in when rendering each movie( movies.map instead of this.state.movies.map) :

```

 const { pageSize, currentPage, movies: allMovies } = this.state;//destructuring the movies
   

const movies = paginate(allMovies, currentPage, pageSize); //if count is not 0 we will create an array of movies depending on the current page

```

##### Pagination- Type Checking with PropTypes

To avoid bugs with typing we need to install `npm i prop-types@15.6.2`.

Inside the documentation of react there is a tab `Typechecking With PropTypes` with the available list of types.

If we pass another type that isn't the one a component specting, it won't show an error, it will only have a bug, so we can include a validation inside a component to show a warning only in the development.

If we change the item.count and hardcode the "abc" string, we can include the next validation in the pagination component:


```
import PropTypes from "prop-types";

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

```
It will pop out a a waring with the failing prop type message.

#### 4 List group

##### Filtering-Component Interface

Now we will implement a list of genres of the movies. 

Fist we will insert a div element instead of the React fragment and snippet 2 columns `div.col-2+div.col`. In the right column we will include all our paragraph compoment and in the left column we will include the listGroup component.

```
       <div className="col-2" />
        <ListGroup
          items={this.state.genres}
          onItemSelect={this.handleGenreSelect}
        />

```

We include the listgroup component and import the getGenres function in the fakeGenreService and initialize the getGenres in the componentDidMount cyclehook. 

Next we will create the handleGenreSelect event that for now will print in console

```
import { getGenres } from "../services/fakeMovieService";
...
class Movies extends Component {
  state = {
    movies: [], //until I use lifehooks, this will be the way I will set the state
    genres: [], //For the purpous of this exercise will get the genres in component did mount
    currentPage: 1, //current page in the pagination
    pageSize: 3 //number of pages displayed
  };
  ...
componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }
...
handleGenreSelect = genre => {
    console.log(genre);
  };
```

And finally we will create the common component `common/listGroup.jsx` as a stateless function compoenent for now:

```
import React from "react";

const ListGroup = () => {
  return null;
};

export default ListGroup;
```

##### Filtering-Displaying items

Now we will use a bootstrap list. To do this we will go to the listGroup component and snippet a list in the return statement `ul.list-group>li.list-group-item` and map each item element with a unique key id:

```
const ListGroup = props => {
  const { items } = props;
  return (
    <ul className="list-group">
      {items.map(item => (
        <li key={item._id} className="list-group-item">
          {item.name}
        </li>
      ))}
    </ul>
  );
};
```

To keep a better visual column we will change the className of the listGroup component to a `col-3`.

##### listGroup - default props

When we incorporated the properties in the listGroup component we could increase the difficult of using that component when increasing it functionality. To avoid this, we can include default props and in the future if we need to change the name of an object property, we can do it and not worry about all the others properties.

listGroup.jsx
```
...
ListGroup.defaultProps{
textProperty='name',
valueProperty='_id'
};
```

##### listGroup-Handling select

Now we will handle the item select. First we will print the item selected: we need to call the method handleItemSelected and raise and event.

listGroup.jsx
```

const {items,textProperty,valueProperty, onItemSelect} =props;

const ListGroup = props => {
  const { items } = props;
  return (
    <ul className="list-group">
      {items.map(item => (
        <li 
        onClickItem= {()=>onItemSelect(item)}
        key={item[valueProperty]}
        className="list-group-item"
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};
```





