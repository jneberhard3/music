const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=["songs"]
    //#swagger.summary = Get all songs 
    //#swagger.responses[200] Lists all songs - schema => _id, title, 
    // composer, genre, isrc, artists, release Date, Record Label
    const result = await mongodb.getDatabase().db().collection("songs").find();
        result.toArray().then((songs) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(songs); 
        });
}

const getSingle = async (req, res) => {
    //#swagger.tags=["songs"]
    //#swagger.summary = get a single song - must know the _id
    //#swagger.responses[200] - lists the one song  schema => _id, title, 
    // composer, genre, isrc, artists, release Date, Record Label
    const songId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("songs").find({ _id: songId });
    result.toArray().then((songs) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(songs[0]); 
    });
};

const createSong = async (req, res) => {
    //#swagger.tags=["songs"]
    //#swagger.summary = creates song and add to database 
    //#swagger.responses[204]
    const song = {
        title: req.body.title,
        composer: req.body.composer,
        genre: req.body.genre,
        isrc: req.body.isrc,
        artist: req.body.artist,
        releaseDate: req.body.releaseDate,
        recordLabel: req.body.recordLabel
    };
    const response = await mongodb.getDatabase().db().collection("songs").insertOne(song);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while creating the song.");
    }
};

const updateSong = async (req, res) => {
    //#swagger.tags=["songs"]
    //#swagger.summary = updates song
    //#swagger.responses[204]
    const songId = new ObjectId(req.params.id);
    const song = {
        title: req.body.title,
        composer: req.body.composer,
        genre: req.body.genre,
        isrc: req.body.isrc,
        artist: req.body.artist,
        releaseDate: req.body.releaseDate,
        recordLabel: req.body.recordLabel
    };
    const response = await mongodb.getDatabase().db().collection("songs").replaceOne({ _id: songId }, song);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while updating the song.");
    }
};

const deleteSong = async (req, res) => {
    //#swagger.tags=["songs"]
    //#swagger.summary = delete songs 
    //#swagger.responses[204]
    const songId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("songs").deleteOne({ _id: songId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while deleting the song.");
    }
};

module.exports = {
    getAll,
    getSingle,
    createSong,
    updateSong,
    deleteSong
};