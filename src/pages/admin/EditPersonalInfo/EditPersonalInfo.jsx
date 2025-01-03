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

const EditPersonalInfo = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText(""))
  );
  const [info, setInfo] = useState({
    email: "",
    phone: "",
    name: "",
    jobTitle: "",
    linkLinkedin: "",
    linkGitHub: "",
    profile_image: null,
  });
  const [profilePreview, setProfilePreview] = useState(null);
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState("success");
  const [snackbarOpen, setSnackbarOpen] = useState(false); // État pour la visibilité du Snackbar
  const navigate = useNavigate();
  const uploadUrl = `${import.meta.env.VITE_BACKEND_URL}uploads/`;

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axiosInstance.get("/personal-info");
        const aboutText = response.data.aboutText
          ? EditorState.createWithContent(convertFromRaw(JSON.parse(response.data.aboutText)))
          : EditorState.createEmpty();

        setInfo({
          ...response.data,
          profile_image: null,
        });

        setProfilePreview(`${uploadUrl}${response.data.profileImage}`);
        setEditorState(aboutText);
      } catch (error) {
        setMessage("Erreur lors du chargement des informations.");
        setSeverity("error");
        setSnackbarOpen(true); // Afficher l'alerte en cas d'erreur
      }
    };

    fetchInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setInfo((prev) => ({ ...prev, [name]: file }));

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append("email", info.email);
    formData.append("phone", info.phone);
    formData.append("name", info.name);
    formData.append("jobTitle", info.jobTitle);
    formData.append("linkLinkedin", info.linkLinkedin);
    formData.append("linkGitHub", info.linkGitHub);
    formData.append("profile_image", info.profile_image || null);

    try {
      await axiosInstance.put("/personal-info", formData, {
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
          Modifier les Informations Personnelles
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} direction="column">
            <Grid item xs={12}>
              <TextField
                label="Nom Prénom"
                name="name"
                value={info.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                name="email"
                value={info.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Téléphone"
                type="tel"
                name="phone"
                value={info.phone}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Métier/Poste"
                name="jobTitle"
                value={info.jobTitle}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Linkedin"
                name="linkLinkedin"
                value={info.linkLinkedin}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="GitHub"
                name="linkGitHub"
                value={info.linkGitHub}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography variant="subtitle1">Image de Profil :</Typography>
              <Button variant="contained" component="label">
                Télécharger une image
                <input type="file" name="profile_image" onChange={handleFileChange} hidden />
              </Button>
              {profilePreview && (
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2, paddingTop: "10px"}}>
                  <img
                    src={profilePreview}
                    alt=""
                    style={{ height: "160px", borderRadius: "8px" }}
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

export default EditPersonalInfo;
