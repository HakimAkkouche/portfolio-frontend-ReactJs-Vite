import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import axiosInstance from "../../../services/axiosConfig";
import {
  TextField,
  Container,
  Grid2 as Grid,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Editor,
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import RichTextToolbar from "../../../components/RichTextToolbar/RichTextToolbar";

const EditAboutMe = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText(""))
  );
  const [info, setInfo] = useState({
    about_text: "",
    presentation_image: null,
  });
  const [presentationPreview, setPresentationPreview] = useState(null);
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState("success");
  const [snackbarOpen, setSnackbarOpen] = useState(false); // État pour la visibilité du Snackbar
  const navigate = useNavigate();
  const uploadUrl = `${import.meta.env.VITE_BACKEND_URL}uploads/`;

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axiosInstance.get("/about-me");
        const aboutText = response.data.aboutText
          ? EditorState.createWithContent(convertFromRaw(JSON.parse(response.data.aboutText)))
          : EditorState.createEmpty();

        setInfo({
          ...response.data,
          presentation_image: null,
        });

        setPresentationPreview(`${uploadUrl}${response.data.presentationImage}`);
        setEditorState(aboutText);
      } catch (error) {
        setMessage("Erreur lors du chargement des informations.");
        setSeverity("error");
        setSnackbarOpen(true); // Afficher l'alerte en cas d'erreur
      }
    };

    fetchInfo();
  }, []);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setInfo((prev) => ({ ...prev, [name]: file }));

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        
        setPresentationPreview(reader.result);
        
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const aboutTextRaw = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

    const formData = new FormData();
    formData.append("about_text", aboutTextRaw);
    formData.append("presentation_image", info.presentation_image || null);

    try {
      await axiosInstance.put("/about-me", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Informations mises à jour avec succès.");
      setSeverity("success");
      setSnackbarOpen(true); // Afficher le message de succès
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err.response || err);
      setMessage("Une erreur est survenue lors de la mise à jour.");
      setSeverity("error");
      setSnackbarOpen(true); // Afficher le message d'erreur
    }
  };

  return (
    <div>
      <AdminHeader title="Modifier les Informations Personnelles" />
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
          Modifier la page A propos de moi
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} direction="column">
            <Grid item xs={12}>
              <Typography variant="subtitle1">À propos :</Typography>
              <RichTextToolbar editorState={editorState} setEditorState={setEditorState} />
              <Box sx={{ border: "1px solid #ccc", p: 2, borderRadius: "4px", minHeight: "150px" }}>
                <Editor editorState={editorState} onChange={setEditorState} placeholder="Écrivez ici votre texte..." editorStyle={{ minHeight: '400px' }} />
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography variant="subtitle1">Image de la page d'accueil :</Typography>
              <Button variant="contained" component="label">
                Télécharger une image
                <input type="file" name="presentation_image" onChange={handleFileChange} hidden />
              </Button>
              {presentationPreview && (
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <img
                    src={presentationPreview}
                    alt=""
                    style={{ height: "320px", marginBottom: "16px" }}
                  />
                </Box>
              )}
            </Grid>
          </Grid>
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Button type="submit" variant="contained" color="primary">
              Sauvegarder
            </Button>
          </Box>
        </form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default EditAboutMe;
