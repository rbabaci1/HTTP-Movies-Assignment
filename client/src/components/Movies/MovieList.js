import React, { useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';
import MovieCard from './MovieCard';

function MovieList({ movies, getMovieList, removeFromSavedList }) {
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      removeFromSavedList(state.movie.id);
    }
  }, [state, removeFromSavedList]);

  useEffect(() => {
    getMovieList();
  }, [getMovieList]);

  return (
    <div className='movie-list'>
      {movies.map((movie) => (
        <Link
          key={movie.id}
          to={{
            pathname: `/movies/${movie.id}`,
            state: { movie },
          }}
        >
          <MovieCard movie={movie} />
        </Link>
      ))}
    </div>
  );
}

export default MovieList;
