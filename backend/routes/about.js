const express = require('express');
const router = express.Router();
const {
  getAbout,
  createAbout,
  updateAbout,
  getSkills,
  getContact
} = require('../controllers/aboutController');

// @route   GET /api/about
// @desc    Hakkımda bilgilerini getir
// @access  Public
router.get('/', getAbout);

// @route   POST /api/about
// @desc    Hakkımda bilgisi oluştur
// @access  Private (şimdilik public)
router.post('/', createAbout);

// @route   PUT /api/about
// @desc    Hakkımda bilgilerini güncelle
// @access  Private (şimdilik public)
router.put('/', updateAbout);

// @route   GET /api/about/skills
// @desc    Yetenekleri getir
// @access  Public
router.get('/skills', getSkills);

// @route   GET /api/about/contact
// @desc    İletişim bilgilerini getir
// @access  Public
router.get('/contact', getContact);

module.exports = router;