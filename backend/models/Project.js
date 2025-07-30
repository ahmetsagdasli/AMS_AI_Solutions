const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Proje başlığı gerekli'],
    trim: true,
    maxlength: [100, 'Başlık 100 karakterden fazla olamaz']
  },
  description: {
    type: String,
    required: [true, 'Proje açıklaması gerekli'],
    trim: true,
    maxlength: [500, 'Açıklama 500 karakterden fazla olamaz']
  },
  longDescription: {
    type: String,
    trim: true,
    maxlength: [2000, 'Detaylı açıklama 2000 karakterden fazla olamaz']
  },
  technologies: [{
    type: String,
    trim: true
  }],
  images: [{
    url: String,
    alt: String,
    isMain: {
      type: Boolean,
      default: false
    }
  }],
  demoUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Geçerli bir URL giriniz'
    }
  },
  githubUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Geçerli bir GitHub URL giriniz'
    }
  },
  status: {
    type: String,
    enum: ['development', 'completed', 'archived'],
    default: 'development'
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update edildiğinde updatedAt'i güncelle
projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index'ler
projectSchema.index({ featured: -1, order: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Project', projectSchema);