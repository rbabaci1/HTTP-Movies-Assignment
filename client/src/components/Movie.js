import React from 'react';
import { useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';
import axios from '../utils';

function Movie({ addToSavedList }) {
  const history = useHistory();
  const { movie } = history.location.state;

  const updateMovie = () => {
    history.push({
      pathname: `/update-add-movie/:${movie.id}`,
      state: { action: 'UPDATE', movie },
    });
  };

  const deleteMovie = () => {
    axios()
      .delete(`/movies/${movie.id}`)
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

      <div className='save-button' onClick={() => addToSavedList(movie)}>
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
