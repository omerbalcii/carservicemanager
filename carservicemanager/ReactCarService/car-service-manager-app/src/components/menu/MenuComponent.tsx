import { 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Box, 
  Typography 
} from "@mui/material";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import BuildIcon from "@mui/icons-material/Build";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DriveEtaIcon from "@mui/icons-material/DriveEta";

export default function MenuComponent() {
  const menuItems = [
    { text: "Home", icon: <HomeIcon />, to: "/" },
    { text: "Servis", icon: <BuildIcon />, to: "/services" },
    { text: "Servis Kaydet", icon: <AddBoxIcon />, to: "/services/save" },
    { text: "Arabalar", icon: <DirectionsCarIcon />, to: "/cars" },
    { text: "Araba Kaydet", icon: <DriveEtaIcon />, to: "/cars/save" },
  ];

  // NavLink'in aktif olmasına bağlı stil değişiklikleri için kullanılan temel stil nesnesi
  const navLinkStyle = {
    textDecoration: "none",
    color: "#006600",
    mb: 1,
    borderRadius: "10px",
    px: 1,
    py: 0.5,
    "&.active": {
      backgroundColor: "#cce5cc",
    },
    "&:hover": {
      backgroundColor: "#e0f2e0",
    },
  };

  return (
    <Box
      sx={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#f9f9f9",
        p: 2,
        borderRight: "1px solid #ddd",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <img src="a.png" alt="logo" style={{ width: "100px" }} />
        <Typography variant="h6" sx={{ color: "#006600", mt: 1 }}>
          Teknik Servis
        </Typography>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={NavLink}
            to={item.to}
            sx={navLinkStyle}
          >
            <ListItemIcon sx={{ color: "#006600" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}