import React, { useState } from 'react';

const initialState = {
  title: '',
  director: '',
  metascore: '',
  stars: [],
};

export default function UpdateMovie() {
  const [movieInfo, setMovieInfo] = useState(initialState);
  const { title, director, metascore, stars } = movieInfo;

  const handleChange = (e) => {
    setMovieInfo({
      ...movieInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='update-movie'>
      <form>
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

        <label>
          Actors:
          <input
            id='stars'
            type='text'
            name='stars'
            value={stars}
            onChange={handleChange}
          />
        </label>
      </form>
    </div>
  );
}
