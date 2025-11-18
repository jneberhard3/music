const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=["songs"]
    //#swagger.summary = Get all songs 
    //#swagger.responses[200] Lists all songs - schema => _id, title, 
    // composer, genre, isrc, artists, release Date, Record Label
    try {
        const result = await mongodb.getDatabase().db().collection("songs").find();
        const songs = await result.toArray();

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: "Could not get the songs", error });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=["songs"]
    //#swagger.summary = get a single song - must know the _id
    //#swagger.responses[200] - lists the one song  schema => _id, title, 
    // composer, genre, isrc, artists, release Date, Record Label
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid song ID" });
        }

        const songId = new ObjectId(req.params.id);
        const song = await mongodb.getDatabase().db().collection("songs").findOne({ _id: songId });
        if (!song) {
            return res.status(404).json({ message: "Song not found" });
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(song);
    } catch (error) {
        res.status(500).json({ message: "Error fetching song", error });
    }
};

const createSong = async (req, res) => {
    //#swagger.tags=["songs"]
    //#swagger.summary = creates song and add to database 
    //#swagger.responses[204]
    try {
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
            return res.status(201).json({ message: "Song Created", id: response.insertedId });
        }
        res.status(500).json({ message: "Failed to create song" });
    } catch (error) {
        res.status(500).json({ message: "Song creation failed" });
    }
};

const updateSong = async (req, res) => {
    //#swagger.tags=["songs"]
    //#swagger.summary = updates song
    //#swagger.responses[204]
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid song ID" });
        }

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
        if (response.matchedCount === 0) {
            return res.status(404).json({ message: "Song not found" });
        }

        if (response.modifiedCount === 0) {
            return res.status(200).json({ message: "No changes were made to the song" });
        }

        return res.status(204).send();
} catch (error) {
        res.status(500).json({ message: "Error updating song", error });
    }
};

const deleteSong = async (req, res) => {
    //#swagger.tags=["songs"]
    //#swagger.summary = delete songs 
    //#swagger.responses[204]
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid song ID" });
        }
        const songId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection("songs").deleteOne({ _id: songId });
        if (response.deletedCount > 0) {
            return res.status(204).send();
        }
        res.status(404).json({ message: "Song not found" });
    } catch (error) {
        res.status(500).json({ message: "Some error occurred while deleting the song." });
        }
};

module.exports = {
    getAll,
    getSingle,
    createSong,
    updateSong,
    deleteSong
};