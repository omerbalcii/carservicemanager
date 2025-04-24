import React, { useEffect, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axiosconfig from "../utils/axiosconfig";
import { getAxiosHeaders } from "../utils/Utils";
import { ICar } from "../model/ICar";
import { IService } from "../model/IService";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";

export default function ServicesSaveComponent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    carId: "",
  });

  const [cars, setCars] = useState<ICar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axiosconfig
      .get("cars/getallNonPaged", getAxiosHeaders())
      .then((res) => {
        setCars(res.data);
      })
      .catch((err) => {
        console.error("Araç verisi alınamadı:", err);
        setErrorMessage("Araçlar yüklenirken hata oluştu.");
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, description, carId } = formData;

    if (!title || !description || !carId) {
      setErrorMessage("Lütfen tüm alanları doldurun.");
      setError(true);
      return;
    }

    const payload: Partial<IService> = {
      title,
      description,
      car: { id: Number(carId) } as ICar,
    };

    try {
      const res = await axiosconfig.post("services/save", payload, getAxiosHeaders());
      if (res.status === 200 || res.status === 201) {
        navigate("/services");
      }
    } catch (err) {
      console.error("Kayıt hatası:", err);
      setErrorMessage("Servis kaydedilirken bir hata oluştu.");
      setError(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Paper sx={{ p: 3, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          🔧 Servis Kaydı Oluştur
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Başlık"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />

          <TextField
            label="Açıklama"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            required
          />

          <Select
            value={formData.carId}
            onChange={(e) => handleChange("carId", e.target.value)}
            displayEmpty
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          >
            <MenuItem value="">Araç seçin</MenuItem>
            {cars.map((car) => (
              <MenuItem key={car.id} value={car.id}>
                {car.licensePlate} - {car.brand} {car.model}
              </MenuItem>
            ))}
          </Select>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : "Kaydet"}
            </Button>
          </Box>
        </form>
      </Paper>

      <Snackbar open={error} autoHideDuration={3000} onClose={() => setError(false)}>
        <Alert severity="error" onClose={() => setError(false)}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}