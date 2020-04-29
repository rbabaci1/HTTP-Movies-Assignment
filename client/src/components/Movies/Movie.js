import React from 'react';
import { useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

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

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>

      <div className='update-button' onClick={updateMovie}>
        Update
      </div>

      <div className='delete-button'>X</div>
    </div>
  );
}

export default Movie;
