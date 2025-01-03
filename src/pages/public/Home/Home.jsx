import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
  Grid2 as Grid,
  Link as MuiLink,
} from "@mui/material";

const Home = () => {
  const [aboutMe, setAboutMe] = useState(null);
  const [error, setError] = useState(null);
  const uploadUrl = `${import.meta.env.VITE_BACKEND_URL}uploads/`;

  useEffect(() => {
    api
      .get("/about-me")
      .then((response) => {
        setAboutMe(response.data);
        
        console.log(response);
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

  if (!aboutMe) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Chargement des informations...
        </Typography>
      </Container>
    );
  }

  let aboutTextHtml = "";
  try {
    const contentState = convertFromRaw(JSON.parse(aboutMe.aboutText));
    aboutTextHtml = stateToHTML(contentState);
  } catch (e) {
    console.error("Erreur lors de la conversion de aboutText en HTML :", e);
    aboutTextHtml = "<p>Erreur lors de l'affichage du contenu.</p>";
  }

  // Limiter à 600 caractères
  const truncatedText = aboutTextHtml.length > 450 
    ? aboutTextHtml.substring(0, 450) + "..." 
    : aboutTextHtml;

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Grid
        container
        spacing={2}
        alignItems="center"
      >
        {/* Image */}
        <Grid size={{xs:12, md:4}} sm={{ textAlign: { xs: "center", md: "left" } }}>
          <Box
            component="img"
            src={`${uploadUrl}${aboutMe.presentationImage}`}
            alt="Profile"
            sx={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              borderRadius: "8px",
              border: "4px solid #1976d2",
              margin: { xs: "0 auto", md: "0" },
            }}
          />
        </Grid>

        {/* Texte et liens */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ textAlign: "justify" }}>
            <div dangerouslySetInnerHTML={{ __html: truncatedText }} />
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "center",
                gap: 2,
              }}
            >
              {/* Lien "En savoir plus" */}
              {aboutTextHtml.length > 600 && (
                <MuiLink
                  href="/about-me"
                  underline="none"
                  sx={{
                    display: "block",
                    mt: 2,
                    color: "#1976d2",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  En savoir plus
                </MuiLink>
              )}
            </Box>
            {/* Icônes centrées */}
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "center", // Centrage horizontal
                gap: 2,
              }}
            >
              {aboutMe.linkLinkedin && (
                <IconButton
                  component="a"
                  href={aboutMe.linkLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "#0A66C2" }}
                >
                  <img
                    src="/assets/images/linkedin_ico_48.png"
                    alt="LinkedIn"
                    style={{ width: "32px", height: "32px" }}
                  />
                </IconButton>
              )}
              {aboutMe.linkGitHub && (
                <IconButton
                  component="a"
                  href={aboutMe.linkGitHub}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "#171515" }}
                >
                  <img
                    src="/assets/images/github_ico_48.png"
                    alt="GitHub"
                    style={{ width: "32px", height: "32px" }}
                  />
                </IconButton>
              )}
            </Box>
          </Box>
        </Grid>

      </Grid>
    </Container>
  );
};

export default Home;
