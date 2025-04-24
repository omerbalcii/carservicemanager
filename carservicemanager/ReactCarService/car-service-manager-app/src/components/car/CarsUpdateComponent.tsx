import { useEffect, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axiosconfig from "../utils/axiosconfig";
import { ICar } from "../model/ICar";
import { getAxiosHeaders } from "../utils/Utils";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

export default function CarsUpdateComponent() {
  const id = new URLSearchParams(window.location.search).get("carId");
  const navigate = useNavigate();

  const [car, setCar] = useState<ICar>({
    id: 0,
    licensePlate: "",
    model: "",
    brand: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosconfig.get(`/cars/findById/${id}`, getAxiosHeaders()).then((response) => {
        setCar(response.data);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [id]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    if (!car.licensePlate || !car.model || !car.brand) {
      setError(true);
      setLoading(false);
      return;
    }

    axiosconfig
      .put(`/cars/update/${car.id}`, car, getAxiosHeaders())
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          navigate("/cars");
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Paper sx={{ p: 3, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
           Araç Güncelleme
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Plaka Numarası"
            variant="outlined"
            fullWidth
            margin="normal"
            value={car.licensePlate}
            onChange={(e) => setCar({ ...car, licensePlate: e.target.value })}
            required
          />

          <TextField
            label="Marka"
            variant="outlined"
            fullWidth
            margin="normal"
            value={car.brand}
            onChange={(e) => setCar({ ...car, brand: e.target.value })}
            required
          />

          <TextField
            label="Model"
            variant="outlined"
            fullWidth
            margin="normal"
            value={car.model}
            onChange={(e) => setCar({ ...car, model: e.target.value })}
            required
          />

          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : "Güncelle"}
            </Button>
          </Box>
        </form>
      </Paper>

      <Snackbar open={error} autoHideDuration={3000} onClose={() => setError(false)}>
        <Alert severity="error" onClose={() => setError(false)}>
          Lütfen tüm alanları doldurun!
        </Alert>
      </Snackbar>
    </Box>
  );
}