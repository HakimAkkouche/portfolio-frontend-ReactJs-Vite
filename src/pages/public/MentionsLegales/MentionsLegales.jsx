import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { Link } from "react-router-dom";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import {
    Box,
    Container,
    Typography,
    CircularProgress,
    Alert,
    Button,
} from "@mui/material";

const MentionsLegales = () => {
    const [mentionsLegales, setMentionsLegales] = useState(null);
    const [error, setError] = useState(null);
   
    //const response = await api.get("/public/personal-info", config);
    useEffect(() => {
        api.get('/mentions-legales').then(response => {
            setMentionsLegales(response.data)
    }).catch ((err) => {
        console.error("Erreur lors de la récupération des informations :", err);
        setError("Impossible de charger les informations. " + err ); // Définit un message d'erreur
    })
    }, []);

    if (error) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }
    if (!mentionsLegales) {
        return (
            <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
                <CircularProgress />
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Chargement des informations...
                </Typography>
            </Container>
        );
    }
    let descriptionHtml = "";

    try {
        const contentState = convertFromRaw(JSON.parse(mentionsLegales.description));
        descriptionHtml = stateToHTML(contentState);
    } catch (e) {
        console.error("Erreur lors de la conversion de aboutText en HTML :", e);
        descriptionHtml = "<p>Erreur lors de l'affichage du contenu.</p>";
    }

  return (
    <Container maxWidth="md" sx={{mt: 6}}>
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
            Mentions légales
        </Typography>
        <Box dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
    </Container>
  );
};

export default MentionsLegales;
