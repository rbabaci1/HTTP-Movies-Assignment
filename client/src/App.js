import React, { useState, useCallback } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './components/Movies/SavedList';
import MovieList from './components/Movies/MovieList';
import Movie from './components/Movies/Movie';
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

  const removeFromSavedList = useCallback((movieId) => {
    setSavedList((list) => list.filter((movie) => movie.id !== movieId));
  }, []);

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
        <UpdateMovie />
      </Route>

      <Route path='/add-movie'>
        <AddMovie />
      </Route>
    </>
  );
};

export default App;
