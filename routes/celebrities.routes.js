const router = require("express").Router();
const celebrityModel = require("../models/Celebrity.model");

// all your routes here
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  celebrityModel
    .create({ name, occupation, catchPhrase })
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      res.render("celebrities/new-celebrity");
      console.log(err);
    });
});

router.get("/celebrities", (req, res, next) => {
  celebrityModel
    .find()
    .then((celebs) => {
      res.render("celebrities/celebrities.hbs", { celebs });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
