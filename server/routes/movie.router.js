const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// gets the id of the movie to edit as a URL parameter
// the req.body has the edited title and description
router.put( '/:id', (req, res) => {
    let id = req.params.id;
    let data = req.body;
    console.log( `Editing movie ${id} with ${data.title} and ${data.description}`);
    let queryText = `UPDATE "movies" SET "title" = $1, "description" = $2
                        WHERE "id" = $3;`;
    pool.query( queryText, [ data.title, data.description, id ] )
        .then( (result) => {
            console.log( 'Updated Database' );
            res.sendStatus( 200 );
        })
        .catch( (error) => {
            console.log( 'Error editing database', error );
            res.sendStatus( 500 );
        })
}); // end PUT route

// return all favorite images
router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM movies ORDER BY "id"';
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

// router to get all movies genres fro display on list page
router.get('/genres', (req, res) => {
    console.log( `Getting genres from ${req.params.id}`)
    const queryText = `SELECT "movies"."id", array_agg("genres"."name") "genres" FROM "movies_genres"
                        RIGHT OUTER JOIN "movies" ON "movies_genres"."movie_id" = "movies"."id"
                        LEFT OUTER JOIN "genres" ON "movies_genres"."genre_id" = "genres"."id"
                        GROUP BY "movies"."id"
                        ORDER BY "movies"."id";`;
    pool.query( queryText )
        .then( (result) => { 
            console.log( 'Got movie genres on server' );
            res.send(result.rows); })
        .catch( (error) => {
            console.log( 'Error completing SELECT movie genres query', error );
            res.sendStatus(500);
    });
});


module.exports = router;