const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'İsim gerekli'],
    trim: true,
    maxlength: [50, 'İsim 50 karakterden fazla olamaz']
  },
  title: {
    type: String,
    required: [true, 'Unvan gerekli'],
    trim: true,
    maxlength: [100, 'Unvan 100 karakterden fazla olamaz']
  },
  bio: {
    type: String,
    required: [true, 'Biyografi gerekli'],
    trim: true,
    maxlength: [1000, 'Biyografi 1000 karakterden fazla olamaz']
  },
  skills: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    level: {
      type: Number,
      min: 1,
      max: 100,
      default: 50
    },
    category: {
      type: String,
      enum: ['frontend', 'backend', 'database', 'devops', 'other'],
      default: 'other'
    }
  }],
  profileImage: {
    url: String,
    alt: String
  },
  contact: {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: {
        validator: function(v) {
          return !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: 'Geçerli bir email adresi giriniz'
      }
    },
    phone: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    website: {
      type: String,
      trim: true
    }
  },
  socialLinks: [{
    platform: {
      type: String,
      required: true,
      enum: ['github', 'linkedin', 'twitter', 'instagram', 'youtube', 'other']
    },
    url: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^https?:\/\/.+/.test(v);
        },
        message: 'Geçerli bir URL giriniz'
      }
    },
    username: String
  }],
  experience: [{
    company: {
      type: String,
      required: true,
      trim: true
    },
    position: {
      type: String,
      required: true,
      trim: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: Date,
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      trim: true
    }
  }],
  education: [{
    school: {
      type: String,
      required: true,
      trim: true
    },
    degree: {
      type: String,
      required: true,
      trim: true
    },
    field: {
      type: String,
      trim: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: Date,
    current: {
      type: Boolean,
      default: false
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
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
aboutSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('About', aboutSchema);