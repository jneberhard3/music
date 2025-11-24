const router = require("express").Router();
const passport = require("passport");



router.use("/", require("./swagger"));

router.get("/", (req, res) => {
    //#swagger.tags=["Hello World"]
    res.send("Hello World");
});

router.use("/songs", require("./songs"));
router.use("/album", require("./albums"));

router.get("/login", passport.authenticate("github"), (req, res) => { });

router.get("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect("/");
    });
});

module.exports = router;