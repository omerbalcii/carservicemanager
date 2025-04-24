import React, { FormEvent, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosconfig from "../utils/axiosconfig";
import { getAxiosHeaders } from "../utils/Utils";
import { ICar } from "../model/ICar";

export default function CarsSaveComponent() {
  const [car, setCar] = useState<Partial<ICar>>({
    licensePlate: "",
    model: "",
    brand: "",
  });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  // Fonksiyon: Girilen licensePlate'i uppercase yapar ve
  // eğer ilk iki karakter rakamsa, otomatik bir boşluk ekler.
  const formatLicensePlate = (input: string): string => {
    let formatted = input.toUpperCase();
    const firstTwo = formatted.slice(0, 2);
    if (/^\d{2}$/.test(firstTwo)) {
      if (formatted.length === 2) {
        formatted = formatted + " ";
      } else if (formatted.length > 2 && formatted.charAt(2) !== " ") {
        formatted = formatted.slice(0, 2) + " " + formatted.slice(2);
      }
    }
    return formatted;
  };

  const handleChange = (field: keyof ICar, value: string) => {
    // Sadece licensePlate alanında formatlama uygulanacak.
    let newValue = value;
    if (field === "licensePlate") {
      newValue = formatLicensePlate(newValue);
    }
    setCar({ ...car, [field]: newValue });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!car.licensePlate || !car.model || !car.brand) {
      setSnackbarMessage("Tüm alanları doldurunuz.");
      setShowSnackbar(true);
      return;
    }

    try {
      const response = await axiosconfig.post("cars/save", car, getAxiosHeaders());
      if (response.status === 200 || response.status === 201) {
        navigate("/cars");
      }
    } catch (error: any) {
      const errorMsg =
        error?.response?.data?.message || "Kayıt sırasında bir hata oluştu.";
      setSnackbarMessage(errorMsg);
      setShowSnackbar(true);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={3} maxWidth={500} mx="auto" mt={4}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Araç Kaydet
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Plaka"
              fullWidth
              margin="normal"
              value={car.licensePlate}
              onChange={(e) => handleChange("licensePlate", e.target.value)}
              placeholder="Örn: 34 ABC 123"
            />
            <TextField
              label="Marka"
              fullWidth
              margin="normal"
              value={car.brand}
              onChange={(e) => handleChange("brand", e.target.value)}
              placeholder="Örn: Toyota"
            />
            <TextField
              label="Model"
              fullWidth
              margin="normal"
              value={car.model}
              onChange={(e) => handleChange("model", e.target.value)}
              placeholder="Örn: Corolla"
            />
            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Kaydet
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}