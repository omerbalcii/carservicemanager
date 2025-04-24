import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";

export default function IndexComponent() {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: "#f0f0f0" }}>
      <Paper sx={{ p: 5, textAlign: "center", maxWidth: 600, boxShadow: 5 }}>
        <HomeRepairServiceIcon sx={{ fontSize: 50, color: "#006600", mb: 2 }} />
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#006600" }}>
          Teknik Servis Anasayfası
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: "#333" }}>
          Teknik servis yönetiminizi kolaylaştıran platformumuza hoş geldiniz! Servisleri görüntüleyin, yeni servisler ekleyin ve araçlarınızı yönetin.
        </Typography>
        <Button variant="contained" color="success" sx={{ fontSize: 16, px: 3 }} onClick={() => navigate("/services")}>
          Servisleri Görüntüle
        </Button>
      </Paper>
    </Box>
  );
}