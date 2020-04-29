import React from 'react';
import { useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';
import axios from 'axios';

function Movie({ addToSavedList }) {
  const history = useHistory();
  const { movie } = history.location.state;

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const updateMovie = () => {
    history.push({
      pathname: `/update-movie/:${movie.id}`,
      state: { movie },
    });
  };

  const deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(() =>
        history.push({
          pathname: '/',
          state: { movie },
        })
      )
      .catch((err) => console.error(err));
  };

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>

      <div className='update-button' onClick={updateMovie}>
        Update
      </div>

      <div className='delete-button' onClick={deleteMovie}>
        X
      </div>
    </div>
  );
}

export default Movie;
