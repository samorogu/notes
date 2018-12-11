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