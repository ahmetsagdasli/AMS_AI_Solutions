import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  GitHub,
  Launch,
  KeyboardArrowDown,
  Code,
  Web,
  Storage
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

  const fetchFeaturedProjects = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects/featured`);
      if (response.data.success) {
        setFeaturedProjects(response.data.data);
      }
    } catch (error) {
      console.error('Projeler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const skills = [
    { name: 'Frontend', icon: <Web />, color: '#1976d2' },
    { name: 'Backend', icon: <Code />, color: '#4caf50' },
    { name: 'Database', icon: <Storage />, color: '#ff9800' }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        className="hero-gradient"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          position: 'relative'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ fontWeight: 300, mb: 1 }}
                >
                  Merhaba, Ben
                </Typography>
                <Typography
                  variant="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #ffffff, #e3f2fd)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Ahmet Sagdasli
                </Typography>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ fontWeight: 400, mb: 3, opacity: 0.9 }}
                >
                  Full Stack Developer
                </Typography>
                <Typography
                  variant="h6"
                  paragraph
                  sx={{ opacity: 0.8, lineHeight: 1.6, mb: 4 }}
                >
                  Modern web teknolojileri ile kullanıcı dostu, performanslı ve 
                  ölçeklenebilir uygulamalar geliştiriyorum. React, Node.js ve 
                  MongoDB konularında uzmanım.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/projects"
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      '&:hover': {
                        bgcolor: 'grey.100',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    Projelerimi İncele
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    component={Link}
                    to="/about"
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.1)',
                        borderColor: 'white'
                      }
                    }}
                  >
                    Hakkımda
                  </Button>
                </Box>
              </MotionBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Avatar
                  sx={{
                    width: { xs: 250, md: 350 },
                    height: { xs: 250, md: 350 },
                    border: '4px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                  }}
                  src="/api/placeholder/350/350"
                  alt="Ahmet Sagdasli"
                />
              </MotionBox>
            </Grid>
          </Grid>
        </Container>

        {/* Scroll Down Indicator */}
        <MotionBox
          sx={{
            position: 'absolute',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white'
          }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <KeyboardArrowDown sx={{ fontSize: 40 }} />
        </MotionBox>
      </Box>

      {/* Skills Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          className="text-gradient"
          sx={{ fontWeight: 'bold', mb: 6 }}
        >
          Uzmanlık Alanlarım
        </Typography>
        <Grid container spacing={4}>
          {skills.map((skill, index) => (
            <Grid item xs={12} md={4} key={skill.name}>
              <MotionCard
                className="hover-lift"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                sx={{ textAlign: 'center', p: 3 }}
              >
                <Box
                  sx={{
                    color: skill.color,
                    mb: 2,
                    '& svg': { fontSize: 60 }
                  }}
                >
                  {skill.icon}
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {skill.name}
                </Typography>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Projects Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            className="text-gradient"
            sx={{ fontWeight: 'bold', mb: 6 }}
          >
            Öne Çıkan Projeler
          </Typography>
          <Grid container spacing={4}>
            {loading ? (
              // Loading placeholder
              Array.from({ length: 3 }).map((_, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card sx={{ height: 300 }}>
                    <CardContent>
                      <Typography variant="h6">Yükleniyor...</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : featuredProjects.length > 0 ? (
              featuredProjects.slice(0, 3).map((project, index) => (
                <Grid item xs={12} md={4} key={project._id}>
                  <MotionCard
                    className="hover-lift"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                        {project.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {project.description}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                        {project.technologies?.slice(0, 3).map((tech) => (
                          <Chip key={tech} label={tech} size="small" />
                        ))}
                      </Box>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      {project.demoUrl && (
                        <Button
                          size="small"
                          startIcon={<Launch />}
                          href={project.demoUrl}
                          target="_blank"
                        >
                          Demo
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          size="small"
                          startIcon={<GitHub />}
                          href={project.githubUrl}
                          target="_blank"
                        >
                          GitHub
                        </Button>
                      )}
                    </CardActions>
                  </MotionCard>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography align="center" color="text.secondary">
                  Henüz öne çıkan proje bulunmuyor.
                </Typography>
              </Grid>
            )}
          </Grid>
          {featuredProjects.length > 3 && (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/projects"
              >
                Tüm Projeler
              </Button>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Home;