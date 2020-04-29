import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function SavedList({ list }) {
  return (
    <div className='saved-list'>
      <h3>Saved Movies:</h3>

      {list.map((movie) => {
        return (
          <NavLink
            to={{
              pathname: `/movies/${movie.id}`,
              state: { movie },
            }}
            key={movie.id}
            activeClassName='saved-active'
          >
            <span className='saved-movie'>{movie.title}</span>
          </NavLink>
        );
      })}

      <section>
        <div className='home-button'>
          <Link to='/'>Home</Link>
        </div>

        <div className='add-movie-button'>
          <Link to='/add-movie'>Add Movie</Link>
        </div>
      </section>
    </div>
  );
}

export default SavedList;
