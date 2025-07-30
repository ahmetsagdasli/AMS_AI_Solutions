import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Divider,
  Paper,
  Breadcrumbs,
  Link,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  GitHub,
  Launch,
  ArrowBack,
  CalendarToday,
  Code,
  CheckCircle,
  Schedule,
  PendingActions
} from '@mui/icons-material';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/projects/${id}`);
      if (response.data.success) {
        setProject(response.data.data);
      } else {
        setError('Proje bulunamadı');
      }
    } catch (error) {
      console.error('Proje yüklenirken hata:', error);
      setError('Proje yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle color="success" />;
      case 'in-progress':
        return <Schedule color="warning" />;
      case 'planning':
        return <PendingActions color="info" />;
      default:
        return <Code />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Tamamlandı';
      case 'in-progress':
        return 'Devam Ediyor';
      case 'planning':
        return 'Planlanıyor';
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'warning';
      case 'planning':
        return 'info';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error || !project) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error || 'Proje bulunamadı'}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/projects')}
        >
          Projelere Dön
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link component={RouterLink} to="/" underline="hover">
          Ana Sayfa
        </Link>
        <Link component={RouterLink} to="/projects" underline="hover">
          Projeler
        </Link>
        <Typography color="text.primary">{project.title}</Typography>
      </Breadcrumbs>

      {/* Back Button */}
      <Button
        variant="outlined"
        startIcon={<ArrowBack />}
        onClick={() => navigate('/projects')}
        sx={{ mb: 4 }}
      >
        Projelere Dön
      </Button>

      <Grid container spacing={4}>
        {/* Project Info */}
        <Grid item xs={12} md={8}>
          <MotionCard
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Project Image */}
            <CardMedia
              component="img"
              height="300"
              image={project.imageUrl || "/api/placeholder/800/300"}
              alt={project.title}
              sx={{ objectFit: 'cover' }}
            />
            
            <CardContent sx={{ p: 4 }}>
              {/* Title and Status */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Typography variant="h3" gutterBottom className="text-gradient">
                  {project.title}
                </Typography>
                <Chip
                  icon={getStatusIcon(project.status)}
                  label={getStatusText(project.status)}
                  color={getStatusColor(project.status)}
                  variant="outlined"
                />
              </Box>

              {/* Description */}
              <Typography variant="h6" color="text.secondary" paragraph sx={{ lineHeight: 1.8 }}>
                {project.description}
              </Typography>

              <Divider sx={{ my: 3 }} />

              {/* Project Details */}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <CalendarToday color="primary" />
                    <Typography variant="body1" fontWeight="medium">
                      Oluşturulma Tarihi
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(project.createdAt).toLocaleDateString('tr-TR')}
                  </Typography>
                </Grid>
                
                {project.featured && (
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <CheckCircle color="primary" />
                      <Typography variant="body1" fontWeight="medium">
                        Öne Çıkan Proje
                      </Typography>
                    </Box>
                    <Chip label="Evet" color="primary" size="small" />
                  </Grid>
                )}
              </Grid>

              {/* Long Description (if available) */}
              {project.longDescription && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="h5" gutterBottom>
                    Detaylı Açıklama
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                    {project.longDescription}
                  </Typography>
                </>
              )}
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Box sx={{ position: 'sticky', top: 24 }}>
            {/* Technologies */}
            <MotionCard
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              sx={{ mb: 3 }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Code color="primary" />
                  Kullanılan Teknolojiler
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {project.technologies?.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      variant="outlined"
                      size="small"
                      color="primary"
                    />
                  ))}
                </Box>
              </CardContent>
            </MotionCard>

            {/* Links */}
            <MotionCard
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Proje Bağlantıları
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {project.demoUrl && (
                    <Button
                      variant="contained"
                      startIcon={<Launch />}
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      fullWidth
                    >
                      Canlı Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      variant="outlined"
                      startIcon={<GitHub />}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      fullWidth
                    >
                      GitHub Repo
                    </Button>
                  )}
                  {!project.demoUrl && !project.githubUrl && (
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                      Henüz bağlantı bulunmuyor
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </MotionCard>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProjectDetail;