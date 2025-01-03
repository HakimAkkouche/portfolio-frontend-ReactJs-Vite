import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import {
  Container,
  Grid2 as Grid,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const uploadUrl = `${import.meta.env.VITE_BACKEND_URL}`;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");
        setProjects(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des projets :", err);
        setError("Impossible de charger les projets.");
      }
    };

    fetchProjects();
  }, []);

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!projects.length) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Chargement des projets...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Portfolio
      </Typography>
      <Grid container spacing={4}>
        {projects.map((project) => {
          let descriptionHtml = "";
          try {
            if (project.description.startsWith("{")) {
              const contentState = convertFromRaw(JSON.parse(project.description));
              descriptionHtml = stateToHTML(contentState);
            } else {
              descriptionHtml = project.description; // Utilise directement le texte brut.
            }
          } catch (e) {
            console.error("Erreur lors de la conversion de la description :", e);
            descriptionHtml = "<p>Erreur lors de l'affichage du contenu.</p>";
          }
         

          return (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`${uploadUrl}${project.galleryImages[0]?.filePath}`}
                  alt={project.title}
                  sx={{
                    objectFit: "contain", // Adapte l'image en mode contain
                    backgroundColor: "#f5f5f5", // Ajoute une couleur de fond pour les espaces vides (optionnel)
                  }}
                />
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    dangerouslySetInnerHTML={{
                      __html:
                        descriptionHtml.length > 200
                          ? descriptionHtml.substring(0, 200) + "..."
                          : descriptionHtml,
                    }}
                  />
                </CardContent>
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent: "center",
                      gap: 2,
                    }}
                  >
                    <CardActions>
                        <Button
                          component={Link}
                          to={`/portfolio/${project.id}`}
                          size="small"
                          color="primary"
                        >
                          En savoir plus
                        </Button>
                    </CardActions>
                  </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Portfolio;
