const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=["albums"]
    //#swagger.summary = Get all albums 
    //#swagger.responses[200] Lists all albums - schema => _id, albumTitle, 
    // upc, genre, productId, artists, release Date, Record Label
    const result = await mongodb.getDatabase().db().collection("albums").find();
        result.toArray().then((albums) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(albums); 
        });
}

const getSingle = async (req, res) => {
    //#swagger.tags=["albums"]
    //#swagger.summary = get a single album - must know the _id
    //#swagger.responses[200] - lists the one album  schema => _id, albumTitle, 
    // upc, genre, productId, artists, release Date, Record Label
    const albumId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("albums").find({ _id: albumId });
    result.toArray().then((albums) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(albums[0]); 
    });
};

const createAlbum = async (req, res) => {
    //#swagger.tags=["albums"]
    //#swagger.summary = creates album and add to database 
    //#swagger.responses[204]
    const album = {
        albumTitle: req.body.albumTitle,
        upc: req.body.upc,
        genre: req.body.genre,
        productId: req.body.productId,
        artist: req.body.artist,
        releaseDate: req.body.releaseDate,
        recordLabel: req.body.recordLabel
    };
    const response = await mongodb.getDatabase().db().collection("albums").insertOne(album);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while creating the album.");
    }
};

const updateAlbum = async (req, res) => {
    //#swagger.tags=["albums"]
    //#swagger.summary = updates album
    //#swagger.responses[204]
    const albumId = new ObjectId(req.params.id);
    const album = {
        albumTitle: req.body.albumTitle,
        upc: req.body.upc,
        genre: req.body.genre,
        productId: req.body.productId,
        artist: req.body.artist,
        releaseDate: req.body.releaseDate,
        recordLabel: req.body.recordLabel
    };
    const response = await mongodb.getDatabase().db().collection("albums").replaceOne({ _id: albumId }, album);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while updating the album.");
    }
};

const deleteAlbum = async (req, res) => {
    //#swagger.tags=["albums"]
    //#swagger.summary = delete albums 
    //#swagger.responses[204]
    const albumId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("albums").deleteOne({ _id: albumId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while deleting the album.");
    }
};

module.exports = {
    getAll,
    getSingle,
    createAlbum,
    updateAlbum,
    deleteAlbum
};