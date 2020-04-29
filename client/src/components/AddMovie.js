import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from './Form';
import { initialState } from './UpdateMovie';
import axios from '../utils';

export default function AddMovie() {
  const history = useHistory();
  const [movieInfo, setMovieInfo] = useState(initialState);

  const handleChange = (e) => {
    if (e.target.name === 'stars') {
      setMovieInfo({ ...movieInfo, stars: e.target.value.split(',') });
    } else {
      setMovieInfo({ ...movieInfo, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios()
      .post('/movies', movieInfo)
      .then(() => history.push('/'))
      .catch((err) => console.error(err));

    setMovieInfo(initialState);
  };

  return (
    <div className='form-wrapper'>
      <h2>Add Movie</h2>

      <Form
        action='ADD'
        formInfo={movieInfo}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
