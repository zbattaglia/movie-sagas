const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM movies';
   pool.query( queryText )
    .then( (result) => { 
        console.log( 'Got movies on server' );
        res.send(result.rows); })
    .catch( (error) => {
        console.log( 'Error completing SELECT movies query', error );
        res.sendStatus(500);
     });
});


// gets all genres associated with the movie id passed as a parameter
router.get('/genres/:id', (req, res) => {
    console.log( `Getting genres from ${req.params.id}`)
    const queryText = `SELECT "genres"."name" FROM "movies_genres"
                        RIGHT OUTER JOIN "movies" ON "movies_genres"."movie_id" = "movies"."id"
                        LEFT OUTER JOIN "genres" ON "movies_genres"."genre_id" = "genres"."id"
                        WHERE "movies"."id" = $1;`;
    pool.query( queryText, [ req.params.id ] )
        .then( (result) => { 
            console.log( 'Got movies on server' );
            res.send(result.rows); })
        .catch( (error) => {
            console.log( 'Error completing SELECT movies query', error );
            res.sendStatus(500);
    });
});


module.exports = router;