import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
const initialState = {
  id: 0,
  title: '',
  director: '',
  metascore: '',
  stars: [],
};

export default function UpdateMovie() {
  const [movieInfo, setMovieInfo] = useState(initialState);
  const { title, director, metascore, stars } = movieInfo;

  const history = useHistory();

  const movieToUpdate = history.location.state
    ? history.location.state.movie
    : null;

  useEffect(() => {
    setMovieInfo((state) => (movieToUpdate ? movieToUpdate : state));
  }, [movieToUpdate]);

  const handleChange = (e) => {
    setMovieInfo({
      ...movieInfo,
      [e.target.name]: e.target.value,
    });
  };

  const updateMovie = (e) => {
    e.preventDefault();

    if (movieToUpdate) {
      setMovieInfo(movieToUpdate);
    }
  };

  return (
    <div className='update-movie'>
      <form onSubmit={updateMovie}>
        <label>
          Title:
          <input
            id='title'
            type='text'
            name='title'
            value={title}
            onChange={handleChange}
          />
        </label>

        <label>
          Director:
          <input
            id='director'
            type='text'
            name='director'
            value={director}
            onChange={handleChange}
          />
        </label>

        <label>
          MetaScore:
          <input
            id='metascore'
            type='text'
            name='metascore'
            value={metascore}
            onChange={handleChange}
          />
        </label>

        <section className='textarea'>
          <label>
            Actors:
            <textarea
              rows='4'
              cols='30'
              id='stars'
              name='stars'
              value={stars}
              onChange={handleChange}
            />
          </label>
        </section>

        <div className='form-submit-btn'>
          <button>Update</button>
        </div>
      </form>
    </div>
  );
}
