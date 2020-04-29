import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Form from './Form';

export const initialState = {
  id: 0,
  title: '',
  director: '',
  metascore: 0,
  stars: [],
};

export default function UpdateMovie() {
  const history = useHistory();
  const [movieInfo, setMovieInfo] = useState(initialState);

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
    <div className='form-wrapper'>
      <h2>Update Movie</h2>

      <Form
        action='UPDATE'
        formInfo={movieInfo}
        onChange={handleChange}
        onSubmit={updateMovie}
      />
    </div>
  );
}
