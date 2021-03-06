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

##### Sorting- Extracting Table 

We will make a table component to easily use it because it is a little messy to declare the header and body with the same columns.

table.jsx
```
import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = props => {
  const { columns, sortColumn, onSort, data } = props;
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
```

and then we will call this component in moviesTable:

```
...
  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={movies}
      />
    );
  }
```

Now we can reuse the table component with other things like customers 

##### Sorting- Extracting a method

We will wrap all the logic of filtering, sorting the movies in a diferent method to make the render function more cleaner:

movies.jsx
```

...

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      movies: allMovies,
      selectedGenre
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize); //if count is not 0 we will create an array of movies

    return { totalCount: filtered.length, data: movies };
  };

  ...

    const { totalCount, data: movies } = this.getPagedData();
```
##### Sorting-Destructuring arguments


Finally we will make a little bit more cleaner the code within the sfc like table and pagination and substitue the destructoring constant within the props parameter:

table.jsx
```
...
const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

```

pagination.jsx

```
...
const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange })

```

#### Routing

##### Set up

First we will install the extension called auto Import to automatically import components. then we will install the dependences of router-app: `npm i`. Then if we hit `npm run` we will render a simple routing setup.

React is only a frontend framework so it doesn't deals with routing so we will install: `npm i react-router-dom@4.3.1`.

Now to add routing we will need to import it in index.js with the snipet:`import {BrowserRouter} from rrd+enter`-> `import {BrowserRouter} from 'react-router-dom';`

Next we need to resolve the problem that the route isn't rendering. It was only the the parameter of the router was in capital letter.

Starting with the code given by Mosh, first in index.js we will incorporate  the `BrowserRouter` wrapper:

index.js
```
...
import { BrowserRouter } from "react-router-dom";
...
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```

Then we will incorporate the routing to each component:

App.js
```
...
import { Route } from "react-router-dom";
...
      <div>
        <NavBar />
        <div className="content">
          <Route path="/products" component={Products} />
          <Route path="/posts" component={Posts} />
          <Route path="/admin" component={Dashboard} />
          <Route path="/" component={Home} />
        </div>
      </div>
    );
```

##### Routing - Switch

The last implementation piles the home content with other routes because the page will be render if it matches the path: `/` is the home path and it will be render because `/products` has an `/` we need to fix that. One solution is to use the exact path:

App.js
```
...
<Route path="/" exact component={Home} />
```
And another solution is to use switch. We need to order our routes from the more especific routes to most generic ones:

App.js
```
...
import { Route, Switch } from "react-router-dom";
...

        <div className="content">
          <Switch>
            <Route path="/products" component={Products} />
            <Route path="/posts" component={Posts} />
            <Route path="/admin" component={Dashboard} />
            {/* <Route path="/" exact component={Home} /> */}
            <Route path="/" component={Home} />
          </Switch>
        </div>

```

##### Routing - Link

To not make the server reload everything when we click on each href, we need to make some adjustments.We don't need to render again and again the bundle.js with http requests:

navbar.jsx
```
...
import { Link } from "react-router-dom";
...
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/products">Products</Link>
      </li>
      <li>
        <Link to="/posts/2018/06">Posts</Link>
      </li>
      <li>
        <Link to="/admin">Admin</Link>
      </li>
    </ul>
  );


```
##### Routing - Props

If we inspect in the react addon of chrom we can see that the Products components has 3 props (history, location and match). This props are injected because we wrap them with the Router component.

1. History can be used to redirect a user
2. Status is the current state of the object
3. Match contains information this url has that we set on the route.

##### Passing Props

For passing the props of a component to a Route component we need to change the code a little. Also wee need to use the spread operator that can be used in jsx to copy the props given by Route:

Apps.js
```
            <Route
              path="/products"
              component={props => <Products sortBy="newest" {...props} />}
            />

```
##### Route Parameters 

parameters can be pass to a route. In this case if we click on the product, the route will be updated with the number of product:

App.js

```
...

          <Switch>
            <Route path="/products/:id" component={ProductDetails} />
            <Route
              component={props => <Products sortBy="newest" {...props} />}
            />

```

Then if we go to the productDetails.jsx we can render the product id with the param :

```
...
      <div>
        <h1>Product Details - {this.props.match.params.id} </h1>
        <button onClick={this.handleSave}>Save</button>
      </div>


```
Finally we will change the anchor on each product to avoid reloading the page:

products.jsx
```
...
        <ul>
          {this.state.products.map(product => (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </li>
          ))}
        </ul>

```

##### Optional Parameters 

If we go to the url `http://localhost:3000/posts/2018` we can see that it redirected to the home path. That is because it is not a valid url so automatically it will go to the home route. To fix this we need to append an optional parameter:

App.js

```
 <Route path="/posts/:year?/:month?" component={Posts} />

```

And in the Posts Component get those parameter to render the year and the month applying object destructuring inside the parameters of the sfc:

posts.jsx
```
import React from "react";

const Posts = ({ match }) => {
  return (
    <div>
      <h1>Posts</h1>
      Year: {match.params.year} , Month:{match.params.month}
    </div>
  );
};

export default Posts;
```
##### Routing Query String parameters

Optional parameters should be avoid. In this exercise it has no problem, but they have to be included in query strings. If we check the react tool, we can see that the query string parameters are in the location parameter. To extract this parameters there is a better way instead of manually looking for this. We need to installl: `npm i query-string@6.1.0`.

After we install the package, we can go to the  go to the posts component an see what does the console logs if we include the query string:

post.jsx

```
...
import queryString from "query-string";
...

const result = queryString.parse(location.search);

```

##### Routing Redirects

What happens if we have an invalidate page: `/xyz` we go to the home component, so we need to change this behavior. As we did in the switch lecture, we can use the exact property in the home path to avoid the home rendering. But the ideal would be to render a not found page.

For this we need to go to the app.js and redirect if nothing matches the previous routes:


```
...
import { Route, Switch, Redirect } from "react-router-dom";
...
            <Route path="/posts/:year?/:month?" component={Posts} />
            <Route path="/admin" component={Dashboard} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Home} />
            <Redirect to="/not-found" />{/*  render else*/}


```

Also if we want an specific route to redirect to a route we need to make that:

```
            <Route path="/admin" component={Dashboard} />
            <Redirect from="/messages" to="/post" />{/*  Redirection from to*/}
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Home} />
            <Redirect to="/not-found" />
```

##### Routing Programmatic Navigation

There are times that we want to redirect a user if they cick a button (programmatic navigation).
In the product list if a button clicks that button we can go back to the product parent. In the history object we can find various methods as going forward, backward, push and replace, etc. The diference between push and replace is that replace if a user clicks the go back button after clicking a button, it wont return the the previous link: useful in log in aplications.

productDetails.jsx
```
...
  handleSave = () => {
    // Navigate to /products
    //this.props.history.push("/products");//with this you can return with back
    this.props.history.replace("/products"); //back button won't work after click save in the product detail
  };

```

##### Routing Nested Routing

Now we will have different level of routing and for that we will go to the dashboard.sjx inside the admin directory and add 2 links `  ul>(li>Link[to=''])*2 + tab'`:

```
...
import Link from 'react-router-dom';
...

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li>
          <Link to=""></Link>
        </li>
        <li>
          <Link to=""></Link>
        </li>
      </ul>
    </div>
  );
```

But the posts and Users Components would needed to appeared in a sidebar, so we will create it:

./admin/sidebar.jsx
```
import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <ul>
      <li>
        <Link to="/admin/posts">Posts</Link>
      </li>
      <li>
        <Link to="/admin/users">Users</Link>
      </li>
    </ul>
  );
};

export default SideBar;
```

Now that we defined  a nested link component we will use it in the dashboard, importing the necessary components and defining the route defined to access the users and posts.

.admin/sidebar.jsx
```
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <SideBar />
      <Route path="/admin/users" component={Users} />
      <Route path="/admin/posts" component={Posts} />
    </div>
  );
```

##### Routing Adding react router to vidley project

Now we will return to the vidley project. First we will install `npm i react-router-dom@4.3.1`. Then in app.js we will wrap our component to enable routing:

```
import { BrowserRouter } from "react-router-dom";
...
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

```

Then we will create 4 state less components, all with the same structure: movieForm,notFound,rentals and components:

/components/ customers.jsx movieForm.jsx notFound.jsx rentals.jsx

```
import React from "react";

const Customers = () => {
  return <h1>Customers</h1>;
};

export default Customers;

```

##### Routing Adding react routes

Now we will go the the app.js and import react router dom and apply zen snippet while changing on down to the left the language to javascrcipt react(`Route[path][component]*4`) and import the 4 components that will have a route:

```
import React, { Component } from "react";
import { Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <main className="container">
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
        </main>
      </React.Fragment>
    );
  }
}

export default App;

```

Currently there will be not home page but if go to the movie route, we will se that component. Now we need to redirect the home page to movies and if any other route is put, it redirect exactly to that route with Switch:

```
...
import { Route, Redirect, Switch } from "react-router-dom";
...
        <main className="container">
          <Switch>
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" to="movies" />
            <Redirect to="not-found" />
          </Switch>
        </main>

```

But to redirect exactly to the home page if any other route is given we need to explicity put exact to the home page:

```
...
          <Switch>
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="movies" />
            <Redirect to="not-found" />
          </Switch>
```

##### Routing Adding the navBar


We will create in the components a file called navBar and go to the bootstrap documentation and go to the [navbar](https://getbootstrap.com/docs/4.1/components/navbar/).

Then we will extract the simple navbar and change the `class` with `className`, with vsc and mac we can type cmd+f2 to select all occurrences that we want to change, similarly we will change the anchor `a` tag with `NavLink` and finally all the `href` to `to`.

Next we will change the main name of our aplication "Vidly" and change the NavLink to Link because we dont want the active class and change the route and include the others routes deleting the disable button. We dont have to forget that we also delete the active class.

./navBar.jsx
```
import React from "react";
import { Link, NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Vidly
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/movies">
            Movies
          </NavLink>
          <NavLink className="nav-item nav-link" to="/customers">
            Customers
          </NavLink>
          <NavLink className="nav-item nav-link" to="/rentals">
            Rentals
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;


```

Next we will go to app.js and include the Navbar:

```
...
import NavBar from "./components/navBar";
...
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="movies" />
            <Redirect to="not-found" />
          </Switch>
        </main>
      </React.Fragment>

```

Next we will quickly fix the padding of the navbar:

index.css
```
...
.navbar {
  margin-bottom: 30px;
}

```

##### Routing Adding the linking to the movieForm

Now in each movie rendered in the table we will link it with a Link component with a template literal(dinamically instert values into strings):

moviesTable.jsx
```
...
import { Link } from "react-router-dom";
...
{
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title} </Link>
    }

```

Next we will add the valid route to render:

app.js
```
import Movies from "./components/movies";
...
          <Switch>
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="movies" />
            <Redirect to="not-found" />
          </Switch>
...

```
Next we will include the id of the move in the tittle of the movie form:
movieForm.jsx. For this we will use object destructuring to get the match property from props.
```
...
const MovieForm = ({ match }) => {
  return <h1>Movie Form {match.params.id} </h1>;
};
```

Finally we will include 2 buttons:



const MovieForm = ({ match }) => {
  return <div>
    <h1>Movie Form {match.params.id} </h1>
    button.bt.bt-primary {/*snippet*/}
    </div> ;
};

Because we are using a fsc, we cannot used handleSave, so we will use an arrow function to handle the onClick event that returns to the MoviesTable component:

movieForm.jsx
```
const MovieForm = ({ match, history }) => {
  return (
    <div>
      <h1>Movie Form {match.params.id} </h1>
      <button className="bt bt-primary" onClick={() => history.push("/movies")}>
        Save
      </button>
    </div>
  );
};

```

#### Forms

##### Building a bootstrap form

First we will create a loginForm in the components directory.

.components/loginForm.jsx

```
import React,{Component} from "react";

class LoginForm extends Component {
  render() {
    return <h1>Login</h1>;
  }
}

export default LoginForm;
```

Now we will register another route in app.js:

```
...
import LoginForm from "./component/loginForm";
...
<Route path="/login" component={LoginForm} />
```

Next we need to include a link to the navbar:

.components/navbar.jsx
```
...

          <NavLink className="nav-item nav-link" to="/login">
            Login
          </NavLink>

```

If we test our application until this point we will se the new tab to the login.Nex we go the the bootstrap [forms](https://getbootstrap.com/docs/4.1/components/forms/).

Before anything we will need to  wrap our return login in a div.The is a snippet that can wrap this up: `cmd+shift+p` then it will appear a textbox that we will write wrap and then the wrapping tag: `div`. It can also accept zen code, for example instead of a div, we can specify the class container `div container` but for now we only need the `div` wrapper:

loginForm.jsx
```
  render() {
    return <div>
      <h1>Login</h1>
    </div>;
  }
```

Next, just behind the h1 tag, we will include the next snippet:
`form>(div.form-group>label+input.form-control)*2`:

```
    return (<div>
      <h1>Login</h1>
      <form action="">
        <div className="form-group"><label htmlFor=""></label><input type="text" className="form-control"/></div>
        <div className="form-group"><label htmlFor=""></label><input type="text" className="form-control"/></div>
      </form>
    </div>);

```

We will delete the action attribute, we don't need that. Next we will specify the id for the input in the username that needs to be the same for the htmlFor attribute(this is like the class property, it is a reserved key and that's why we need to put it that way). For editting two different parts of a code, we can arbitrary put the cursor and press down the alt key to [edit multiple parts of the code](https://stackoverflow.com/questions/30037808/multiline-editing-in-vscode). And finally we need a button: `button.btn.btn-primary`:

.components/loginForm.jsx
```
...
  return (
      <div>
        <h1>Login</h1>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input id="username" type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="text" className="form-control" />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
...

```

##### Form-Handling form submission 

Each time a user login, it takes a full round trip to the server, reloading the page completely. We don't want that for the app. We will include a handleSubmit and only take the data if we need one:

loginForm.jsx
```
...
  handleSubmit = e => {
    e.preventDefault();
    //call the server
    console.log("submitted");
  };

        <form on onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input id="username" type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="text" className="form-control" />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
```
##### Form-Refs

In vanilla js to get the text of a form the next could be applied: `const username = document.getElementByID('username').value;` but this would get the dom and in react we don't want to work with the virtual dom because it is easier to maintain the code. If you want to access necessarily to an element, you can use ref but don't use it too often:

loginForm.jsx
```
 username = React.createRef();

  componentDidMount() {
    this.username.current.focus();
  }
  handleSubmit = e => {
    e.preventDefault();
    //call the server
    const username = this.username.current.value;
    console.log("submited");
  };
  ...
  <input
              ref={this.username}
              id="username"
              type="text"
              className="form-control"
            />

```
This can be applied if we include the focus in the input instead of using `componentDidMount()` also using the `autoFocus` attribute :

```
...
  // componentDidMount() {
  //   this.username.current.focus();
  // }

              <input
              autoFocus
              ref={this.username}
              id="username"
              type="text"
              className="form-control"
            />

```

##### Form-Controlled Elements

Next we will include a state to the loginForm:

loginForm.jsx
```
...
state = {
    account: { username: "", password: "" }
  };

```
If we type something in the username box and go to the react dev tool, we will search for the login form. The state object doesn't get notify for the change because it needs a single state of true. We need to get ride of the state of the box by change it to a controlled element. For this we need to get the value of the input box from the state and when it change, update the state:

loginForm.jsx
```
...
  handleChange = e =>{
    const account = {...this.state.account};
    account.username = e.currentTarget.value;
    this.setState({account});
  };
...

 <div className="form-group">
            <label htmlFor="username">Username</label>
            <input value = {this.state.account.username}//props to set its value
              onChange= {this.handleChange}//update the state when the user types
              id="username"
              type="text"
              className="form-control"
            />
          </div>

``` 

Now if go to the devtool, we will see that the component of the input username change if the user types.

##### Form-Handling multiple inputs

In the current implementation we only are aware of the changes in the username property. We need to be aware also of the password property. If we need to change a parameter, we will used the bracket notation instead of the dot notation. Then instead of hardcoding or using a different method, we will use the same method to be aware of the changes:

loginForm.jsx
```
...
 handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };
...
const { account } = this.state;
...
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              value={account.username} //props to set its value
              onChange={this.handleChange} //update the state when the user types
              // autoFocus
              // ref={this.username}
              id="username"
              name="username"
              type="text"
              className="form-control"
            />
          </div>
          ...
                    <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={account.password}
              onChange={this.handleChange}
              name="password"
              id="password"
              type="text"
              className="form-control"
            />
          </div>
```

##### Form-Common errors


If we remove a property that it is used in the state and we are aware of its changes with controlled  elements `account: {password:""}`, React will throw an error that we initialize an uncontrolled element and next we redefined it as a controlled element. The same happen if we put NULL in a property. A property in the state cannot be undefined or null.


##### Form-Extracting a reusable input

If we see our input form, we can see that we are using a lot of repetitive code so we will extract the input and make another common component:

../common/Input.jsx
```
import React from "react";

const Input = ({ name, label, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value} 
        onChange={onChange} 
        id={name}
        name={name}
        type="text"
        className="form-control"
      />
    </div>
  );
};

export default Input;
```

Then we will use it in loginForm to make the code more compact:

loginForm.jsx
```
...
import Input from "../common/input";
...
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
```

##### Form-Validation

Initially we will validate the login. in the state we will include an object of errors instead of a list because it is easier to access the objects. For example, if we use an array, to access those errors we would have to type something like `errors.find(e=>e.name === username)`

.components/loginForm.jsx
```
...
state = {
    account: { username: "", password: "" },
    errors: {}
  };

   validate = () => {
    return { username: "Username is requiered." };
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors });

    if (errors) return;
//call the server
    console.log("submited");
  };

```

If there are any errors, we return the function, and doesn't call the server

##### Form-Basic Validation Implementation

Next we will validate for the 2 text inputs: username,password:

components/loginForm.jsx
```
...
  validate = () => {
    const errors = {};

    const { account } = this.state;

    if (account.username.trim() === "")
      errors.username = "Username is requiered.";
    if (account.password.trim() === "")
      errors.password = "Password is requiered.";

    return Object.keys(errors).length === 0 ? null : errors;
  };
  ...
    const errors = this.validate();
    console.log(errors);
    this.setState({ errors });

```

If there the user doesn't put text and click submit, we will log in the console, the object with the errors: `Username is required` or/and `Password is required`

##### Form-Display validation errors

The validation error will be handle by the input component, so first we will include a danger div in it`div.alert.alert-danger`:

common/login.jsx
```
...
{ name, label, value, error, onChange })//object destructuring in the parameter
...

    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value} //props to set its value
        onChange={onChange} //update the state when the user types
        // autoFocus
        // ref={this.username}
        id={name}
        name={name}
        type="text"
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>

```

If an error is different than null, it will be true c and continue with the other validation and return the alert.

Then we will pass the parameters in loginForm:

components/loginForm.jsx
```
...
const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );

```

Now if we go to the browser and try to submit the form, it will show the error message for both, the password and username input. If we type an string to the username and submit, it will show only the password error. But if we type both characters, it will have a runtime error because errors are null and we are trying access the username property of a null object. To fix this problem we will use true c but with the or operator in the set.State:

loginForm.jsx
```
...
   this.setState({ errors: errors || {} });
```

If there are errors, it will show them. And if not, it will return a empty object. Null cannot be return and try to access to their properties.


##### Form-Validation on change

When validate an input inside a form, we call it inside the handleChange, but not calling the validate method because it will validate all the form, so we will validate only that input:

common/loginForm.jsx
```{}
...
  handleChange = ({ currentTarget: input }) => {
    const errors ={...this.state.errors};
    const errorMessage = this.validateProperty(input);
    if(errorMessage) errors[input.name]=errorMessage;//if the error message is true c, it  will put that error, if not, it will delete it.
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account,errors });
  };

```

Next we will implement the funciton `validatProperty()` up to the `handle Change` method.This will be a simple validation, later we will implement a better and sophistic implementation.

loginForm/loginForm.jsx
```
...
 validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is required";
      //...
    }
    if (name === "password") {
      if (value.trim() === "") return "Password is required";
      //...
    }
  };

```

If we test the aplication, we will see that if we type something in the username input, nothing will happen but if we delte that, an eror will pop up.

##### Form-Joi

To implement validation forms and not use our primitive validation we will use a package named Joi. we will define schema, all their properties and validations `npm i joi-browser@13.4` . This give us a easily schema to map our errors:

loginForm.jsx

```
import Joi from "joi-browser";
...
   schema = {
      username: Joi.string().required(),
      password: Joi.string().required()
    };

    validate = () => {
    const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: false//to put the 2 errors and not abort early
    });
    console.log(result);
```

If we go to the console  we cand we that this returns an object with errors that can be mapped to our message in the next section.

##### Form-Validating a form using joi

First of all we will delete our simple validation that we did earlier and we will substitute the function validate with the message given by `joi`. First we will create a variable to substitute the third  parameter inside the Joi validate function and iterate over all the items inside the error details array and put it inside and object to return it to the user.

loginForm.jsx
```
...
validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);
   
     if (!error) return null;

    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
   }

```

##### Form-Validating a field using joi


Just how we defined the validate for all the form inside the submit, we will define the validateProperty in each required input. We first commit the code we did manually and start defining first an constant object that will compute a property dynamically(only in ES6). Then we will define the schema but only the property that we want, destructuring each error within Joi and return it if there are any errors:

components/loginForm.jsx
```
...

 validateProperty = ({ name, value }) => {

    const obj = { [name]: value }; //computer property jsx6
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

```

##### Form-Disabling the submit button

With a simple implementation, we can disable the submit button:

components/loginForm.jsx

```
...
          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
```

If `validate` returns false, it will not be disable and if it is true c, it will be true the disabled button.

##### Exrtacting a reusable form

We will create a reusable component in the common directory:

common/form.jsx
```
import React, { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value }; //computer property jsx6
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault(); //let's stop this event

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
}

export default Form;

```
And then only extends the component the we made, deleting all the just that we have on login form that should only be in login Form:

```
...
import React, { Component } from "react";
...
class LoginForm extends Form 

```

Now we will test if everything is ok

##### Exrtacting helper rendering methods

First we will extract the render and create a method to extract the button:

common/form.jsx
```
...
 renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
```

Then we will make the same for, what it is like to be redundant part of the code that can be extracted in a method for the form component:

form.jsx
```
...
import Input from "../common/input";
...
  renderInput(name, label) {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
```

And call it those methods in the login form:

components/loginForm.jsx
```
...
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password")}
          {this.renderButton("Login")}

```

Finally to end this chapter we will use the spread operator and the rest attribute that to get all the attributes different than name, label and error:

common/input.jsx

```
...
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>

```

##### Register Form

For this exercise we will make another form: registerForm, it will extends also the Form component and will have another property in the state: `name`, the schema will be almost the same. username will have another property: email and password will have another validation: `min(5)`

```
...
import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = () => {
    //call the server
    console.log("submitted");
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
```

and finally import it in the App.js

App.js

```
...
import RegisterForm from "./components/registerForm";
...
            <Route path="/register" component={RegisterForm} />

```

##### Movie Form

First we  will create a link to a movieform:

movies.jsx

```
...
import { Link } from "react-router-dom";
...

        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <p>There are {totalCount} movies in the database</p>

```

Then create the link:

App.js
```
...
            <Route path="/movies/new" component={MovieForm} />

```

And modify what we have in movieForm. First we call the methods getGenre, getMovie and saveMovie with the usuall components called when creating a form.

movieForm
```
import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";

```

Then we define the state, that includes genres, the data to display and the errors:

movieForm
```
class MovieForm extends Form {
  state = {
    genres: [], //For the purpous of this exercise will get the genres in component did mount
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: {}
  };

```

Then we define the schema that validates the movie parameters:

```
 schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(1)
      .max(10)
      .required()
      .label("Daily Rental Rate")
  };

```

Subsequently we define the component did mount to populate the state if we access from a movie or we access from the new movie, having special care with the not found parameter. We use replace and not push to not have an infinite loop if we have a movie that isn't in the database. Finally if we access within a movie, we define the mapToViewModel that displays the movie details:


movieForm.jsx
```
componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id; //we get the id of the movie selected
    if (movieId === "new") return; //we return an empty form to fill

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found"); //if  we put push it will return the last page with an invalide id
    //we use a method because the object is slighly different
    this.setState({ data: this.mapToViewModel(movie) }); //we show the current movie details
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id, // the movies are high arc
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

```

Posterior from this we define the handleGenreSelect that takes a parameter to change the state. If everything is correct we create the function doSubmit that saves the movie and returns the link to movies. And last but not least, we return the render of the form, we render the inputs, the button and a new class Select that is similar to the renderInput. It important to specify that we could make the display comboBox within the Input but there are others bootstrap inputs that are a lot different from this two and is better to have a different Component.

movieForm.jsx

```
doSubmit = () => {
    saveMovie(this.state.data);

    this.props.history.push("/movies"); //finally we redirect the user to movies
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}
```

Next we review the select component that takes the the genres:

common/select.jsx 
```
import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...rest} className="form-control">
        <option value="" />
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;

```

Next we define the renderSelect in the form component:

common/form.jsx
```

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

```
And finally we correct the saveMovie method that has 2 bugs: first, instead of name it title and when defining the id, to edit the _id we have to define the method toString

service/fakeMovieService.js
```
export function saveMovie(movie) {
  let movieInDb = movies.find(m => m._id === movie._id) || {};
  movieInDb.title = movie.title; //is not name, is title
  movieInDb.genre = genresAPI.genres.find(g => g._id === movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    movieInDb._id = Date.now().toString(); //with this we can edit the movies
    movies.push(movieInDb);
  }

  return movieInDb;
}
```

##### Search Movies exercies

For this exercise we will implement a search bar. It will reset the genre filter and if the user clicks the genre filter, it will reset the search bar.
When dealing with controlled components we cannot use null.

First we will create the searchBox component that takes a value to filter and raises an event when it changes:

common/searchBox.jsx

```
import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3" //margin y
      placeholder="Search..."
      value={value}
      onChange={e => onChange(e.currentTarget.value)} //we raise an event with the value
    />
  );
};

export default SearchBox;


```

Then we import that component in movies. First we create the state the searchQuery parameter that is a string because it is a controlled component. Also we add the selectedGenre that is easier to see that is initialize with null. Next we change the parameters within the `handleGenreSelect` method and create the `handleSearch` method.Posterior to that we modify the getPageData to accept the genre filtered or the searchBox filtered. Finally we call the searchBox component with the value to search and with the method raised.

```
import SearchBox from "../common/searchBox";
...
 state = {
    movies: [], //until I use lifehooks, this will be the way I will set the state
    genres: [], //For the purpous of this exercise will get the genres in component did mount
    currentPage: 1, //current page in the pagination
    pageSize: 4, //number of pages displayed
    searchQuery: "",
    selectedGenre: null, //for make it easier to understand what is happening
    sortColumn: { path: "title", order: "asc" } //column sorted
  };
...
 handleGenreSelect = genre => {
    //console.log(genre);
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
...
getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies
    } = this.state;

  

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize); //if count is not 0 we will create an array of movies

    return { totalCount: filtered.length, data: movies };
  };
  ...
  <SearchBox value={searchQuery} onChange={this.handleSearch} />
```

#### Calling backend services


For this we will start from the directory `http-app` and click `npm i` and if we run the app `npm start` we  will see a simple application with a button to add a post and a list of post to edit.

##### JSON Placeholder

For now we will make a fake rest api with [jsonplaceholder](https://jsonplaceholder.typicode.com).We will access the endpoint [post](https://jsonplaceholder.typicode.com/posts). With this we will make CRUD operations(create,read,update and delete).

##### Http Clients

for this section we will use axios for handle http request. There are other options like native fetch api and ajax. Let install it: `npm i axios@0.18`


##### Getting Data
After installing axios we will continue with the backend. We will get the list of post from the backend. First we will import axios and with the snippet `cdm` we will invoke the `componentDidMount()` method.
With this we will call the end point mentioned before in Json placeholder. This will be store in a promise, an asynchronous call that will be completed in the future because of a delay.

If we reload the page, and we do a console.log on the promise, it will have 2 poslbe states: success or failure. When loading it will have the state of pending. It has 2 properties, promisestatus and promiseValue  that has the respond of the post.

For a  function to receive a promise, it has to have the async word and the const that has the promise has to have await. With object desctructuring, we can get data, rename it posts and store it in the posts object in the state:

App.js
```
...
import axios from "axios";
...
  async componentDidMount() {
    //pending > resolved (success) or rejected (failure)
    const { data: posts } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    this.setState({ posts });
  }
``` 

##### Creating Data

Now we will handle the post method to create fictional data. First we will create a global variable to handle the api and call it multiple times. Then we will modify our handleAdd method to fixedly add an object.

App.js

```
...
const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";
...
 async componentDidMount() {
    //pending > resolved (success) or rejected (failure)
    const { data: posts } = await axios.get(apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await axios.post(apiEndpoint, obj);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

```

##### Lifecycle of a request

When we click new, we can go to the network tab to see there are are 2 posts objects, one has the options request method and the other one has the post string. options is render when the host and the api are in 2 different domains for security reasons. For the second request method `POST`  has a status of 201 `object was created` and if we scroll down, we can see there is a request payload that has the body properties and title. If we go to response we can see our data and a fake id. Axios wrap that object in a response object that has properties like the data and the header.

##### Updating data

When updating an object we can select 2 methods within axios: put and patch. Put receives an entire object and patch can modify specific properties inside an object:

example
```

handleUpdate = post => {
    post.title = "UPDATED";
    axios.put(apiEndpoint + '/' + post.id, post);
    axios.patch(apiEndpoint + '/' + post.id, {title:post, title });
  };
```

For now we only need put and with a fixed title we will change the post and update the state:

App.js
```
...
 handleUpdate = async post => {
    post.title = "UPDATED";
    await axios.put(apiEndpoint + "/" + post.id, post);

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };

```

##### Delete data

Now we will delete the data with the delete method. It doesn't need the body of the post:

App.js
```
 handleDelete = async post => {
    await axios.delete(apiEndpoint + "/" + post.id);
    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });
  };

```

##### Optimistic vs Pessimistic updates 

When updating the api,something might be wrong so we need to change what we were trying. Also we can update the state of react and if the call to the server fails we can get the original state and substitute it if something fails. With this we give the user a sensation of a fast application.

App.js
```

handleDelete = async post => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });
    try {
      await axios.delete(apiEndpoint + "/" + post.id);
      throw new Error("");
    } catch (ex) {
      alert("Something failed while delting a post !");
      this.setState({ posts: originalPosts });
    }
  };


```

##### Expected vs Unexpected errors

Expected errors are the ones the client is responsible, like 404 or 400: submit with a invalidate data. but if an error is unexpected:network down, server down, db down, bug. We need to treat it different. If a user has multiple tabs and in one a post exist, it should be printed the error as the post has already been deleted and we don't need to log it.

App.js

```
...

catch (ex) {

      //ex.request
      //ex.response
 

      if (ex.response && ex.response.status === 404)
        alert('This post  has already been deleted.');
      else {
        console.log('Loggin the error', ex);
        alert("An unexpected error ocurred..");
      }
   
      this.setState({ posts: originalPosts });
    }

```

To simulate a client error:`await axios.delete(apiEndpoint + "/999" + post.id);`.And to simulate an unexpected error `await axios.delete('s'+apiEndpoint + "/" + post.id);`


##### Handling Unexpected errors globally

We need the handle error in all our handlers. We need an intercepter in axios. We can handle that  error in one place We first create an example in the global:

App.js
```
...
axios.interceptors.response.use(null, error => {
  console.log("Interceptor called");

  return Promise.reject(error);
});
...

  try {
      await axios.delete(apiEndpoint + "/999" + post.id);
      throw new Error("");
    } catch (ex) {
catch (ex) {
      //ex.request
      //ex.response

      console.log("Handle delete catch block");

```

If we try to  delete an observation that isn't in the db, we catch an error first with the interceptor and then it is log the handle delete block.
Now we can entirely give the manipulation of the error to the interceptor. If an unexpected error occurs, it will show the message:

App.js
```
...
axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response && error.response.status >= 400 && error.response < 500;
  if (!expectedError) {
    console.log("Loggin the error", error);
    alert("An unexpected error ocurred.");
  }
  return Promise.reject(error);
});
...
    try {
      await axios.delete(apiEndpoint + "/hola/s" + post.id);
      throw new Error("");
    } catch (ex) {
      //ex.request
      //ex.response

      if (ex.response && ex.response.status === 404)
        alert("This post  has already been deleted.");

      this.setState({ posts: originalPosts });
    }

```

With this we can view the alert popped by the catch response status 404. And if we put an unexpected error:

```
await axios.delete("a" + apiEndpoint + post.id);

```

axios will render the unexpected error catched by the interceptor and print the log

##### Extracting a reusable Http service


Now we will hide the axios http because the App.js only should have to deal  with routing. So we will create an httpService with the axios interceptors:

services/httpService.js
```
import axios from "axios";

//axios.interceptors.response.use(success,error)//for  now we only want intercept errors
axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log("Loggin the error", error);
    alert("An unexpected error ocurred.");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};

```

Now we mask the axios properties into the export default and change the axios word places with http:

App.js
```
...
import http from "./services/httpService";
...
const { data: posts } = await http.get(apiEndpoint);
...
const { data: post } = await http.post(apiEndpoint, obj);
...
await http.put(apiEndpoint + "/" + post.id, post);
...
await http.delete("a" + apiEndpoint + post.id);

```

##### Extracting a Config Module

We need to have a config file to spare the ugliness of hardcoding the apiEndpoint. So we will create a config file:

src/config.js
```
{
  "apiEndpoint": "https://jsonplaceholder.typicode.com/posts"
}


```

Now we delete the const apiEndpoint from App.js and include the config file substituting the apiEndpoint constants (cmd+d):

App.js

```
...
import config from './config.json';
...
const { data: posts } = await http.get(config.apiEndpoint);
...
const { data: post } = await http.post(config.apiEndpoint, obj);
...
await http.put(config.apiEndpoint + "/" + post.id, post);
...
await http.delete("a" + config.apiEndpoint + post.id);
```

##### Displaying Toast Notifications

First we will install: `npm i react-toastify@4.1`. This will display beautiful error, success,info message instead of the simple alert. First in the app we will import it and make the alert:

App.js
```
...
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
...
 <ToastContainer />
```  

Then we will manage the catch error and display the message:

httpService.js
```
import { toast } from "react-toastify";
...
  if (!expectedError) {
    console.log("Loggin the error", error);
    toast.error("An unexpected error ocurred.");
    //toast.success toast.info or only toast
  }

```

toast is a function that can also be called an a different style will be display if we call it as: toas, toasti.info, toast.success.

##### Logging Errors

We will install sentry logging service `npm i raven-js@3.26.4`. As the time I'm writing this, raven isn't capturing the events on sentry. This is because sentry unify versions and raven isn't capturing unexpected errors. It only capture a crashing error. 

Never the less, As mentioned in the video we first need to install the configuration of Raven:

index.js
```
import Raven from "raven.js";
...
Raven.config("https://a4e156684c9c45e7b18707b95edccccd@sentry.io/1400997", {
  release: "1-0-0",
  enviroment: "development-test"
}).install();

``` 
The capture the error:

httpService.js
```
...
import Raven from "raven-js";
...
 if (!expectedError) {
    //console.log("Loggin the error", error);
    Raven.captureException(error);
    toast.error("An unexpected error ocurred.");

  }

```

And then go to the project on sentry and theoretically view the error in the project defined by me.

To handle this error I will install `npm i @sentry/browser` that seems to be the unified version of sentry for handling errors. I still doesn't have the response from sentry.


##### Extracting a Logger Service

We will extract all the logic of the logger service because it might change ,as how it happen, or we would prefered to change the library. So we will create this:

/services/logService.js

```
import * as Sentry from "@sentry/browser";
//import Raven from "raven-js";
function init() {
  // Raven.config("https://a4e156684c9c45e7b18707b95edccccd@sentry.io/1400997", {
  //   release: "1-0-0",
  //   enviroment: "development-test"
  // }).install();

  Sentry.init({
    dsn: "https://a4e156684c9c45e7b18707b95edccccd@sentry.io/1400997",
    release: "1-0-0",
    enviroment: "development-test"
  });
}

function log(error) {
  // Raven.captureException(error);
  Sentry.captureException(error);
}

export default {
  init,
  log
};

```

and change the reference from index.js and httpService.js

index.js
```
import logger from "/services/logService";
...
logger.init();

```

httpService.js
```
import logger from "/services/logService";
...
logger.log(error);
```

After all, one day after. It seems that the sentry did capture the error as a network error just as expected. The only questions that lefts is if raven or sentry/browser made it.

##### Vidly Backend

First we will install or update brew `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"` 

Then we will install mongodb from brew: `brew install mongodb`. Then we will create a directory to store its data. 
Lets create the directory where mongodb stores its data: ` mkdir -p /data/db`. 
If it asks for permisions, we can otorgate them: `sudo mkdir -p /data/db`.
Then we will write the right permision to write: sudo chown -R `id -un` /data/db. 
After that we will run mongodemon: `mongod`.Now mongodemon will wait for conexions on port 27017. 

Then we will install a client to connect to mongodb: `https://www.mongodb.com/download-center/compass?jmp=hero` This will give us a dmg to install the app of compass mongodb.

#### Setting up the node backend

We go to github and clone the repository: `git clone https://github.com/mosh-hamedani/vidly-api-node.git` right next to the vidly application. 
Next enter to the folder just created and install dependencies: `npm i` 
Next we need to populate our database with sample data: `node seed.js`
After that we will initialize our node server: `node index.js`

The we can visit `http://localhost:3900/api/movies` and `http://localhost:3900/api/genres` to visit the api of movies and genres. This api can handle create, update and delete movies.

#### Disabling Authentication 

We will test the api given by the node backend, for this we will install the chrome addon `postman`. After authenticating we will test the get with the next url, after running it with the node backend: `http://localhost:3900/api/movies`:

```
...
{
        "_id": "5c7620219728822ec16ed359",
        "title": "Airplane",
        "numberInStock": 5,
        "dailyRentalRate": 2,
        "genre": {
            "_id": "5c7620219728822ec16ed358",
            "name": "Comedy"
        }
    }
```

The we will test the post end point. In postman we will change to Post, check the raw in the body tab and change to json (application/json) from the combolist. then we will enter the next json object:

```
{
  "title": "A new movie",
  "numberInStock": 1,
  "dailyRentalRate": 2,
  "genreId":"5c7620219728822ec16ed358"
}

```

This will be created in mongodb. For now we don't have to worry about authentication because in /config/default.json we see that requiresAut paramater is started in false, but this wouldn't be wanting in production. This will generate the next object in body of postman:

```
...
{
    "_id": "5c776d3d79f5ff029446663b",
    "title": "A new movie",
    "genre": {
        "_id": "5c7620219728822ec16ed358",
        "name": "Comedy"
    },
    "numberInStock": 1,
    "dailyRentalRate": 2,
    "__v": 0
}
```

#### Connect Movies Page to the Backend

We will create a module to make little changes within our movies component and replace fakeMovie services with a real Movie services. For this we will import httpService.js and logService.js from the http-app source services files. Then we will import the dependencies: axios and toastify `npm i axios@0.18.0 react-toastify@4.1.0`. To make sure toast work we need to add a Toast Component:

app.js

```
...
import { ToastContainer } from "react-toastify";
...
import "react-toastify/dist/ReactToastify.css";
...
      <React.Fragment>
        <ToastContainer />
        <NavBar />

```

For now we will comment the Raven and Sentry capture exception and only print in the console the posible errors that might happen in the future.

logService.js
```
function init() {
  
}

function log(error) {
  console.error(error);

}

export default {
  init,
  log
};
```

#### Replacing fakeGenreService

First we will small changes and start with the movies.jsx imported libraries:
First we will create in services our genreService that has the same interface like the fakeGenreService:

/services/fakeGenreService.js

```
...
import http from './httpService';

export function getGenres() {
   return  http.get('http://localhost:3900/api/genres');
  }
...
```
The route should be in a config file, but for now we will deal with it in this script for simplicity.

Then we will go to the movies.jsx and modify the importation of the library and change the getGenres() method because it is expecting a promise:

```
...
import { getGenres } from "../services/genreService";
...
  async componentDidMount() {
    const {data} = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({ movies: getMovies(), genres });
  }

```

Next if we run the server we will see that the genres are selected from the api. Next we will deal with a real movie service.

#### Replacing fakeMovieService

First we will create our moviesService.js that can call the movies and delete them:

services/movieServices.js
```
import http from "./httpService";

const apiEndpoint = "http://localhost:3900/api/movies";
export function getMovies() {
  return http.get(apiEndpoint);
}

export function deleteMovie(movieId) {
  //always put attention to the return statement, because of the toast mesage didnt got out
  return http.delete(apiEndpoint + "/" + movieId);
}


```

Then in movies.js we will import these  modified functions and change to async methods when needed. One important note to add is in handleDelete we implemented it before with optimistic change and we should keep a copy of the previous state to change it if needed:

movies.jsx

```
...
import { getMovies, deleteMovie } from "../services/movieService";

...
  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

...
 handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    //in modern javascript when we have this repetition, we can leave only the movie
    //this.setState({ movies: movies });
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted.");
      console.log("entre al error");
      this.setState({ movies: originalMovies });
    }
  };

```

#### Extracting a Config File


To get rid of the uggly hardcoded route of genreService and movieService, we will create a config.json file that has the route of the api:

config.json
```
{
  "apiUrl": "http://localhost:3900/api"
}

```

Then we will used object destructuring to access this attribute and call the apiUrl:

movieService.js

```
...
import { apiUrl } from "../config.json";

//const apiEndpoint = "http://localhost:3900/api/movies";
const apiEndpoint = apiUrl + "/movies";
```

genreService.js

```
...
import { apiUrl } from "../config.json";
...
  //return http.get("http://localhost:3900/api/genres");
  return http.get(apiUrl + "/genres");

```

#### Populating the form

Now we will go to the movieService and create the methods to getMovie:

movieService.js
```
...

export function getMovie(movieId) {
  return http.get(apiEndpoint + "/" + movieId);
}

```

Now we will change the movieForm to handle this services:

```
...
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";
...
async componentDidMount() {
    const { data: genres } = await getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id; //we get the id of the movie selected
    if (movieId === "new") return; //we return an empty form to fill

    try {
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) }); //we show the current movie details
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
      //if (!movie) return this.props.history.replace("/not-found"); //if  we put push it will return the last page with an invalide id
    }
  }

  We change the wait and async methods and change the handle error with a try catch error for the status 404.Before.


```

#### Refactoring the componentDidMount

To make the code a little more readable, we will create 2 methods: `populateGenres` and `populateMovie`. This will be called inside the `componentDidMount`:

movieForm.js

```
async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id; //we get the id of the movie selected
      if (movieId === "new") return; //we return an empty form to fill

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) }); //we show the current movie details
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
      //if (!movie) return this.props.history.replace("/not-found"); //if  we put push it will return the last page with an invalide id
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }
```

#### Saving the form

Now we will deal with te saving the movie and have to deal with 2 scenarios: existing movie and new movie. If the movie already exists, we will create a copy of the existing movie and delete it id because it is an error if we try to modify the id, the id most be unique; otherwise, we need to  create a movie and only create it.

movieService.js
```
export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(apiEndpoint + "/" + movie._id, body);
  } else {
    return http.post(apiEndpoint, movie);
  }

```

Then we will include await and async to the movieForm to deal with the api:

movieForm.js
```
doSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.history.push("/movies"); //finally we redirect the user to movies
  };
```

#### Refactoring the movieUrl

In movieService we can see there is a repetitive set of instructions, the apiEndpoint plus the movieId. So we will create a function to deal with this:

movieService.js
```
...
function MovieUrl(id){
  return `${apiEndpoint}/{id}`;//template numerals in EG6
  //return "apiEndpoint +'/'+id;";//less elegant solution
  
}

...
export function deleteMovie(movieId) {
  return http.delete(MovieUrl(movieId));
}

export function getMovie(movieId) {
  return http.get(MovieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(MovieUrl(movie._id), body);
  } else {
    return http.post(apiEndpoint, movie);
  }

```

It is important to note that we can select one word and change all occurrences of it if we click `F2`

### Authentication and Authorization

#### Registering a new user

To view the test api for register user we can go to the postman app and put the link to this route: `http:/localhost:3900/api/users` then click the post and with raw selected, enter the next text:

```
{
  "email":"user1@domain.com",
  "password":"123456",
  "name": "Sam"
}
``` 

If we send this information with the backend running we can see that we receive  the _id, name and email with a status 200. If we post the same information, now we receive a status 400 'bad request' with a text user already registered.

#### Submitting the registration form

Now we will create a userService for dealing with new users:

services/userService.js

```
import http from "./httpService";
import { apiUrl } from "../config.json";

//const apiEndpoint = "http://localhost:3900/api/movies";

const apiEndpoint = apiUrl + "/users";

export function register(user) {
  http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
```

Then in register form we will call this methods from another perspective and deal with the api:

```
...
import * as userService from "../services/userService";
...
 doSubmit = async () => {
    //call the server
    //console.log("submitted");
    return await userService.register(this.state.data);
  };

```

For now nothing happens but if we go to the db, we can see that the user succesfully was created.


#### Handling registration errors

Now we will deal as the previous  section, with errors. In this case with errors made by the client:

registerForm.js
```
...
 doSubmit = async () => {
    try{
      await userService.register(this.state.data);
    }
    catch (ex){
      if(ex.response && ex.response.status==400)
        const errors ={...this.state.errors};
        errors.username=ex.response.data;
        this.setState({errors});
    }
  };
```

#### Logging in a user

If we return to postman and now use the endpoint: http://localhost:3900/api/auth. It expects an email and a password and if it is registered in the db, it will return a web token, an identification card to reach the valids routes:

postman>body
```
{
  "email":"user1@domain.com",
  "password":"123456"
}

```

#### Submitting the login form

Just as the registration, we will create a authService:

services/authService.js
```
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth";

export function login(email, password) {
  return http.post(apiEndpoint, { email, password });
}

```

Next we will go to the loginForm, import this service and change the do submit method:

loginForm.js
```
 doSubmit = async () => {
    //call the server
    //console.log("submited");
    const { data } = this.state;
    await login(data.username, data.password);
  };

```

For now we cannot check visually in the app that the user logged in, but the next section we will deal with those errors.


#### Handling login errors

Just as the registerForm, we will put the doSubmint in a try catch error:

loginForm.js
```
...
 doSubmit = async () => {
    //call the server
    //console.log("submited");
    try {
      const { data } = this.state;
      await login(data.username, data.password);
    } catch (ex) {
      if (ex.response && ex.response.status == 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };
```

#### Storing the JWT

Now we will store the web token in the small database that has web navigators. So in loginForm we will store it and redirect to the movies:

loginForm.jsx
```
  doSubmit = async () => {
    //call the server
    //console.log("submited");
    try {
      const { data } = this.state;
      const { data: jwt } = await login(data.username, data.password);
      localStorage.setItem("token", jwt);
      this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

```

Now if we go the the Application tab in chrome>Storage>localhost: we will see our web token key to navigate through all the app.

#### Logging the user upon registration

First of all we need to clarify that when we were making the userService.js, we forgot to return the promise, we only register the user but didn't return any data to interact with the front end.

Now if we go to postman, we can see that when registering a user, in the header, it is return a custom header: 'x-auth-token' that Mosh made to demostrate how to pass data in the header. We need to make an little modification in the backend to make visible the header:

vidley-api-node/routers/user.js
```
...
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "email"]));
});

```

We expose the header and then in the registerform, now we can access this header and store this token in the database:

registerForm.jsx
```
  doSubmit = async () => {
    //call the server
    //console.log("submitted");
    try {
      const response = await userService.register(this.state.data);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };
```

Now we can test the application and see that it redirects to the homepage and ind the local Storage the token is made.

#### JSON Web Tokens (JWT)

Previously we talked about jwt. If we go to htts://jwt.io, we will see an introduction of what are them. To briefly clarify, they are credentials generated by the server with unique atributes of the user: header, payload and verify signature. Next we will take this jwt stored in the page database.

#### Getting the current user

For this section we will need to decode the token and install the next package`npm i jwt-decode@2.2.0`. So we will create a state in App.js and in componentDidMount log the current user after login it:

App.js
```
...
import jwtDecode from "jwt-decode";
...

  state = {};

  componentDidMount() {
    const jwt = localStorage.getItem("token");
    const user = jwtDecode(jwt);
    console.log(user);
  }

```

If we run the server we will see the information of the user. Now we cant give this user to other objects and if the user isn't loggin our app will crash if we don't wrap our function in a try catch block. Currently we won't anything yet, so we will catch an empty exception:

App.js
```
...
  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (ex) {}
  }
...
 <NavBar user={this.state.user} />
```

Now we can pass the user information to the page.


#### Displaying the current user on NavBar

Now that we have the information of the user in the navBar, we will call it in the navBar and dinamically render the login and register if the user isn't logged in and display the name and a logout button if the user is logged in. Those navlinks need to be wrapped inside a react.fragment because of jsx expressions must have a parent:

navBar.jsx
```
...
const NavBar = ({ user }) => {
...
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/profile">
                {user.name}
              </NavLink>
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}

```

Now we have to make a little modification inside the loginForma and registerForm because if the user logged in, we would need to reload the page to redirect to the  page where we can see the user page. With the modification, the reloaded is made in those scripts:

loginForm.js
```
...
    //this.props.history.push("/");
      window.location = "/";

```

registerForm.js
```
...
     //this.props.history.push("/");
      window.location = "/";

```

#### Logging out a User

For a strange reason when making the first changes, I encounter a compiling error that made the page to not render, it was the cached trying to get the token. It seems that deleting the token fixed it.

This component was pretty easy, it just reloaded the page and deleted the token:

components/logout.js
```
import { Component } from "react";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("token");
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default Logout;

```

Now in the App we create this route:

App.js
```
...
import Logout from "./components/logout";
...
<Route path="/logout" component={Logout} />

```

#### Refactoring

The log in credential should be abstracted  in a separated modules, so we will unify the key and not have it in multiple places. So we will complete our authServices an create multiple functions to deal with tokens within registerform, loginform, app.jss and logout.js

services/authServices.js
```
import jwtDecode from "jwt-decode";
...
const tokenKey = "token";
export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser
};

```

The we will change the call of this functions on the components, starting on the registerForm, only passing the user token:

registerForm.js
```
...
import auth from "../services/authService";
...

      //localStorage.setItem("token", response.headers["x-auth-token"]);
      auth.loginWithJwt(response.headers["x-auth-token"]); 
```


Then the loginForm.js

```
import auth from "../services/authService";
...
      //localStorage.setItem("token", jwt);
      await auth.login(data.username, data.password);

```
Then the App.js

```
//import jwtDecode from "jwt-decode";
import auth from "./services/authService";
...

<!--     try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (ex) {} -->
const user = auth.getCurrentUser();
```

and last but not least

```
...
import auth from "../services/authService";
...
    //  localStorage.removeItem("token");
    auth.logout();
```


#### Calling protected api endpoints

First in the proyect where the api stands we will change the authorization:

vidly-api/default.json
```
{
  "jwtPrivateKey": "unsecureKey",
  "db": "mongodb://localhost/vidly",
  "port": "3900",
  "requiresAuth": true
}
```

Now if we try to edit a movie, it will have an status of 401: unauthorized. This can be seen also in the network. We neet to pass the valid token so in authService we will create a function to pass this token:

authService.js
```
export function getJwt() {
  return localStorage.getItem(tokenKey);
}
...
export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};

```

Use it and import it in the httpService:

```
...
import auth from "authService";

//as common, post can be used to send information in the header of http post
axios.defaults.headers.common["x-auth-token"] = auth.getJwt();
```

Now if the user is log in, it will create the movie and if it is not logged in, it will respond with a bad request.

#### Fixing bi-directional dependencies

We need to delete bidireccional in the http service with the auth service. Our auth module doesn't need to have a reference from the http service, so instead of geting jwt, we shoud set it in the http Service:

httpService.js

```
...
export function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};

```

and change the authService.js

```
...
http.setJwt(getJwt());
```

#### Authorization

If we try to delete a movie, nothing happens. If we see the network, we will see that is forbidden by the back-end only for admin. So we will change some user information to make it admin. We go to a user like user9@domain.com and add a new property: isAdmin and make it true modifying it to a boolean.

If we try to delete a movie, it wont be deleted. If we go to jwt.io and decode the jwt we can see that the payload doesn't have the admin property. If we log out and log in, it should have the payload with the property is admin and be available to delete it. 

#### Showing or hiding elements based on the user

If a user isn't logged in, it would  be nice to hide the button to add some user or to hide the highlight of a movie tittle.

For this we will  pass the user to the movies route with  props:

App.js
```
...
           <Route
              path="/movies"
              render={props => <Movies {...props} user={this.state.user} />}
            />
```

Then in the movies we will conditional render the add new movie:

movies.jsx
```
...
        <div className="col">
          {user && (
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
          )}
...

```
#### Protecting routes

Now we will protect the movie form if a user want to go to the route.
So we will go to the App.js and conditional rendering if the user is logged in:

App.js
```
...
render(){
    const { user } = this.state;
...
            <Route
              path="/movies/:id"
              render={props => {
                if (!user) return <Redirect to="/login" />;
                return <MovieForm {...props} />;
              }}
            />
...
}

```

Now if the user tries to go to a route, it will be redirected to the login form. This solution isn't as scalable so next we will use a redirect component

Also to complete the exercise we will conditional render the titles of the names if the user is logged in. So first we will pass the user to the Movies table:

movies.jsx

```
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            user={user}
          />
```

Then in moviesTables we will change the content of the movie. If the user is logged in, we will only render the title and if it is logged in, we will render the link:

moviesTable.jsx
```
...
      content: movie => {
        if (!this.props.user) return <p>{movie.title}</p>;
        return <Link to={`/movies/${movie._id}`}>{movie.title} </Link>;
      }
    }

```

#### Extracting protectedRoute

Now we will extract the logic of protected routes. 

protectedRoute.jsx
```
import React from "react";
import auth from "../services/authService";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      //path={path}//with the reest operator we will take the path
      {...rest}
      render={props => {
        if (!auth.getCurrentUser()) return <Redirect to="/login" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
```

And then use it int the main app

App.js
```
           <Route
              path="/movies"
              render={props => <Movies {...props} user={this.state.user} />}
            />
```

#### Redirecting after Login

First we will coment the line that renders the title of the movie if the user isn't logged in.

moviesTable.jsx
```
content: movie => {
        //if (!this.props.user) return <p>{movie.title}</p>;
        return <Link to={`/movies/${movie._id}`}>{movie.title} </Link>;
      }

```

Then if we try to modify a movie, it will redirect to the login page. And if we log in, we will be redirected to the movies instead of move to the page that we were.

The we go to the protectedRoute component and if we check the documentation of react, we can see that there are two forms to redirect the user: one is with a simple text, as we have done earlier; and second with an object.

so we will change our protectedRoute.jsx

```
...
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );

```

With this we can change our loginForm and if the user is logging in without changing a movie, it will be send directly to the movies.

loginForm.jsx
```
render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
```

#### Hiding the delete column

If the user is logged in and is an admin, he should be capable of deleting a movie.

In the exercice made by mosh, it explicity hide a column and I hide the button. A slidly different aproach. So for now we will get our implementation

moviesTable.jsx
```
key: "delete",
      content: movie => {
        if (this.props.user && this.props.user.isAdmin)
          return (
            <button
              onClick={() => this.props.onDelete(movie)}
              className="btn btn-danger btn-sm ml-2"
            >
              Delete
            </button>
          );
        return null;
      }
    }

```

As we see, we only need to pass the user and the user by props. But another aproach is to import it with user authentication without having to deal with pasing it by props.

moviesTable.jsx
```
...
import auth from "../services/authService";
...
 deleteColumn = {
    key: "delete",
    content: movie => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        delete
      </button>
    )
  };
  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

```

We create an object to avoid polluting our constructor that will inherate methods and we will push the column if the user is true c and is an admin.

### Deployment

#### Enviroment Variables

In config.json we use it to get the apiUrl.  We will crate a config por development and deployment. First we will talk about enviroment variables that during compilation will take the string literal  from the config file.In the root we will create the next file:

.env.development
```
REACT_APP_NAME=Vidly in Dev
REACT_APP_VERSION=1
```

In App.js we will print in the console `console.log(process.env)`. This will print the environment variables in the current process. Node_Env has the name development and at the end we will see the variables created.

Now we will change the print to `console.log("SUPERMAN",process.env.REACT_APP_NAME)`. Now in the console we will see the superman string and  if we search in the bundle.js, we will se the actual value of that environment variable. In the build time all the environment variables will change with the actual value

#### Production Builds

In the console, when we are ready to build our app we will run in the console `npm run build`, this will create an optimized production build. This will take some time.

Now in the project, we can send the build production. To test it in the machine we can install a simple light weight server `npm i -g serve`. With this we can serve the content of the build project.Now we can serve the project: `serve -s build`. It will be in localhost port 5000. If we open the console. Superman is undifine because we didn't put the enviroment of react app name, only in production. We need to add enviroment variables in production.

#### Getting started with Heroku

Now we will deploy our vidly app. First we create an accout from heroku and then install the heroku cli. If you have mac in your machine: `brew install heroku/brew/heroku`. It failed and suggested to install `xcode-select --install` to install the developer for xcode. With this, it started installing heroku.

Now we can run `heroku -v` to see the version of heroku installed. At the time being, I have 'heroku/7.22.9 darwin-x64 node-v11.10.1' version.

Now we will login:`heroku login` it will open a web-browser loggin and we will have to enter our credentials.

If we are behind a firewall we need to set an eviromet variable, in windows we use set and in mac export: `export HTTP_PROXY=http:proxy.server.com:1234`.
If everything is ok, we can use heroku.

#### MongoDB on the cloud

We will create a mLab cloud that has a fantastic free plan.For now, mongodb atlas was redirected because mongo bought mlab. Because of this I had to create an accout. Then create a user and then add the ip adress that will have acess to the database. This steps were preatty simple. Also I used the freeplan M0 listed from mongodb atlas. Then the last step is to conect to the cluster. It seems that there are 3 forms to conect: shell, connection with app and mongoDB compass.

#### Deploying to heroku

We will create a unique heroku name and leave to heroku chose the name because there would be different names for this apps in the cloud. This we will create it in the vidley-api-node `heroku create`

For me it created the name `polar-retreat-108596`. Our front end should make request to the url the link posted by heroku. Also, we can see the address of a heroku git repository. To upload this code from our local machine, we will use: `git push heroku master`. When we created the heroku app, a git remote was url was added. So we will push that code to heroku. It had an error. For now I will let from here

It seems that if  in the package.json file we add the node version just as mention in the next [link](https://help.heroku.com/6235QYN4/why-is-my-node-js-build-failing-because-of-no-matching-node-versions), the compilation succeed.

package.json
```
...
    "engines": {
    "node": "8.10.0"
  },

``` 
.
Nex we can type in the terminal `heroku open` and a web page will open with an error that we will deal in the next section

#### Viewing logs

In heroku we can view the logs but it is better to use  `heroku logs` and we can see why  our aplication failed.  We need to go to default folder and set the adress the db adres on our mongodb database in mongodb atlas. For not having to store public keys we will define enviroment variables from the terminal

#### Setting environment variables on heroku

First we will add to the whitelist the next ip as suggested by the [forum](https://forum.codewithmosh.com/d/404-help-me-with-this-mongodb-error-log-in-heroku/40).
We will store this as an evironment variable on terminal. So in mongodb atlas we go to conection an pick the version 2.2.12 that will put a string as the next one:

```
mongodb://vidlyUser:<password>@XXXXX
```
We need to change the password for the one we defined for the vidleyUser and in the terminal put:

```
heroku config:set vidly_db="mongodb://vidlyUser:<password>@XXXXX"

```

Don't forget the quotes because it is a string.
Then in the custom-enviroment-variables.json in the back en we will include the db  variable:

```
{
  "jwtPrivateKey": "vidly_jwtPrivateKey",
  "db": "vidly_db"
}

```

So now our back end will have the variable that we defined in the terminal.
If we edited, we need to add it and push it inside heroku: `git push heroku master`

With this we can access the url created with heroku before and navigate to the [url](https://polar-retreat-10896.herokuapp.com/api/genres). For now it will be empty because we haven't populate it

#### Preparing the front-end for deployment

First we need to create an eviroment for production, so in the root we will create .env.production:

```
REACT_APP_API_URL=https://polar-retreat-10896.herokuapp.com/api
```

and modify our .env.development if we need to test something:

.env.development
```
REACT_APP_API_URL=http://localhost:3900/api
```

Next in authService.js, genreService.js,movieService.js and userService.js we will modify the config.json to access to the url:

```
////import { apiUrl } from "../config.json";
const apiEndpoint = "/auth";
```

And in httpService we will get the default base url from the react_app_api_url defined before.

Finally we will build our app: `npm run build` and serve it `serve -s build`.
Now we can access to the react aplication that has access to the heroku backend.

Now we can see that if there are no movies, a message no movies were added is display. We will change that:

movies.jsx
```
//if (count === 0) return <p>There are no movies</p>; 

```

Then we will build again our app and serve it.

If we can see, our database is empty, so we will use the conection from mongodb compass to access to mongodb atlas an manually create some genres that cannot be created in the app: Comedy, Thriller,Drama and Action.

Now if we go reload, we can see those genres.

#### Deploying the front-end

For the front end we will create a heroku app  so in the console:

```
heroku create --buildpack mars/create-react-app
```

This will create the app and get ready to deploy it on heroku.
Now we will push it to heroku: `git push heroku master` . It will push the code and install the node modules needed for the app and finally open the page `heroku open` and the app will open in the next [link](https://stark-oasis-52125.herokuapp.com/movies)