const express = require("express");
const router = express.Router();

const songsController = require("../controllers/songs");
const { validateSong } = require("../utilities/validation");

router.get("/", songsController.getAll);
router.get("/:id", songsController.getSingle);

router.post("/", validateSong, songsController.createSong);  //create song
router.put("/:id", validateSong, songsController.updateSong);  //update song
router.delete("/:id", songsController.deleteSong);   //delete song

module.exports = router;
