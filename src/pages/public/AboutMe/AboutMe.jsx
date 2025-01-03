import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import {
    Box,
    Container,
    Avatar,
    Grid2 as Grid,
    Typography,
    CircularProgress,
    Alert,
    IconButton,
    Button,
} from "@mui/material";

const AboutMe = () => {
    const [personalInfo, setPersonalInfo] = useState(null);
    const [personalInfoError, setPersonalInfoError] = useState(null);
    const [aboutMe, setAboutMe] = useState(null);
    const [aboutMeError, setAboutMeError] = useState(null);
  
    useEffect(() => {
      api
        .get("/personal-info")
        .then((response) => {
          setPersonalInfo(response.data);
        })
        .catch((err) => {
          console.error("Erreur lors de la récupération des informations :", err);
          setPersonalInfoError("Impossible de charger les informations.");
        });
    }, []);

    useEffect(() => {
        api
          .get("/about-me")
          .then((response) => {
            setAboutMe(response.data);
          })
          .catch((err) => {
            console.error("Erreur lors de la récupération des informations :", err);
            setAboutMeError("Impossible de charger les informations.");
          });
      }, []);
    if (personalInfoError) {
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
    if (aboutMeError) {
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
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/"
                sx={{ mb: 2 }}
            >
                Retour
            </Button>
            <Grid
            container
            spacing={2}
            alignItems="center"
            >
            <Avatar
            src={`http://localhost:8080/uploads/${personalInfo.profileImage}`}
            alt="Profile"
            sx={{
                width: 120,
                height: 120,
                margin: "0 auto",
                border: "4px solid #fff",
            }}
            />
            <Box>
                <Box dangerouslySetInnerHTML={{ __html: aboutTextHtml }} />
                <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                    {personalInfo.linkLinkedin && (
                    <IconButton
                        component="a"
                        href={personalInfo.linkLinkedin}
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
                    {personalInfo.linkGitHub && (
                    <IconButton
                        component="a"
                        href={personalInfo.linkGitHub}
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
    </Container>
    );
};

export default AboutMe;
