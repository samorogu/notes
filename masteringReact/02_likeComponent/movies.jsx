import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "../common/like";
class Movies extends Component {
  state = {
    movies: getMovies() //until I use lifehooks, this will be the way I will set the state
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    //in modern javascript when we have this repetition, we can leave only the movie
    //this.setState({ movies: movies });
    this.setState({ movies });
  };
  //this approach is correct but not quite if we dont want to render the table also
  /*
  moviesCount() {
    const { length: count } = this.state.movies; //object destructuring

    let moviesText = "The total number of movies is ";
    count !== 0 ? (moviesText += count) : (moviesText = "There are no movies ");
    return moviesText;
  }
  */

  handleLike = movie => {
    //console.log("movie liked", movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  render() {
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
              <th />
              <th />
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
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />
                </td>
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
    );
  }
}

export default Movies;
