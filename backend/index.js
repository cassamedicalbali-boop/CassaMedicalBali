const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const parser = require('body-parser');
const compression = require('compression');
const multer = require('multer');
const jwt = require("jsonwebtoken");

const admins = require('./schemas/admin');
const article = require('./schemas/article');
const website = require('./schemas/website');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Handle preflight
app.options("*", (req, res) => {
  res.sendStatus(200);
});

app.use(compression());
app.use(parser.json({ limit: "50mb" }));

const mongoURI =
  "mongodb+srv://cassamedicalbali:CassaClinic@cassamedicalclinic.369z5aw.mongodb.net/CassaMedicalClinic";

mongoose
  .connect(mongoURI)
  .then(() =>
    console.log("MongoDB connected to database: Cassa Medical Clinic")
  )
  .catch((err) => console.error("MongoDB connection error:", err));

const { v2: cloudinary } = require("cloudinary");
cloudinary.config({
  cloud_name: "dccp9q30k",
  api_key: "225543437123415",
  api_secret: "L57Lrr4_mfojeg1d5tDujHxtR6k",
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const foundAdmin = await admins.findOne({ username });
  if (!foundAdmin)
    return res.status(400).json({ message: "Access restricted to admins only" });

  if (foundAdmin.password !== password)
    return res.status(400).json({ message: "Invalid admin password credentials" });

  const token = jwt.sign(
    {
      id: foundAdmin._id,
      username: foundAdmin.username,
      email: foundAdmin.email,
      role: "admin",
    },
    "Secret",
    { expiresIn: "1h" }
  );

  res.json({ token });
});

app.get("/api/articles", async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const pageSize = Math.max(1, parseInt(req.query.pageSize) || 6);
    const total = await article.countDocuments();

    const articles = await article
      .find()
      .sort({ _id: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({ articles, total, totalPages: Math.ceil(total / pageSize) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/articles", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file)
      return res.status(400).json({ message: "Image is required" });

    let descriptionArray;
    try {
      descriptionArray = JSON.parse(description);
      if (!Array.isArray(descriptionArray)) throw new Error();
    } catch {
      descriptionArray = description.split("\n").filter((line) => line.trim() !== "");
    }

    cloudinary.uploader.upload_stream(
      { folder: "Articles" },
      async (error, uploadResult) => {
        if (error)
          return res.status(500).json({ message: "Cloudinary upload failed", error });

        const newArticle = new article({
          title,
          description: descriptionArray,
          imageUrl: uploadResult.secure_url,
        });

        await newArticle.save();
        res.status(201).json(newArticle);
      }
    ).end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.get("/api/website", async (req, res) => {
  try {
    const newwebsite = await website.findOne();
    res.json(newwebsite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/website", upload.single("image"), async (req, res) => {
  try {
    const body = req.body;
    let existingWebsite = await website.findOne();

    let imageUrl;
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "Website" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });

      imageUrl = uploadResult.secure_url;

      if (existingWebsite && existingWebsite.imageUrl) {
        const oldPublicId = existingWebsite.imageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(oldPublicId);
      }
    }

    if (!existingWebsite) {
      existingWebsite = new website({ ...body, imageUrl });
    } else {
      for (const key in body) {
        if (body[key]) existingWebsite[key] = body[key];
      }
      if (imageUrl) existingWebsite.imageUrl = imageUrl;
    }

    await existingWebsite.save();
    res.json(existingWebsite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default app;
