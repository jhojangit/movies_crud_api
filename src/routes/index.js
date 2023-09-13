const express = require('express');
const genreRouter = require('./genre.router');
const movieRouter = require('./movie.router');
const actorRouter = require('./actor.router');
const directorRouter = require('./director.router');
const router = express.Router();



router.use("/genres", genreRouter)
router.use("/movies", movieRouter)
router.use("/actors", actorRouter )
router.use("/directors", directorRouter )

module.exports = router;