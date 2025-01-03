import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader/AdminHeader"; // Import du header admin
import axiosInstance from "../../../services/axiosConfig";
import {
  Container,
  Grid2 as Grid,
  Typography,
  Button,
  Box,
  Alert,
} from "@mui/material";
import {
  Editor,
  EditorState,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import RichTextToolbar from "../../../components/RichTextToolbar/RichTextToolbar";

const EditMentionsLegales = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState("success");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axiosInstance.get("/mentions-legales", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const { description } = response.data;

        if (description) {
          setEditorState(
            EditorState.createWithContent(
              convertFromRaw(JSON.parse(description))
            )
          );
        }
      } catch (error) {
        setMessage("Erreur lors du chargement des informations.");
        setSeverity("error");
      }
    };

    fetchInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const descriptionRaw = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );

    const formData = new FormData();
    formData.append("description", descriptionRaw);

    try {
      await axiosInstance.put("/mentions-legales", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Informations mises à jour avec succès.");
      setSeverity("success");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err.response || err);
      setMessage("Une erreur est survenue lors de la mise à jour.");
      setSeverity("error");
    }
  };

  return (
    <div>
      <AdminHeader title="Modifier les Mentions Légales" />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/dashboard"
          sx={{ mb: 2 }}
        >
          Retour
        </Button>
        <Typography variant="h4" align="center" gutterBottom>
          Modifier les mentions légales
        </Typography>
        {message && (
          <Alert severity={severity} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Mentions légales</Typography>
              <RichTextToolbar editorState={editorState} setEditorState={setEditorState} placeholder="Écrivez ici votre texte..."  editorStyle={{ minHeight: '400px' }} />
              <Box
                sx={{
                  border: "1px solid #ccc",
                  p: 2,
                  borderRadius: "4px",
                  minHeight: "150px",
                }}
              >
                <Editor
                  editorState={editorState}
                  onChange={setEditorState}
                />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Button type="submit" variant="contained" color="primary">
              Sauvegarder
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
};

export default EditMentionsLegales;
