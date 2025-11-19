// require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const parser = require('body-parser');
const compression = require('compression');
const multer = require('multer');
const jwt = require("jsonwebtoken");

const admins = require('./schemas/admin')
const article = require('./schemas/article')
const website = require('./schemas/website')
const storage = multer.memoryStorage();
const upload = multer({ storage });

const app = express();
app.use(cors());
app.use(compression());
app.use(parser.json({ limit: '50mb' }));

const mongoURI = 'mongodb+srv://cassamedicalbali:CassaClinic@cassamedicalclinic.369z5aw.mongodb.net/CassaMedicalClinic';


mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected to database: Cassa Medical Clinic'))
  .catch((err) => console.error('MongoDB connection error:', err));

const { v2: cloudinary } = require("cloudinary");

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dccp9q30k",
  api_key: "225543437123415",
  api_secret: "L57Lrr4_mfojeg1d5tDujHxtR6k",
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;


  const foundAdmin = await admins.findOne({ username });
  if (!foundAdmin) {
    return res.status(400).json({ message: 'Access restricted to admins only' });
  }

  if (foundAdmin.password !== password) {
    return res.status(400).json({ message: 'Invalid admin password credentials' });
  }

  const token = jwt.sign(
    {
      id: foundAdmin._id,
      username: foundAdmin.username,
      email: foundAdmin.email,
      role: 'admin'
    },
    'Secret',
    { expiresIn: '1h' }
  );

  res.json({ token });
});

app.get('/api/articles', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const pageSize = Math.max(1, parseInt(req.query.pageSize) || 6);
    const total = await article.countDocuments();

    // Use the _id field to sort (implicitly sorts by creation date as well)
    const articles = await article.find()
      .sort({ _id: -1 })  // Sort by _id in descending order (newest first)
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

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Ensure `description` is always an array
    let descriptionArray;
    try {
      descriptionArray = JSON.parse(description); // Convert JSON string to array
      if (!Array.isArray(descriptionArray)) {
        throw new Error("Invalid format"); // If not an array, throw error
      }
    } catch (e) {
      descriptionArray = description.split("\n").filter(line => line.trim() !== "");
    }

    cloudinary.uploader.upload_stream({ folder: "Articles" }, async (error, uploadResult) => {
      if (error) return res.status(500).json({ message: "Cloudinary upload failed", error });

      const newArticle = new article({
        title,
        description: descriptionArray, // Ensure stored as array
        imageUrl: uploadResult.secure_url,
      });

      await newArticle.save();
      res.status(201).json(newArticle);
    }).end(req.file.buffer);

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.put("/api/articles/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const articleId = req.params.id;

    if (!title || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Ensure description is an array
    let descriptionArray;
    try {
      descriptionArray = JSON.parse(description);
      if (!Array.isArray(descriptionArray)) throw new Error();
    } catch {
      descriptionArray = description.split("\n").filter(x => x.trim() !== "");
    }

    const updateData = {
      title,
      description: descriptionArray
    };

    // If image is uploaded → update Cloudinary
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "Articles" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }).end(req.file.buffer);
      });

      updateData.imageUrl = uploadResult.secure_url;
    }

    const updatedArticle = await article.findByIdAndUpdate(articleId, updateData, { new: true });

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(updatedArticle);

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.get('/api/articles/latest', async (req, res) => {
  try {
    const articles = await article.find().sort({ _id: -1 }).limit(6);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/articles/all', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const pageSize = Math.max(1, parseInt(req.query.pageSize) || 100);
    const total = await article.countDocuments();

    const articles = await article.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({ articles, total, totalPages: Math.ceil(total / pageSize) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/articles/:id', async (req, res) => {
  try {
    const singleArticle = await article.findById(req.params.id);
    if (!singleArticle) return res.status(404).json({ message: 'Article not found' });
    res.json(singleArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/articles/:id', async (req, res) => {
  try {
    const articles = await article.findById(req.params.id);
    if (!articles) {
      return res.status(404).json({ message: 'Article not found' });
    }

    const imageUrl = articles.imageUrl;
    const publicId = imageUrl.split('/').pop().split('.')[0];

    await cloudinary.uploader.destroy(publicId);

    await article.findByIdAndDelete(req.params.id);

    res.json({ message: 'Article and image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting article', error });
  }
});

app.get('/api/website', async (req, res) => {
  try {
    const newwebsite = await website.findOne();
    res.json(newwebsite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/website', upload.single("image"), async (req, res) => {
  try {
    const {
      aboutus,
      whatsappLink,
      whatsappNumber,
      alamat,
      linkmap,
      instagramName1,
      instagramLink1,
      instagramName2,
      instagramLink2,
      operationalTime,
      email
    } = req.body;

    let existingWebsite = await website.findOne();

    let imageUrl;
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "Website" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }).end(req.file.buffer);
      });
      imageUrl = uploadResult.secure_url;

      if (existingWebsite && existingWebsite.imageUrl) {
        const oldPublicId = existingWebsite.imageUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(oldPublicId);
      }
    }

    if (!existingWebsite) {
      existingWebsite = new website({
        aboutus,
        whatsappLink,
        whatsappNumber,
        alamat,
        linkmap,
        instagramName1,
        instagramLink1,
        instagramName2,
        instagramLink2,
        operationalTime,
        email,
        imageUrl
      });
    } else {
      if (aboutus) existingWebsite.aboutus = aboutus;
      if (whatsappLink) existingWebsite.whatsappLink = whatsappLink;
      if (whatsappNumber) existingWebsite.whatsappNumber = whatsappNumber;
      if (alamat) existingWebsite.alamat = alamat;
      if (linkmap) existingWebsite.linkmap = linkmap;
      if (instagramName1) existingWebsite.instagramName1 = instagramName1;
      if (instagramLink1) existingWebsite.instagramLink1 = instagramLink1;
      if (instagramName2) existingWebsite.instagramName2 = instagramName2;
      if (instagramLink2) existingWebsite.instagramLink2 = instagramLink2;
      if (operationalTime) existingWebsite.operationalTime = operationalTime;
      if (email) existingWebsite.email = email;
      if (imageUrl) existingWebsite.imageUrl = imageUrl;
    }

    await existingWebsite.save();
    res.json(existingWebsite);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
