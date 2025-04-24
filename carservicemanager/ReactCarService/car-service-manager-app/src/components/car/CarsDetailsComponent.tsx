import { useEffect, useState } from "react";
import axiosconfig from "../utils/axiosconfig";
import { ICar } from "../model/ICar";
import { IService } from "../model/IService";
import { getAxiosHeaders } from "../utils/Utils";
import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Link,
  Divider,
  Card,
  Chip,
} from "@mui/material";

export default function CarsDetailsComponent() {
  const [car, setCar] = useState<ICar | null>(null);
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);

  const id = new URLSearchParams(window.location.search).get("carId");

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosconfig.get(`cars/findById/${id}`, getAxiosHeaders()).then((response) => setCar(response.data));
      axiosconfig.get(`services/filter?carId=${id}`, getAxiosHeaders()).then((response) => setServices(response.data)).finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      {car && (
        <>
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              🚗 Araç Bilgileri
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1"><strong>ID:</strong> {car.id}</Typography>
            <Typography variant="body1"><strong>Plaka:</strong> {car.licensePlate}</Typography>
            <Typography variant="body1"><strong>Marka:</strong> {car.brand}</Typography>
            <Typography variant="body1"><strong>Model:</strong> {car.model}</Typography>
          </Card>

          <Typography variant="h5" gutterBottom>
            🔧 Servis Kayıtları
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {services.length > 0 ? (
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Başlık</TableCell>
                    <TableCell>Açıklama</TableCell>
                    <TableCell>Durum</TableCell>
                    <TableCell>Oluşturulma</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>{service.id}</TableCell>
                      <TableCell>{service.title}</TableCell>
                      <TableCell>{service.description}</TableCell>
                      <TableCell>
                        <Chip
                          label={service.status}
                          color={service.status === "DONE" ? "success" : "warning"}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{new Date(service.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography color="textSecondary" sx={{ mt: 2 }}>
              ❌ Bu araca ait servis kaydı bulunmamaktadır.
            </Typography>
          )}

          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <Link href="/cars" underline="none">
              <Button variant="contained" color="error">
                Geri
              </Button>
            </Link>
          </Box>
        </>
      )}
    </Box>
  );
}