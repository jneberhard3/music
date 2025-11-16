const { body, validationResult } = require("express-validator");

const validateSong = [
    body("title").notEmpty().withMessage("Song title required"),
    body("composer").notEmpty().withMessage("Composer must be listed"),
    body("genre").optional().isString(),
    body("isrc").notEmpty().isString().withMessage("You must have an ISRC"),
    body("artist").notEmpty().withMessage("Artist required"),
    body("releaseDate").matches(/^(0[1-9]|1[0-2])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/)
        .withMessage("Release date must be in mm-dd-yyyy format"),
    body("recordLabel").optional().isString(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];


const validateAlbum = [
    body("albumTitle").notEmpty().withMessage("Album title required"),
    body("upc").isNumeric().withMessage("UPC only contains numbers").isLength({ min: 12, max: 13 })
        .withMessage("UPC is 12 digits in the U.S. and Canada, 13 digits in most of the rest of the world"),
    body("genre").optional().isString(),
    body("productId").notEmpty().isString().withMessage("You must have a product number"),
    body("artist").notEmpty().withMessage("Artist required"),
    body("releaseDate").matches(/^(0[1-9]|1[0-2])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/)
        .withMessage("Release date must be in mm-dd-yyyy format"),
    body("recordLabel").optional().isString(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateSong,
    validateAlbum
};