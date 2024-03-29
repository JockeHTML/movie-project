import React, {useState, useEffect} from 'react';
import Movie from './Components/Movie';
import './style.css';
import MovieInfo from './Components/MovieInfo';

function App() {

  /* different states us with useState hook */
  const [ movies, setMovies ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ saveSearch, setSaveSearch ] = useState("");
  const [ defaultHeading, setDefaultHeading ] = useState("Search Movies")
  const [ movieClicked, setMovieClicked ] = useState([]);
  const [ mouseClick, setMouseClick ] = useState(false);

  /* useState hook used for when page load to get movies from api */
  useEffect(() => {
      fetch(process.env.REACT_APP_DEFAULT_API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch(err => console.log(err));
    },
    []);

    /* handle search query if there is one and find that movie from api */
    function handleSubmit (event) {
      event.preventDefault();
      if (searchTerm) {
        fetch(process.env.REACT_APP_SEARCH_API + searchTerm)
          .then((res) => res.json())
          .then((data) => {
            if (data.results.length > 0) {
            setMovies(data.results);  
            setDefaultHeading("Your Search Results")
            setSearchTerm("");
            } else {
            setDefaultHeading("Sorry.. The movie you search for cannot be found, try again!")
            setMovies([]);
            }  
            setSaveSearch(searchTerm);
      })
      .catch(err => console.log(err));  
      } 
    }

    /* movies movie api call */ 
    function handleMovie () {
      fetch(process.env.REACT_APP_MOVIE_API)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results)
        })
      .catch(err => console.log(err));
      setDefaultHeading("Movies")
    }

    /* popular movie api call */
    function handlePopular () {
      fetch(process.env.REACT_APP_DEFAULT_API)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results)
        })
      .catch(err => console.log(err));
      setDefaultHeading("Popular")
    }

    /* trending movie api call */
    function handleTrending () {
      fetch(process.env.REACT_APP_TRENDING_API)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results)
        })
      .catch(err => console.log(err));
      setDefaultHeading("Trending")
    }

    /* find search query */
    function findSearch (event) {
      setSearchTerm(event.target.value);
    }

    /* submit search query and get that movie with api call and query */
    function submitMovieClick (id) {
          fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=767038b79e20f01359849568b691b994&language=en-US`)
          .then((res) => res.json())
          .then((data) => {
            setMovieClicked(data);
            setDefaultHeading("");
          })
        .catch(err => console.log(err));
        setMovies([]);
        setMouseClick(true);
    }

    /* handle back button with reload of default movies or previous search */
    function submitBack (id) {
      setMouseClick(false);
        if (saveSearch) {
          fetch(process.env.REACT_APP_SEARCH_API + saveSearch)
          .then((res) => res.json())
          .then((data) => { 
            setMovies(data.results);
          })
        .catch(err => console.log(err));
        } else {
          fetch(process.env.REACT_APP_DEFAULT_API)
          .then((res) => res.json())
          .then((data) => {
            setMovies(data.results)
          })
        .catch(err => console.log(err));
        }
          setDefaultHeading("Search Movies")
    }
    
  return (
    <div>
         {mouseClick ? null : 
         <div className="search">
         <form onSubmit={handleSubmit}>
         <i aria-label="submit search" className="search-icon fas fa-search"></i> 
         <input
         onChange={findSearch}
         value={searchTerm} 
         type="text" 
         />
         </form>
        </div>}

        {mouseClick ? null : <div className="nav">
        <ul>
        <li><button className="nav-button" onClick={handleMovie} ><i className="fas fa-film"></i>MOVIES</button></li>
        <li><button className="nav-button" onClick={handlePopular} ><i className="fas fa-fire"></i>POPULAR</button></li>
        <li><button className="nav-button" onClick={handleTrending} ><i className="fas fa-lightbulb"></i>TRENDING</button></li>
        </ul>
       
        </div>}
        <div className="defaultHeading-error"><h1>{defaultHeading}</h1></div>
        

    {mouseClick ? 
    <MovieInfo 
    {...movieClicked} 
    submitBack={submitBack} /> : null}

    <div className="movie-container">
    {movies.slice(0, 18).map((movie) => {
       return <Movie
       id={movie.id} 
       key={movie.id} 
       {...movie} 
       submitMovieClick={submitMovieClick}
       />
     })
     }
    </div>
    </div>
  );
}

export default App;