import React, { useState, useCallback } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './components/SavedList';
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import axios from './utils';
import UpdateMovie from './components/UpdateMovie';
import AddMovie from './components/AddMovie';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = useCallback(() => {
    axios()
      .get('/movies')
      .then((res) => setMovieList(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addToSavedList = (movie) => {
    if (!savedList.some((item) => item.id === movie.id)) {
      setSavedList([...savedList, movie]);
    }
  };

  const removeFromSavedList = useCallback((deletedMovie) => {
    if (deletedMovie) {
      const { id } = deletedMovie.movie;

      setSavedList((list) => list.filter((movie) => movie.id !== id));
    }
  }, []);

  const updateSavedList = (updatedMovie) => {
    setSavedList((list) =>
      list.map((movie) => (movie.id === updatedMovie.id ? updatedMovie : movie))
    );
  };

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path='/'>
        <MovieList
          movies={movieList}
          getMovieList={getMovieList}
          removeFromSavedList={removeFromSavedList}
        />
      </Route>

      <Route path='/movies/:id'>
        <Movie addToSavedList={addToSavedList} />
      </Route>

      <Route path='/update-movie/:id'>
        <UpdateMovie updateSavedList={updateSavedList} />
      </Route>

      <Route path='/add-movie'>
        <AddMovie />
      </Route>
    </>
  );
};

export default App;
