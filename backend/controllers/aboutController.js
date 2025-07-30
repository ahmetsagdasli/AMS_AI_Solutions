const About = require('../models/About');

// About bilgilerini getir
const getAbout = async (req, res) => {
  try {
    const about = await About.findOne({ isActive: true });
    
    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'Hakkımda bilgisi bulunamadı'
      });
    }
    
    res.json({
      success: true,
      data: about
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Hakkımda bilgisi getirilirken hata oluştu',
      error: error.message
    });
  }
};

// About bilgilerini oluştur
const createAbout = async (req, res) => {
  try {
    // Önce aktif olan varsa pasif yap
    await About.updateMany({}, { isActive: false });
    
    const about = new About({
      ...req.body,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    const savedAbout = await about.save();
    
    res.status(201).json({
      success: true,
      message: 'Hakkımda bilgisi başarıyla oluşturuldu',
      data: savedAbout
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Hakkımda bilgisi oluşturulurken hata oluştu',
      error: error.message
    });
  }
};

// About bilgilerini güncelle
const updateAbout = async (req, res) => {
  try {
    const about = await About.findOneAndUpdate(
      { isActive: true },
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'Güncellenecek hakkımda bilgisi bulunamadı'
      });
    }
    
    res.json({
      success: true,
      message: 'Hakkımda bilgisi başarıyla güncellendi',
      data: about
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Hakkımda bilgisi güncellenirken hata oluştu',
      error: error.message
    });
  }
};

// Yetenekleri getir
const getSkills = async (req, res) => {
  try {
    const about = await About.findOne({ isActive: true }).select('skills');
    
    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'Yetenekler bulunamadı'
      });
    }
    
    // Kategorilere göre grupla
    const skillsByCategory = about.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});
    
    res.json({
      success: true,
      data: {
        all: about.skills,
        byCategory: skillsByCategory
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Yetenekler getirilirken hata oluştu',
      error: error.message
    });
  }
};

// İletişim bilgilerini getir
const getContact = async (req, res) => {
  try {
    const about = await About.findOne({ isActive: true })
      .select('contact socialLinks');
    
    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'İletişim bilgileri bulunamadı'
      });
    }
    
    res.json({
      success: true,
      data: {
        contact: about.contact,
        socialLinks: about.socialLinks
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'İletişim bilgileri getirilirken hata oluştu',
      error: error.message
    });
  }
};

module.exports = {
  getAbout,
  createAbout,
  updateAbout,
  getSkills,
  getContact
};