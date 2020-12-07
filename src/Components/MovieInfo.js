import React from 'react';

function MovieInfo(props) {

    const INFO_URL = "https://www.themoviedb.org/movie/"
    const IMG_API = "https://image.tmdb.org/t/p/w500/"

    function handleBack () {
        props.submitBack(); 
    }

    return (
        <div>
        {props.runtime ? 
        <div className="movie-details-container">     
            <div className="left-div">
                <img src={props.poster_path ? IMG_API + props.poster_path : "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1040&q=80"} alt={props.title}/>
            </div>
            <div className="right-div">
                <h1> {props.title ? props.title.substring(0, 25) : null} </h1>
                <div className="card-right-details">
                <ul>
                    <li>
                        {props.release_date}
                    </li>
                    <li>
                        {props.runtime} min
                    </li>
                    <li>
                        {props.original_language}
                    </li>
                </ul>
                </div>

               
                <div className="card-right-rating">
                <i class="fas fa-md fa-star"></i>
                <i class="fas fa-md fa-star"></i>
                <i class="fas fa-md fa-star"></i>
                <i class="fas fa-md fa-star"></i>
                <i class="fas fa-md fa-star"></i> 
                <p>{props.vote_average}</p>
                </div>

                <div className="card-right-plot">
                    <p>{props.overview ? props.overview.substring(0, 225)+ "..." : null}</p>
                    <a href={INFO_URL + props.id}>Read More</a>
                </div>
                <div className="card-right-button">
                    <a href={INFO_URL + props.id}><i class="fas fa-xs fa-play"></i> WATCH TRAILER</a>
                </div>

                </div>    
        </div>    
        : <h1>Sorry! Cant find any info about that movie, try again later..</h1>}
            <div onClick={handleBack} className="back-button">
            <a href="/#"><i class="fas fa-lg fa-arrow-circle-left"></i> </a>
            <h3>Back To Search</h3>
            </div>
            
        </div>
    );
}

export default MovieInfo;

