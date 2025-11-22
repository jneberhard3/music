const express = require("express");
const router = express.Router();

const songsController = require("../controllers/songs");
const { validateSong } = require("../utilities/validation");

const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", songsController.getAll);
router.get("/:id", songsController.getSingle);

router.post("/", isAuthenticated, validateSong, songsController.createSong);  //create song
router.put("/:id", isAuthenticated, validateSong, songsController.updateSong);  //update song
router.delete("/:id", isAuthenticated, songsController.deleteSong);   //delete song

module.exports = router;
