import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthProvider";
import {
  Container,
  Typography,
  IconButton,
  Box,
} from "@mui/material";

const AdminHeader = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  const handleLogout = () => {
    logOut(); // Supprimer le token
    navigate("/login"); // Rediriger vers la page de connexion
  };

  return (
    <Box className="portfolio-header header2"
        sx={{
          backgroundColor: "#f5f5f5",
          py: 3,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Titre */}
        <Box>
          <Typography className="header-title"
            variant="h4"
            
          >
            Administration
          </Typography>
        </Box>

        {/* Bouton de contact */}
        <Box>
          <IconButton
              onClick={handleLogout}
              variant="contained"
              color="secondary"
              sx={{
                color: "#1976d2",
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "#f5f5f5",
                },
              }}
            >
            <img src="/assets/images/logout_ico_50.png" alt="Déconnexion" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminHeader;
