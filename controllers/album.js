const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=["albums"]
    //#swagger.summary = Get all albums 
    //#swagger.responses[200] Lists all albums - schema => _id, albumTitle, 
    // upc, genre, productId, artist, releaseDate, Record Label
    try {
        const albums = await mongodb.getDatabase().db().collection("albums").find().toArray();
        res.status(200).json(albums);
    } catch (error) {
        res.status(500).json({ message: "Error - could not fetch albums", error });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=["albums"]
    //#swagger.summary = get a single album - must know the _id
    //#swagger.responses[200] - lists the one album  schema => _id, albumTitle, 
    // upc, genre, productId, artist, releaseDate, Record Label
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Not a valid album ID" });
        }

        const albumId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection("albums").findOne({ _id: albumId });
        if (!result) {
            return res.status(404).json({ message: "Could not find album." });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Could not fetch album", error });
    }
};

const createAlbum = async (req, res) => {
    //#swagger.tags=["albums"]
    //#swagger.summary = creates album and add to database 
    //#swagger.responses[201]
    if (!req.body.albumTitle?.trim() || !req.body.upc?.trim()) {
        return res.status(400).json({ message: "Album Title and upc are required" });
    }
    try {
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
            return res.status(201).json({ message: "Album Created", id: response.insertedId });
        }

        return res.status(500).json({ message: "Failed to create an album" });
    } catch (error) {
    res.status(500).json({ message: "Some error occurred while creating the album." });
    }
};

const updateAlbum = async (req, res) => {
    //#swagger.tags=["albums"]
    //#swagger.summary = updates album
    //#swagger.responses[204]
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid album ID" });
    }

    if (!req.body.albumTitle?.trim() || !req.body.upc?.trim()) {
    return res.status(400).json({ message: "Album Title and upc are required" });
}

    try {
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
    if (response.matchedCount === 0) {
            return res.status(404).json({ message: "Album not found" });
        }
        return res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error updating the album", error });
    }
};

const deleteAlbum = async (req, res) => {
    //#swagger.tags=["albums"]
    //#swagger.summary = delete albums 
    //#swagger.responses[204]
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid album ID" });
        }
        const albumId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection("albums").deleteOne({ _id: albumId });
        if (response.deletedCount > 0) {
            return res.status(204).send();
        }
        res.status(404).json({ message: "Album Not Found" });
    
    } catch (error) {
        res.status(500).json({ message: "Error deleting the album", error });
    }
};

module.exports = {
    getAll,
    getSingle,
    createAlbum,
    updateAlbum,
    deleteAlbum
};