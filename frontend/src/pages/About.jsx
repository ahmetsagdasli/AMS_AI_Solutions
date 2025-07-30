import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  LinearProgress,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  School,
  Work,
  Code,
  Web,
  Storage,
  CloudQueue,
  DevicesOther,
  Psychology
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const About = () => {
  const skills = [
    { name: 'React', level: 90, category: 'Frontend', icon: <Web /> },
    { name: 'JavaScript', level: 95, category: 'Frontend', icon: <Code /> },
    { name: 'Node.js', level: 85, category: 'Backend', icon: <Storage /> },
    { name: 'MongoDB', level: 80, category: 'Database', icon: <Storage /> },
    { name: 'Material-UI', level: 90, category: 'Frontend', icon: <Web /> },
    { name: 'Express.js', level: 85, category: 'Backend', icon: <CloudQueue /> },
  ];

  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'Freelance',
      period: '2024 - Devam Ediyor',
      description: 'Modern web uygulamaları geliştirme'
    },
    {
      title: 'Frontend Developer',
      company: 'Önceki Şirket',
      period: '2023 - 2024',
      description: 'React ve TypeScript ile kullanıcı arayüzü geliştirme'
    }
  ];

  const education = [
    {
      degree: 'Bilgisayar Mühendisliği',
      school: 'Üniversite Adı',
      period: '2020 - 2024',
      description: 'Yazılım geliştirme ve algoritma tasarımı'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Header Section */}
      <MotionBox
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{ textAlign: 'center', mb: 8 }}
      >
        <Avatar
          sx={{
            width: 200,
            height: 200,
            mx: 'auto',
            mb: 4,
            border: '4px solid',
            borderColor: 'primary.main'
          }}
          src="/api/placeholder/200/200"
          alt="Ahmet Sagdasli"
        />
        <Typography variant="h3" gutterBottom className="text-gradient">
          Hakkımda
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Merhaba! Ben Ahmet, tutkulu bir Full Stack Developer'ım. 
          Modern web teknolojileri ile kullanıcı dostu ve performanslı uygulamalar geliştiriyorum.
        </Typography>
      </MotionBox>

      <Grid container spacing={6}>
        {/* Skills Section */}
        <Grid item xs={12} md={6}>
          <MotionCard
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Psychology color="primary" />
                Teknik Yetenekler
              </Typography>
              <Box sx={{ mt: 3 }}>
                {skills.map((skill, index) => (
                  <Box key={skill.name} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ color: 'primary.main', '& svg': { fontSize: 20 } }}>
                          {skill.icon}
                        </Box>
                        <Typography variant="body2" fontWeight="medium">
                          {skill.name}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {skill.level}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={skill.level}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 3,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Experience Section */}
        <Grid item xs={12} md={6}>
          <MotionCard
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Work color="primary" />
                İş Deneyimi
              </Typography>
              <List>
                {experiences.map((exp, index) => (
                  <ListItem key={index} sx={{ px: 0, flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Box sx={{ width: '100%', mb: 1 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {exp.title}
                      </Typography>
                      <Typography variant="body2" color="primary.main" fontWeight="medium">
                        {exp.company}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {exp.period}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {exp.description}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Education Section */}
        <Grid item xs={12}>
          <MotionCard
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <School color="primary" />
                Eğitim
              </Typography>
              <List>
                {education.map((edu, index) => (
                  <ListItem key={index} sx={{ px: 0, flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Box sx={{ width: '100%', mb: 1 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {edu.degree}
                      </Typography>
                      <Typography variant="body2" color="primary.main" fontWeight="medium">
                        {edu.school}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {edu.period}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {edu.description}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </MotionCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;