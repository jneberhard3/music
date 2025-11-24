const express = require("express");
const router = express.Router();

const albumsController = require("../controllers/album");
const { validateAlbum } = require("../utilities/validation");

const { isAuthenticated } = require("../utilities/authenticate");

router.get("/", albumsController.getAll);
router.get("/:id", albumsController.getSingle);

router.post("/", isAuthenticated, validateAlbum, albumsController.createAlbum);  //create album
router.put("/:id", isAuthenticated, validateAlbum, albumsController.updateAlbum);  //update album
router.delete("/:id", isAuthenticated, albumsController.deleteAlbum);   //delete album

module.exports = router;
