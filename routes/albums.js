const express = require("express");
const router = express.Router();

const albumsController = require("../controllers/album");
const { validateAlbum } = require("../utilities/validation");

router.get("/", albumsController.getAll);
router.get("/:id", albumsController.getSingle);

router.post("/", validateAlbum, albumsController.createAlbum);  //create album
router.put("/:id", validateAlbum, albumsController.updateAlbum);  //update album
router.delete("/:id", albumsController.deleteAlbum);   //delete album

module.exports = router;
