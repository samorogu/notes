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
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
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

Next we will change the selected item className depending on the clicked genre:

listGroup.jsx
```
  const {
    items,
    textProperty,
    valueProperty,
    onItemSelect,
    selectedItem
  } = props;
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>


```

and handle the selected item.

movies.jsx

```
...

  handleGenreSelect = genre => {
    //console.log(genre);
    this.setState({ selectedGenre: genre });
  };

  ...

<div className="row">
  <div className="col-3">
      <ListGroup
        items={this.state.genres}
        selectedItem={this.state.selectedGenre}
        onItemSelect={this.handleGenreSelect}
       />
</div>


```

##### listGroup-Implementing Filtering

Now we will filter the movies so before the pagination we need to filter the movies, so we will create a constant viltered that will change only if the selected Genre is clicked:

movies.jsx
```
...
//first we destructure the genre

  const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      genres
    } = this.state;

...

//then we create the filtered movies

const filtered = selectedGenre
      ? allMovies.filter(m => m.genre._id === selectedGenre._id)
      : allMovies;
    const movies = paginate(filtered, currentPage, pageSize); //if count is not 0 we will create an array of movies

 ....   
//and finally we will change the input of the string of movies and the itemsCount of the Pagination Component
 <p>There are {filtered.length} movies in the database</p>
         
...

          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />

```

##### listGroup-Adding all genres

In componentDidMount we need to make an adjustment. Include the spread operator of all genres and set the state to this new list not forgeting that when setting the sate, if the name of the variable is the same as the object we are substituting, we can get rid of `:genres`:

movies.jsx
```
...
  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres});
  }
```

But to show all the movies, we need to change the filtered constant. So we need to add another condition, if the selectedGenre has an id, apply the filtering if not, show all the movies.

movies.jsx
```
...
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;
```

But a bug arise. If we are in the second page and click the second page, we are trying to watch the second page of that genre instead of resseting the page for displaying all movies of that genre. To fix that we need to reset the page to 1.

movies.jsx
```
...
  handleGenreSelect = genre => {
    //console.log(genre);
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

```

##### moviesTable Component

Before continuing with the sorting component, we would have to worry only with high level components. If we see our render method in `movies.jsx` we can wrap that table in an external compoent just to make the render method more readable.

First we create the `moviesTable.jsx` in the components directory. This file will be prefix with movies but later we will abstract it to have any number of objects in there:

noviesTable.jsx
```
import React from "react";
import Like from "../common/like";
const MoviesTable = props => {
  const { movies, onDelete, onLike } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Stock</th>
          <th>Rate</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {movies.map(movie => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like liked={movie.liked} onClick={() => onLike(movie)} />
            </td>
            <td>
              <button
                onClick={() => onDelete(movie)}
                className="btn btn-danger btn-sm ml-2"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;

```

Then we can just call the function in movies.jsx not forgeting that the like component has to be in `moviesTable.jsx` and no any more in `movies.jsx`

```
...
import MoviesTable from "./moviesTable";

...

return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>There are {filtered.length} movies in the database</p>
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );

```

Now the we have everything to start with the sorting component

#### Sorting

##### Sorting-Raising the sort event

First we need to add another property (`onSort`) as a reference to the handleSort event. Cmd+d to select all the columns in the table of the MovesTable (4 times) component can be used when selecting the initial bracket and `th`:

moviesTable.jsx
```
<thead>
        <tr>
          <th onClick ={() =>onSort('tittle')}>Title</th>
          <th onClick ={() =>onSort('genre.name')}>Genre</th>
          <th onClick ={() =>onSort('numberInStock')}>Stock</th>
          <th onClick ={() =>onSort('dailyRentalRate')}>Rate</th>
          <th />
          <th />
        </tr>
```

Now in the movies.sj we need to handle the sort even:

movies.jsx
```
...
handleSort = path =>{
  console.log(path);
}
...

          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort ={this.handleSort}
          />

```

Now that we have change the sort event, we have a warning within the listGroup Component, telling us that each item has to have a unique key. And this is because we manually added all genres. Now we have to set the key property to an empty string to fix this:

movies.jsx
```
...
componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

```
##### Sorting-Implementing Sorting

Now that the plumbing is correct for the handleSort, we have to implement it.

So firt we go the handleSort function and edit the state that we will change afer:

movies.jsx
```
 handleSort = path => {
    console.log(path);
    this.setState({ sortColumn: { path, order: "asc" } });
  };
```

Then we have to create the property of the state that deals with the sorting:

```
...
 state = {
    movies: [], //until I use lifehooks, this will be the way I will set the state
    genres: [], //For the purpous of this exercise will get the genres in component did mount
    currentPage: 1, //current page in the pagination
    pageSize: 4, //number of pages displayed
    sortColumn: { path: "title", order: "asc" } //column sorted
  };
```

and finally in the render method we will use underscore to sort the column:

```
import _ from "lodash";

...

const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize); //if count is not 0 we will create an array of movies


```
With this we can click on the on the column  that we wanth to sort the table .

Now we have to implement the reverse order so in the handleSort we have to change a little bit the code:

movies.jsx

``` 
 handleSort = path => {
    //console.log(path);
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.setState({ sortColumn });
  };``

```

Just like other handlers, we first create a copy of the state, create the sorting order and settle the state.

##### Sorting-Moving responsibility

The last implementation has a little problem, the handle sort we will have to edit it every time we need to change it. So we will change that.

we will raise a sort event in movies table so this will not loger be a `stateless functional component`:

moviesTable.jsx
```
import React, { Component } from "react";
import Like from "../common/like";

class MoviesTable extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { movies, onDelete, onLike } = this.props;//we delete the onSort property because we don't need it any more
    return (
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => this.raiseSort("title")}>Title</th>
            <th onClick={() => this.raiseSort("genre.name")}>Genre</th>
            <th onClick={() => this.raiseSort("numberInStock")}>Stock</th>
            <th onClick={() => this.raiseSort("dailyRentalRate")}>Rate</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like liked={movie.liked} onClick={() => onLike(movie)} />
              </td>
              <td>
                <button
                  onClick={() => onDelete(movie)}
                  className="btn btn-danger btn-sm ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;

```

and then we will deal with the raised event:

movies.jsx

```
...
 handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
...
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />

```
##### Sorting-Extracting TableHeader


If we have a table of custumers instead of movies we would have to duplicate a component, so now we will extract the tableheaders with an external header component. First we create the tableHeader component that will receive 3 things: an array of the columns, the sorted column object and the onSort function. This will be the component that will raise the event, moviesTable will buble them up and movies component will handle it.

tableHeader.jsx
```
import React, { Component } from "react";

class TableHeader extends Component {
  //columns: array
  //sortColumn: object
  //onSort: function
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;

```
Then we will create the columns within the Movies table, and add the sortColumn and onSort from the props that comes from the movie component:

moviesTable.jsx
```
...
import TableHeader from "../common/tableHeader";
...
  //it doesn't need to be within a state because it won't change in lifecycle hooks
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like" },
    { key: "delete" }
  ];
...
   const { movies, onDelete, onLike, sortColumn, onSort } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />

```

##### Sorting-Extracting the tableBody

Now that we have extract the table headers into a separated component, we need to extract it's body in a different component:
tableBody.jsx
```
import React,{Component} from 'react';

class TableBody extends Component{


render(){

const {data,columns}= this.props;

return (
 <tbody>
        {data.map(item => <tr>
          { columns.map(  column=> <td></td>)}
                             </tr>
                          )
        }
      </tbody>);
   }
}
export default TableBody;
```

##### Sorting-Rendering Cell Content

Next we need to render each cell. So the first thing is for each column yo need to access the column path `item[column.path]` but this doesn't work for nested properties like `'genre.name'`. Instead we will use lodash.

tableBody.jsx
```
          <tr>
            {columns.map(column => (
              <td>{_.get(item, column.path)}</td>
            ))}
          </tr>
```

Now returning to moviesTable.jsx we will comment the tbody with cmd+/ selecting what we want to comment. With this we only are missing the like and delete button and dealing with unique key in each cell.

First we will deal with the buttons: Each component in essence  is a pure javascript object so in the columns we can declare components as properties:

moviesTable.jsx
```
...
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: <Like liked={movie.liked} onClick={() => onLike(movie)} />
    },
    {
      key: "delete",
      content: (
        <button
          onClick={() => onDelete(movie)}
          className="btn btn-danger btn-sm ml-2"
        >
          Delete
        </button>
      )
    }
  ];

```

If we compile uppon this we will get an error in moviesTable because we have a reference to movie.  to handle this we can use an arrow function in the property and reference each of the props properties to this.props:

moviesTable.jsx

```
...
 columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm ml-2"
        >
          Delete
        </button>
      )
    }
  ];

```

If we go to table Body the logic to return each cell of the table only takes the path property so we will make a function to return the path or another property:
tableBody.jsx
```
class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(item => (
          <tr>
            {columns.map(column => (
              <td>{this.renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
```

Everything works but we will deal with the key next.


##### Sorting-Rendering-Unique Keys

Each row  and cell we need to give it a unique key. So we will create a function for dealing with this key:

tableBody.jsx
```
...
  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}
```
and finally in moviesTable we will delete the reference of onLike and onDelete because we  used when we include the like and delete content in the columns properties. Now we only missing the sort icon.

##### Sorting-Adding the sort icon

To create the logic of the the sort icon, we will create a function and put the input of that function:

tableHeader.jsx
```
 renderSortIcon = column =>{
    if (column.path !== this.props.sortColumn.path) return null;
    if (this.props.sortColumn.order==='asc' return i.fa.fa-sort-asc;//snippet to get the icon
    return i.fa.fa-sort-desc;//else we will return the descending order
  };

  ...
        <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>

```
Finally we will create a css class to make it visible the click icon:

index.css:
```
...
.clickable {
  cursor: pointer;
}
```
and include that class to tableHeader.jsx:

```
...
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>


```