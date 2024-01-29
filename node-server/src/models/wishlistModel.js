const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AllProperty",
      },

});

const Wishlists = mongoose.model("Wishlists", wishlistSchema);

module.exports = Wishlists;


