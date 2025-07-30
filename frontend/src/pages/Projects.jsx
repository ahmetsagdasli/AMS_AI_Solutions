import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  CircularProgress
} from '@mui/material';
import { GitHub, Launch } from '@mui/icons-material';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);
      if (response.data.success) {
        setProjects(response.data.data);
      }
    } catch (error) {
      console.error('Projeler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        className="text-gradient"
        sx={{ fontWeight: 'bold', mb: 6 }}
      >
        Projelerim
      </Typography>
      
      <Grid container spacing={4}>
        {projects.length > 0 ? (
          projects.map((project) => (
            <Grid item xs={12} md={6} lg={4} key={project._id}>
              <Card className="hover-lift" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {project.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                    {project.technologies?.map((tech) => (
                      <Chip key={tech} label={tech} size="small" />
                    ))}
                  </Box>
                  <Chip 
                    label={project.status} 
                    color={project.status === 'completed' ? 'success' : 'warning'}
                    size="small"
                  />
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
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography align="center" color="text.secondary" variant="h6">
              Henüz proje bulunmuyor.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Projects;