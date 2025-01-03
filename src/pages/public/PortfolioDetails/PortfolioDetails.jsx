import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../../services/api";
import Slider from "react-slick";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PortfolioDetails.css";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";

const PortfolioDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const uploadUrl = `${import.meta.env.VITE_BACKEND_URL}`;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${id}`);
        setProject(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des données :", err);
        setError("Projet introuvable");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Chargement des informations...
        </Typography>
      </Container>
    );
  }

  if (error || !project) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <Alert severity="error">{error || "Projet introuvable"}</Alert>
      </Container>
    );
  }

  let descriptionTextHtml = "";
  try {
    const contentState = convertFromRaw(JSON.parse(project.description));
    descriptionTextHtml = stateToHTML(contentState);
  } catch (e) {
    console.error("Erreur lors de la conversion de la description en HTML :", e);
    descriptionTextHtml = "<p>Erreur lors de l'affichage du contenu.</p>";
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (i) => (
      <Box textAlign="center">
        <img
          src={`${uploadUrl}${project.galleryImages[i]?.filePath}`}
          alt={`Miniature ${i + 1}`}
          style={{
            width: "100px",
            height: "60px",
            objectFit: "contain",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </Box>
    ),
    appendDots: (dots) => (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <ul style={{ display: "flex", padding: 0, margin: 0 }}>{dots}</ul>
      </Box>
    ),
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ mb: 2 }}
      >
        Retour
      </Button>

      <Typography variant="h4" align="center" gutterBottom>
        {project.title}
      </Typography>


      <Box sx={{ mt: 4 }}>
        <Typography variant="body1">
          <div dangerouslySetInnerHTML={{ __html: descriptionTextHtml }} />
        </Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        {/* Slider des images */}
        <Slider {...sliderSettings}>
          {project.galleryImages.map((image, index) => (
            <Box key={index}>
              <img
                src={`http://localhost:8080/${image.filePath}`}
                alt={`${index + 1}`}
                style={{
                  width: "100%",
                  height: "420px",
                  objectFit: "contain",
                }}
              />
            </Box>
          ))}
        </Slider>
        <Box className="thumbnail-container"></Box>
      </Box>
    </Container>
  );
};

export default PortfolioDetails;

