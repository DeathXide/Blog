const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/UserModel");
const Post = require("./models/PostModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const FrontURL = process.env.FrontURL;
const database = process.env.database;

const sec = "akjs%alskjd@kajsd";
app = express();
app.use(cors({ credentials: true, origin: FrontURL }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
mongoose.connect(
  "mongodb+srv://admin-hrutu:fire1234@cluster0.vwlmw.mongodb.net/blog"
);

const salt = bcrypt.genSaltSync(10);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const UserDoc = await User.findOne({ username });
  console.log(UserDoc);
  if (UserDoc != null && bcrypt.compareSync(password, UserDoc.password)) {
    jwt.sign({ username, id: UserDoc.id }, sec, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json(UserDoc);
    });
  } else {
    res.status(400).json("Wrong Details");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, sec, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/posts", upload.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = `${path}.${ext}`;
  const { title, summary, text } = req.body;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, sec, async (err, info) => {
    if (err) throw err;

    const postDoc = await Post.create({
      title,
      summary,
      content: text,
      cover: newPath,
      author: info.id,
    });

    res.json(postDoc);
  });
});

app.get("/posts", async (req, res) => {
  const posts = Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(await posts);
});

app.get("/posts/:id", async (req, res) => {
  const id = req.params["id"];

  const postInfo = await Post.findById(id).populate("author", ["username"]);

  res.json(postInfo);
});

app.post("/delete", async (req, res) => {
  const { id } = req.body;

  const resp = await Post.findByIdAndRemove(id);

  res.json(resp);
});

app.listen(4000);
