const Project = require('../models/Project');

// Tüm projeleri getir
const getProjects = async (req, res) => {
  try {
    const { status, featured, page = 1, limit = 10 } = req.query;
    
    let query = {};
    
    if (status) query.status = status;
    if (featured) query.featured = featured === 'true';
    
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { featured: -1, order: 1, createdAt: -1 }
    };
    
    const projects = await Project.find(query)
      .sort(options.sort)
      .limit(options.limit * 1)
      .skip((options.page - 1) * options.limit);
    
    const total = await Project.countDocuments(query);
    
    res.json({
      success: true,
      data: projects,
      pagination: {
        currentPage: options.page,
        totalPages: Math.ceil(total / options.limit),
        totalProjects: total,
        hasNext: options.page < Math.ceil(total / options.limit),
        hasPrev: options.page > 1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Projeler getirilirken hata oluştu',
      error: error.message
    });
  }
};

// Tek proje getir
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Proje bulunamadı'
      });
    }
    
    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Proje getirilirken hata oluştu',
      error: error.message
    });
  }
};

// Yeni proje oluştur
const createProject = async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    const savedProject = await project.save();
    
    res.status(201).json({
      success: true,
      message: 'Proje başarıyla oluşturuldu',
      data: savedProject
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Proje oluşturulurken hata oluştu',
      error: error.message
    });
  }
};

// Proje güncelle
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Proje bulunamadı'
      });
    }
    
    res.json({
      success: true,
      message: 'Proje başarıyla güncellendi',
      data: project
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Proje güncellenirken hata oluştu',
      error: error.message
    });
  }
};

// Proje sil
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Proje bulunamadı'
      });
    }
    
    res.json({
      success: true,
      message: 'Proje başarıyla silindi'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Proje silinirken hata oluştu',
      error: error.message
    });
  }
};

// Öne çıkan projeleri getir
const getFeaturedProjects = async (req, res) => {
  try {
    const projects = await Project.find({ featured: true, status: 'completed' })
      .sort({ order: 1, createdAt: -1 })
      .limit(6);
    
    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Öne çıkan projeler getirilirken hata oluştu',
      error: error.message
    });
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getFeaturedProjects
};