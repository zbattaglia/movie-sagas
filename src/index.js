import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { HashRouter as Router } from 'react-router-dom';
import {takeEvery} from 'redux-saga/effects';
// reducers and saga
import genres from './redux/reducers/genres.reducer';
import movies from './redux/reducers/movies.reducer';
import selectedMovie from './redux/reducers/selectedMovie.reducer';
import getMovieSaga from './redux/sagas/getMovie.saga';
import getGenresSaga from './redux/sagas/getGenres.saga';
import getAllGenresSaga from './redux/sagas/getAllGenres.saga';
import editMovieSaga from './redux/sagas/editMovie.saga';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery( 'FETCH_MOVIE', getMovieSaga );
    yield takeEvery( 'FETCH_GENRES', getGenresSaga );
    yield takeEvery( 'EDIT_MOVIE', editMovieSaga );
    yield takeEvery( 'FETCH_ALL_GENRES', getAllGenresSaga );
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        selectedMovie,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><Router><App /></Router></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
