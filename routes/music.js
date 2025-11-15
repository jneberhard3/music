const express = require("express");
const router = express.Router();

const songsController = require("../controllers/songs");

router.get("/", songsController.getAll);
router.get("/:id", songsController.getSingle);

router.post("/", songsController.createSong);  //create song
router.put("/:id", songsController.updateSong);  //update song
router.delete("/:id", songsController.deleteSong);   //delete song

module.exports = router;
