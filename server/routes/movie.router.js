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


module.exports = router;