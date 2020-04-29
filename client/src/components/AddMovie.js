import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from './Form';
import { initialState } from './UpdateMovie';
import axios from 'axios';

export default function AddMovie() {
  const history = useHistory();
  const [movieInfo, setMovieInfo] = useState(initialState);

  const handleChange = (e) => {
    setMovieInfo({ ...movieInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(movieInfo);
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
