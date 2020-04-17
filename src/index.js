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
import {takeEvery, put} from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery( 'FETCH_MOVIE', getMovieSaga );
    yield takeEvery( 'FETCH_GENRES', getGenresSaga );
    yield takeEvery( 'EDIT_MOVIE', editMovieSaga );
}

// passes movie edits to server in PUT request
// after a successful put, calls fetch movie to update page with new data
function* editMovieSaga( action ) {
    console.log( 'In editMovieSaga', action );
    try{
        yield axios.put( `/movies/${action.payload.id}`, action.payload );
        yield put( { type: 'FETCH_MOVIE' } );
    }
    catch( error ){
        console.log( 'Error making PUT to server' );
    }
}; // end editMovieSaga

// saga makes a get request for all genres associated with a specific movie id
function* getGenresSaga( action ) {
    console.log( 'In getGenresSaga', action );
    try{
        const response = yield axios.get( `/movies/genres/${action.payload}` );
        console.log( 'Got details', response );
        yield put( { type: 'SET_GENRES', payload: response.data } );
    }
    catch( error ){
        console.log( 'Error getting details', error );
    }
}; // end getDetailsSaga

// saga to make ajax GET request
function* getMovieSaga( action ) {
    console.log( 'In getMovieSaga', action );
    // gets the movies back as response, and sends the response to the movies reducer with the SET_MOVIES action
    try{
        const response = yield axios.get( `/movies` );
        yield put({type: 'SET_MOVIES', payload: response.data})
    }
    catch(error){
        console.log('Error with Search GET', error);
    }
}; // end getMovieSaga

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// stores the id of the movie selected on the list page for use on other pages.
const selectedMovie = (state = null, action) => {
    switch (action.type) {
        case 'SELECT_MOVIE':
            return action.payload;
        default:
            return state;
    }
}

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
