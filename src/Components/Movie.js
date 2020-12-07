import React from 'react';

function Movie(props) {

    const IMG_API = "https://image.tmdb.org/t/p/w500/"

    function handleMovieClick () {
        props.submitMovieClick(props.id)
    }

    return (
        <div className="movie">
        <img onClick={handleMovieClick} src={props.poster_path ? IMG_API + props.poster_path : "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1040&q=80"} alt={props.title} />
            <div className="movie-info">
                <h3>{props.title || props.name}</h3>
            </div> 
        </div>
    );
}

export default Movie;