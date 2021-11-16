const router = require("express").Router();
const MovieModel = require("../models/Movie.model");
const celebrityModel = require("../models/Celebrity.model");

// all your routes here

router.get("/movies/create", (req, res, next) => {
  celebrityModel
    .find()
    .then((celeb) => {
      res.render("movies/new-movie", { celeb });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  MovieModel.create({ title, genre, plot, cast })
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      res.render("movies/new-movie");
      console.log(err);
    });
});

router.get("/movies", (req, res, next) => {
  MovieModel.find().then((movies) => {
    res.render("movies/movie", { movies });
  });
});

router.get("/movies/:id", (req, res, next) => {
  const { id } = req.params;

  MovieModel.findById(id)
    .populate("cast")
    .then((movie) => {
      console.log(movie);
      res.render("movies/movie-details", { movie });
    })
    .catch((err) => {
      next("Error in movies Id", err);
    });
});

router.post("/movies/:id/delete", (req, res, next) => {
  const { id } = req.params;

  MovieModel.findByIdAndRemove(id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log(err);
      next("Error with delete", err);
    });
});

module.exports = router;
