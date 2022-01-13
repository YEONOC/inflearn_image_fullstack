const mongoose = require("mongoose");

const ImageScheme = new mongoose.Schema(
    {
        key : { type : String, required : true },
        originalFileName : { type : String, required : true },
    },
    { timestamps : true }
);

module.exports = mongoose.model("image", ImageScheme);