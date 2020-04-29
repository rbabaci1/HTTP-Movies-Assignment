import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';

function MovieList({ movies, getMovieList }) {
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
