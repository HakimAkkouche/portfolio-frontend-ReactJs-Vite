import React, { useEffect, useState } from "react";
import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import axiosInstance from "../../../services/axiosConfig";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Alert,
  Stack,
} from "@mui/material";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get("/projects");
        setProjects(response.data);
      } catch (err) {
        setError("Erreur lors de la récupération des projets.");
        console.error(err);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      try {
        await axiosInstance.delete(`/projects/${id}`);
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== id)
        );
      } catch (err) {
        setError("Erreur lors de la suppression du projet.");
        console.error(err);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-project/${id}`);
  };

  return (
    <Box>
      <AdminHeader/>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Tableau de bord
        </Typography>
        <Stack spacing={2} direction="row" sx={{ mb: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/edit-personal-info")}
          >
            Modifier les Informations Personnelles
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/edit-about-me")}
          >
            Modifier la page A propos
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/add-project")}
          >
            Ajouter un projet
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => navigate("/edit-mentions-legales")}
          >
            Modifier les mentions légales
          </Button>
        </Stack>

        <Typography variant="h5" gutterBottom>
          Liste des Projets
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Titre</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>{project.id}</TableCell>
                    <TableCell>{project.title}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(project.id)}
                        sx={{ mr: 1 }}
                      >
                        Éditer
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(project.id)}
                      >
                        Supprimer
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    Aucun projet disponible.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default Dashboard;
