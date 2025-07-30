const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getFeaturedProjects
} = require('../controllers/projectController');

// Genişletilmiş test verisi
const testProjects = [
  {
    _id: '1',
    title: 'E-Ticaret Web Sitesi',
    description: 'Modern ve responsive e-ticaret platformu. Kullanıcı yönetimi, ürün kataloğu, sepet işlemleri ve ödeme entegrasyonu içerir.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Material-UI', 'Express', 'JWT'],
    status: 'completed',
    featured: true,
    demoUrl: 'https://demo-ecommerce.com',
    githubUrl: 'https://github.com/ahmetsagdasli/ecommerce',
    createdAt: new Date('2025-01-15'),
    order: 1
  },
  {
    _id: '2',
    title: 'Task Management App',
    description: 'Takım çalışması için görev yönetim uygulaması. Proje oluşturma, görev atama, zaman takibi ve raporlama özellikleri.',
    technologies: ['React', 'Express', 'PostgreSQL', 'Redux', 'Socket.io'],
    status: 'completed',
    featured: true,
    demoUrl: 'https://demo-taskapp.com',
    githubUrl: 'https://github.com/ahmetsagdasli/taskapp',
    createdAt: new Date('2025-02-20'),
    order: 2
  },
  {
    _id: '3',
    title: 'Blog Platform',
    description: 'Kişisel blog platformu. Makale yazma, kategorilendirme, yorum sistemi ve SEO optimizasyonu.',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'TailwindCSS'],
    status: 'in-progress',
    featured: true,
    demoUrl: 'https://demo-blog.com',
    githubUrl: 'https://github.com/ahmetsagdasli/blog',
    createdAt: new Date('2025-03-10'),
    order: 3
  },
  {
    _id: '4',
    title: 'Weather App',
    description: 'Hava durumu uygulaması. Anlık hava durumu, 7 günlük tahmin ve haritalar.',
    technologies: ['React Native', 'Redux', 'OpenWeather API'],
    status: 'completed',
    featured: false,
    demoUrl: null,
    githubUrl: 'https://github.com/ahmetsagdasli/weather-app',
    createdAt: new Date('2025-01-05'),
    order: 4
  },
  {
    _id: '5',
    title: 'Chat Application',
    description: 'Gerçek zamanlı sohbet uygulaması. Grup sohbetleri, dosya paylaşımı ve emoji desteği.',
    technologies: ['Socket.io', 'Express', 'MongoDB', 'React'],
    status: 'planning',
    featured: false,
    demoUrl: null,
    githubUrl: null,
    createdAt: new Date('2025-03-25'),
    order: 5
  }
];

// MongoDB yoksa test verisi döndür
router.get('/', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        success: true,
        data: testProjects,
        message: 'Test verisi (MongoDB bağlı değil)',
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalProjects: testProjects.length,
          hasNext: false,
          hasPrev: false
        }
      });
    }
    
    await getProjects(req, res);
  } catch (error) {
    res.json({
      success: true,
      data: testProjects,
      message: 'Test verisi (MongoDB hatası)'
    });
  }
});

router.get('/featured', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        success: true,
        data: testProjects.filter(p => p.featured),
        message: 'Test verisi (MongoDB bağlı değil)'
      });
    }
    await getFeaturedProjects(req, res);
  } catch (error) {
    res.json({
      success: true,
      data: testProjects.filter(p => p.featured),
      message: 'Test verisi (MongoDB hatası)'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      const project = testProjects.find(p => p._id === req.params.id);
      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Proje bulunamadı'
        });
      }
      return res.json({
        success: true,
        data: project,
        message: 'Test verisi (MongoDB bağlı değil)'
      });
    }
    await getProject(req, res);
  } catch (error) {
    const project = testProjects.find(p => p._id === req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Proje bulunamadı'
      });
    }
    res.json({
      success: true,
      data: project,
      message: 'Test verisi (MongoDB hatası)'
    });
  }
});

router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

module.exports = router;