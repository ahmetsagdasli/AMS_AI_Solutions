const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static dosyalar için
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB bağlantısı - deprecated options kaldırıldı
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
.then(() => console.log('✅ MongoDB bağlantısı başarılı'))
.catch((err) => {
  console.log('⚠️  MongoDB bağlantı hatası (Normal - henüz MongoDB kurulu değil)');
  console.log('💡 Şimdilik MongoDB olmadan çalışacağız');
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend çalışıyor!', 
    timestamp: new Date().toISOString(),
    author: 'ahmetsagdasli',
    date: '2025-07-29',
    status: 'active',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Ana sayfa route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Portfolio Backend API', 
    version: '1.0.0',
    author: 'ahmetsagdasli',
    endpoints: {
      projects: '/api/projects',
      about: '/api/about',
      test: '/api/test'
    },
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// API Routes
app.use('/api/projects', require('./routes/projects'));
app.use('/api/about', require('./routes/about'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route bulunamadı',
    requestedPath: req.path
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Sunucu hatası',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portunda çalışıyor`);
  console.log(`📋 Test URL: http://localhost:${PORT}/api/test`);
  console.log(`🏠 Ana Sayfa: http://localhost:${PORT}/`);
  console.log(`📊 Projeler: http://localhost:${PORT}/api/projects`);
  console.log(`👤 Hakkımda: http://localhost:${PORT}/api/about`);
  console.log(`⏰ Başlatma Zamanı: ${new Date().toLocaleString('tr-TR')}`);
  console.log(`💡 MongoDB kurulumu için: https://www.mongodb.com/try/download/community`);
});