import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import {
  GitHub,
  LinkedIn,
  Twitter,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      icon: <GitHub />,
      url: "https://github.com/ahmetsagdasli",
      color: "#333",
    },
    {
      name: "LinkedIn",
      icon: <LinkedIn />,
      url: "https://linkedin.com/in/ahmetsagdasli",
      color: "#0077b5",
    },
    {
      name: "Twitter",
      icon: <Twitter />,
      url: "https://twitter.com/ahmetsagdasli",
      color: "#1da1f2",
    },
  ];

  const contactInfo = [
    {
      icon: <Email />,
      text: "ahmet@sagdasli.com",
      href: "mailto:ahmet@sagdasli.com",
    },
    {
      icon: <Phone />,
      text: "+90 555 123 45 67",
      href: "tel:+905551234567",
    },
    {
      icon: <LocationOn />,
      text: "İstanbul, Türkiye",
      href: null,
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "grey.900",
        color: "white",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo ve Açıklama */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: "bold",
                background: "linear-gradient(135deg, #42a5f5, #66bb6a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Ahmet Sagdasli
            </Typography>
            
            <Box sx={{ display: "flex", gap: 1 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "white",
                    "&:hover": {
                      color: social.color,
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Hızlı Bağlantılar */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Hızlı Bağlantılar
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {[
                { name: "Ana Sayfa", path: "/" },
                { name: "Hakkımda", path: "/about" },
                { name: "Projeler", path: "/projects" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  color="inherit"
                  underline="hover"
                  sx={{
                    color: "grey.300",
                    "&:hover": {
                      color: "primary.light",
                    },
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* İletişim Bilgileri */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              İletişim
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {contactInfo.map((contact, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Box sx={{ color: "primary.light" }}>{contact.icon}</Box>
                  {contact.href ? (
                    <Link
                      href={contact.href}
                      color="inherit"
                      underline="hover"
                      sx={{
                        color: "grey.300",
                        "&:hover": {
                          color: "primary.light",
                        },
                      }}
                    >
                      {contact.text}
                    </Link>
                  ) : (
                    <Typography variant="body2" sx={{ color: "grey.300" }}>
                      {contact.text}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: "grey.700" }} />

        {/* Alt Kısım */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: "grey.400" }}>
            © {currentYear} Ahmet Sagdasli. Tüm hakları saklıdır.
          </Typography>
          <Typography variant="body2" sx={{ color: "grey.400" }}>
            React & Material-UI ile ❤️ ile geliştirildi
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
