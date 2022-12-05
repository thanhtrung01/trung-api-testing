const path = require('path');
// const express = require('express');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'src/uploads/');
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2,
    },
});

module.exports = upload;