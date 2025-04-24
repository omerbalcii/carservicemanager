import { useEffect, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axiosconfig from "../utils/axiosconfig";
import { IService } from "../model/IService";
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
  MenuItem
} from "@mui/material";

export default function ServicesUpdateComponent() {
  const id = new URLSearchParams(window.location.search).get("serviceId");
  const navigate = useNavigate();

  const [service, setService] = useState<IService>({
    id: 0,
    title: "",
    description: "",
    status: "PENDING",
    createdAt: new Date(),
    car: {
      id: 0,
      licensePlate: "",
      model: "",
      brand: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosconfig
        .get(`/services/findById/${id}`, getAxiosHeaders())
        .then((response) => {
          setService(response.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setError(true);
        });
    } else {
      navigate("/services");
    }
  }, [id, navigate]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Basit validasyon: Gerekli alanlar dolu mu?
    if (!service.title || !service.description || !service.status) {
      setError(true);
      return;
    }
    setLoading(true);
    axiosconfig
      .put(`/services/update/${service.id}`, service, getAxiosHeaders())
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          navigate("/services");
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Paper sx={{ p: 3, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          Servis Güncelleme
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Başlık"
            variant="outlined"
            fullWidth
            margin="normal"
            value={service.title}
            onChange={(e) =>
              setService({ ...service, title: e.target.value })
            }
            required
          />
          <TextField
            label="Açıklama"
            variant="outlined"
            fullWidth
            margin="normal"
            value={service.description}
            onChange={(e) =>
              setService({ ...service, description: e.target.value })
            }
            required
          />
          <TextField
            label="Durum"
            variant="outlined"
            fullWidth
            margin="normal"
            select
            value={service.status}
            onChange={(e) =>
              setService({
                ...service,
                status: e.target.value as "PENDING" | "IN_PROGRESS" | "DONE",
              })
            }
            required
          >
            <MenuItem value="PENDING">PENDING</MenuItem>
            <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
            <MenuItem value="DONE">DONE</MenuItem>
          </TextField>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Güncelle"}
            </Button>
          </Box>
        </form>
      </Paper>
      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setError(false)}>
          Lütfen tüm alanları doldurun!
        </Alert>
      </Snackbar>
    </Box>
  );
}