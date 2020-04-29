import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from '../utils';

export const initialState = {
  title: '',
  director: '',
  metascore: 0,
  stars: [],
};

export default function UpdateAddMovie({ updateSavedList }) {
  const [movieInfo, setMovieInfo] = useState(initialState);
  const history = useHistory();
  const { state } = useLocation();
  const { title, director, metascore, stars } = movieInfo;

  const action = state ? state.action : null;
  const movieToUpdate = action === 'UPDATE' ? state.movie : null;

  useEffect(() => {
    setMovieInfo(() => (action === 'UPDATE' ? movieToUpdate : initialState));
  }, [movieToUpdate, action]);

  const handleChange = (e) => {
    if (e.target.name === 'stars') {
      setMovieInfo({ ...movieInfo, stars: e.target.value.split(',') });
    } else {
      setMovieInfo({ ...movieInfo, [e.target.name]: e.target.value });
    }
  };

  const updateAddMovie = (e) => {
    e.preventDefault();

    if (action === 'UPDATE') {
      axios()
        .put(`/movies/${movieToUpdate.id}`, movieInfo)
        .then((res) => {
          updateSavedList(res.data);
          history.push('/');
        })
        .catch((err) => console.error(err));
    } else if (action === 'ADD') {
      axios()
        .post('/movies', movieInfo)
        .then(() => history.push('/'))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className='form-wrapper'>
      <h2>{action === 'ADD' ? 'Add Movie' : 'Update Movie'}</h2>

      <form onSubmit={updateAddMovie}>
        <label>
          Title:
          <input
            id='title'
            type='text'
            name='title'
            value={title}
            onChange={handleChange}
            required
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
            required
          />
        </label>

        <label>
          MetaScore:
          <input
            id='metascore'
            type='number'
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
              id='stars'
              name='stars'
              value={stars}
              onChange={handleChange}
              required
            />
          </label>
        </section>

        <div className='form-submit-btn'>
          <button>{action === 'ADD' ? 'Add' : 'Update'}</button>
        </div>
      </form>
    </div>
  );
}
