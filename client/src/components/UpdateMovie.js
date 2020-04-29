import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
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
    if (e.target.name === 'stars') {
      setMovieInfo({ ...movieInfo, stars: e.target.value.split(',') });
    } else {
      setMovieInfo({ ...movieInfo, [e.target.name]: e.target.value });
    }
  };

  const updateMovie = (e) => {
    e.preventDefault();

    if (movieToUpdate) {
      axios
        .put(`http://localhost:5000/api/movies/${movieToUpdate.id}`, movieInfo)
        .then(() => {
          setMovieInfo(initialState);
          history.push('/');
        })
        .catch((err) => console.error(err));
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
