import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../services/axiosConfig";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  Alert,
  Grid2 as Grid,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Editor,
  EditorState,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import RichTextToolbar from "../../../components/RichTextToolbar/RichTextToolbar";

const AddProject = () => {
  const { id } = useParams();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [project, setProject] = useState({
    title: "",
    link: "",
    galleryImages: [],
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState("success");
  const navigate = useNavigate();
  const uploadUrl = `${import.meta.env.VITE_BACKEND_URL}`;

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        try {
          const response = await axiosInstance.get(`/projects/${id}`);
          const { title, description, link, galleryImages } = response.data;

          setProject({ title, link });
          setExistingImages(galleryImages || []);
          if (description) {
            setEditorState(
              EditorState.createWithContent(convertFromRaw(JSON.parse(description)))
            );
          }
        } catch (error) {
          console.error("Erreur lors du chargement du projet :", error);
          setMessage("Erreur lors du chargement des données.");
          setSeverity("error");
        }
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };

  const handleDeleteSelectedImage = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  const handleDeleteImage = async (imageId) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette image ?")) {
      try {
        await axiosInstance.delete(`/projects/images/${imageId}`);
        setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
        setMessage("Image supprimée avec succès.");
        setSeverity("success");
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        setMessage("Erreur lors de la suppression de l'image.");
        setSeverity("error");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const descriptionRaw = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

    const formData = new FormData();
    formData.append("title", project.title);
    formData.append("description", descriptionRaw);
    formData.append("link", project.link);

    selectedFiles.forEach((file) => {
      formData.append("galleryImages", file);
    });

    try {
      if (id) {
        await axiosInstance.put(`/projects/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Projet modifié avec succès.");
      } else {
        await axiosInstance.post("/projects", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Projet ajouté avec succès.");
      }

      setSeverity("success");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error.response || error);
      setMessage("Une erreur est survenue.");
      setSeverity("error");
    }
  };

  return (
    <Box>
      <AdminHeader title="Tableau de bord" />
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
            {id ? "Modifier un Projet" : "Ajouter un Projet"}
        </Typography>

        {message && (
            <Alert severity={severity} sx={{ mb: 2 }}>
            {message}
            </Alert>
        )}

        <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
            <TextField
                label="Titre"
                name="title"
                value={project.title}
                onChange={handleChange}
                fullWidth
                required
            />

            <Box>
                <Typography variant="h6">Description</Typography>
                <RichTextToolbar editorState={editorState} setEditorState={setEditorState} />
                <Box sx={{ border: "1px solid #ccc", borderRadius: "4px", p: 2 }}>
                  <Editor editorState={editorState} onChange={setEditorState} placeholder="Écrivez ici votre texte..." editorStyle={{ minHeight: '400px' }} />
                </Box>
            </Box>

            <TextField
                label="Lien"
                name="link"
                value={project.link}
                onChange={handleChange}
                fullWidth
                required
            />

            <Box>
                <Button
                component="label"
                variant="contained"
                startIcon={<AddPhotoAlternateIcon />}
                >
                Ajouter des images
                <input type="file" multiple hidden onChange={handleFileChange} />
                </Button>
            </Box>

            
            <Divider />

            <Typography variant="h6">Nouvelles images</Typography>
            <Grid container spacing={2}>
                {imagePreviews.map((preview, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Box>
                    <img
                        src={preview}
                        alt="Nouvelle prévisualisation"
                        style={{ maxHeight: "400px", borderRadius: "8px" }}
                    />
                    <IconButton
                        color="error"
                        onClick={() => handleDeleteSelectedImage(index)}
                    >
                        <DeleteIcon />
                    </IconButton>
                    </Box>
                </Grid>
                ))}
            </Grid>

            <Divider />

            <Typography variant="h6">Images existantes</Typography>
            <Grid container spacing={2}>
                {existingImages.map((image) => (
                <Grid item xs={12} sm={6} md={4} key={image.id}>
                    <Box >
                    <img
                        src={`${uploadUrl}${image.filePath}`}
                        alt="Fichier existant"
                        style={{ maxHeight: "400px", borderRadius: "8px" }}
                    />
                    <IconButton
                        color="error"
                        onClick={() => handleDeleteImage(image.id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                    </Box>
                </Grid>
                ))}
            </Grid>

            <Button type="submit" variant="contained" fullWidth>
                {id ? "Sauvegarder" : "Ajouter"}
            </Button>
            </Stack>
        </form>
        </Container>
    </Box>
  );
};

export default AddProject;
