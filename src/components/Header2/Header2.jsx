import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./Header2.css"

import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";

const Header2 = () => {

  const [personalInfo, setPersonalInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/personal-info")
      .then((response) => {
        setPersonalInfo(response.data);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des informations :", err);
        setError("Impossible de charger les informations.");
      });
  }, []);

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!personalInfo) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Chargement des informations...
        </Typography>
      </Container>
    );
  }
  return (
    <Box className="portfolio-header header2"
      sx={{
        backgroundColor: "#f5f5f5",
        py: 3,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Titre */}
        <Box>
          <Typography className="header-title"
            variant="h4"
          >
            <Link
              href="/"
              underline="none"
              className="header-link"
            >
               {personalInfo.name}
            </Link>
          </Typography>
        </Box>
        {/* Bouton de contact */}
        <Box>
          <Button
                    className="contact-button"
            variant="contained"
            color="primary"
            href="mailto:akkouche.hakim@gmail.com?subject=Contact%20depuis%20le%20portfolio"
          >
            ME CONTACTER
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Header2;
