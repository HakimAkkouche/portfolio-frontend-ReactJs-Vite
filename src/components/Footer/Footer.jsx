
import "./Footer.css";

import { Container, Box, Typography, Link } from "@mui/material";
const Footer = () => {
 
  return (

    <Box
    className="admin-header footer"
    component="footer"
    sx={{
      backgroundColor: "#1976d2",
      color: "#fff",
      py: 2,
      mt: 4,
    }}
    >
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
          <Link
            href="/mentions-legales"
            underline="none"
            sx={{ color: "#fff", "&:hover": { textDecoration: "underline" } }}
          >
            Mentions légales
          </Link>
        </Typography>
      </Container>
  </Box>
  
  );
};

export default Footer;
