const Actor = require("./Actors");
const Director = require("./Directors");
const Genre = require("./Genres");
const Movie = require("./Movies");




Movie.belongsToMany(Genre, {through: "MoviesGenres"})
Genre.belongsToMany(Movie, {through: "MoviesGenres"})


Movie.belongsToMany(Actor, {through: "MoviesActors"})
Actor.belongsToMany(Movie, {through: "MoviesActors"})


Movie.belongsToMany(Director, {through: "MoviesDirector"})
Director.belongsToMany(Movie, {through: "MoviesDirector"})