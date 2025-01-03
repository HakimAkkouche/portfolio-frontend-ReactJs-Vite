import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./Header.css";
import {
  Box,
  Container,
  Avatar,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";

const Header = () => {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [error, setError] = useState(null);
  const uploadUrl = `${import.meta.env.VITE_BACKEND_URL}uploads/`;

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
    <Box className="cover"
    >
      <Container>
        <Avatar
          src={`${uploadUrl}${personalInfo.profileImage}`}
          alt="Profile"
          sx={{
            width: 120,
            height: 120,
            margin: "0 auto",
            border: "4px solid #fff",
          }}
        />
        <Typography variant="h4" sx={{ mt: 2 }}>
          {personalInfo.name}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          {personalInfo.jobTitle}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mt: 2,
          }}
        >
          <IconButton
            component="a"
            href={`mailto:${personalInfo.email}?subject=Contact%20depuis%20le%20portfolio`}
            sx={{ color: "#fff" }}
          >
            <img
              src="/assets/images/email_white_ico_48.png"
              alt="Email"
              style={{ width: 32, height: 32 }}
            />
          </IconButton>
          {personalInfo.linkLinkedin && (
            <IconButton
              component="a"
              href={personalInfo.linkLinkedin}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "#fff" }}
            >
              <img
                src="/assets/images/linkedin_ico_48.png"
                alt="LinkedIn"
                style={{ width: 32, height: 32 }}
              />
            </IconButton>
          )}
          {personalInfo.linkGitHub && (
            <IconButton
              component="a"
              href={personalInfo.linkGitHub}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "#fff" }}
            >
              <img
                src="/assets/images/github_ico_48.png"
                alt="GitHub"
                style={{ width: 32, height: 32 }}
              />
            </IconButton>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
