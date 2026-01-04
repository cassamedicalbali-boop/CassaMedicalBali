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

// LIMIT to 10MB
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

const app = express();
app.use(cors());
app.use(compression());
app.use(parser.json({ limit: '50mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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

// PRIVATE CDN BASE URL
const PRIVATE_CDN_BASE = "https://dccp9q30k-res.cloudinary.com";

// Convert normal Cloudinary URL → Private CDN URL
function convertToPrivateCdn(url) {
  if (!url) return url;
  return url.replace("https://res.cloudinary.com", PRIVATE_CDN_BASE);
}

// ---------------- LOGIN API ----------------
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

// ---------------- GET PAGINATED ARTICLES ----------------
app.get('/api/articles', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const pageSize = Math.max(1, parseInt(req.query.pageSize) || 6);
    const total = await article.countDocuments();

    const articles = await article.find()
      .sort({ _id: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    // Convert to private CDN
    articles.forEach(a => a.imageUrl = convertToPrivateCdn(a.imageUrl));

    res.json({ articles, total, totalPages: Math.ceil(total / pageSize) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ---------------- CREATE ARTICLE ----------------
app.post("/api/articles", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Ensure description is array
    let descriptionArray;
    try {
      descriptionArray = JSON.parse(description);
      if (!Array.isArray(descriptionArray)) throw new Error();
    } catch {
      descriptionArray = description.split("\n").filter(line => line.trim() !== "");
    }

    cloudinary.uploader.upload_stream(
      { folder: "Articles" },
      async (error, uploadResult) => {
        if (error) return res.status(500).json({ message: "Cloudinary upload failed", error });

        const finalUrl = convertToPrivateCdn(uploadResult.secure_url);

        const newArticle = new article({
          title,
          description: descriptionArray,
          imageUrl: finalUrl
        });

        await newArticle.save();
        res.status(201).json(newArticle);
      }
    ).end(req.file.buffer);

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ---------------- UPDATE ARTICLE ----------------
app.put("/api/articles/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const articleId = req.params.id;

    if (!title || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

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

    // If user uploads new picture
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "Articles" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }).end(req.file.buffer);
      });

      updateData.imageUrl = convertToPrivateCdn(uploadResult.secure_url);
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

// ---------------- GET 6 LATEST ARTICLES ----------------
app.get('/api/articles/latest', async (req, res) => {
  try {
    const articles = await article.find().sort({ _id: -1 }).limit(6);
    articles.forEach(a => a.imageUrl = convertToPrivateCdn(a.imageUrl));
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ---------------- GET ALL ARTICLES ----------------
app.get('/api/articles/all', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const pageSize = Math.max(1, parseInt(req.query.pageSize) || 100);
    const total = await article.countDocuments();

    const articles = await article.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    articles.forEach(a => a.imageUrl = convertToPrivateCdn(a.imageUrl));

    res.json({ articles, total, totalPages: Math.ceil(total / pageSize) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ---------------- GET SINGLE ARTICLE ----------------
app.get('/api/articles/:id', async (req, res) => {
  try {
    const singleArticle = await article.findById(req.params.id);
    if (!singleArticle) return res.status(404).json({ message: 'Article not found' });

    singleArticle.imageUrl = convertToPrivateCdn(singleArticle.imageUrl);

    res.json(singleArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ---------------- DELETE ARTICLE ----------------
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

// ---------------- WEBSITE SETTINGS ----------------
app.get('/api/website', async (req, res) => {
  try {
    const newwebsite = await website.findOne();

    if (newwebsite?.imageUrl) {
      newwebsite.imageUrl = convertToPrivateCdn(newwebsite.imageUrl);
    }

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

    // Upload image if user changed it
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "Website" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }).end(req.file.buffer);
      });

      imageUrl = convertToPrivateCdn(uploadResult.secure_url);

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

// ---------------- SITEMAP ----------------
app.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = 'https://cassamedicalbali.com';

    const articles = await article.find().sort({ _id: -1 }).lean();

    const staticRoutes = [
      '',
      'home',
      'service',
      'about-us',
      'contact',
      'article',
      'login',
      'dengue-package',
      'flu-package',
      'hangover-package',
      'immune-package',
      'jetlag-package',
      'belly-package',
      'doctor-consultation',
      'call-service',
      'laboratory-testing',
      'std-testing',
      'wound-treatment',
      'lab-test'
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    staticRoutes.forEach(route => {
      const loc = route === '' ? `${baseUrl}/` : `${baseUrl}/${route}`;
      xml += `
  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    for (const a of articles) {
      const lastmod = a.updatedAt
        ? new Date(a.updatedAt).toISOString()
        : new Date().toISOString();

      xml += `
  <url>
    <loc>${baseUrl}/detail-article/${a._id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }

    xml += `\n</urlset>`;

    res.header('Content-Type', 'application/xml');
    return res.send(xml);

  } catch (error) {
    console.error("Sitemap Error:", error);
    return res.status(500).send("Sitemap generation error.");
  }
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(
`User-agent: *
Allow: /

Sitemap: https://cassamedicalbali.com/sitemap.xml`
  );
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
