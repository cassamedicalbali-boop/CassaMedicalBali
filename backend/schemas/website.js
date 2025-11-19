const mongoose = require('mongoose');

const websiteSchema = mongoose.Schema({
    aboutus: { type: String},
    email: {type: String},
    whatsappLink: { type: String},
    whatsappNumber: { type: String},
    operationalTime: { type: String},
    alamat: { type: String},
    linkmap: { type: String},
    instagramName1: { type: String},
    instagramLink1: { type: String},
    instagramName2: { type: String},
    instagramLink2: { type: String},
    imageUrl: { type: String}
  });

  module.exports = mongoose.model("website", websiteSchema);
