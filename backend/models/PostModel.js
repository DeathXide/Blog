const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    title: String,
    content: String,
    cover: String,
    summary: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;