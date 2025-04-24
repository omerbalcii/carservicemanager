import { useEffect, useState } from "react";
import axiosconfig from "../utils/axiosconfig";
import { IService } from "../model/IService";
import { ICar } from "../model/ICar";
import { getAxiosHeaders } from "../utils/Utils";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Link,
  Select,
  MenuItem,
  Chip,
  Typography,
  Divider,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ServicesComponent() {
  // State'ler
  const [services, setServices] = useState<IService[]>([]);
  const [filteredServices, setFilteredServices] = useState<IService[] | null>(null);
  const [itemCount, setItemCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  // Filtre alanları:
  // "carFilter" artık dropdown'dan seçilecek ve değeri aracın ID'si olacak.
  const [carFilter, setCarFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  // Dropdown için araç listesini saklayacağız.
  const [availableCars, setAvailableCars] = useState<ICar[]>([]);

  // Sayfalı (paged) servis verilerini çekiyoruz (filtre yapılmamışsa)
  useEffect(() => {
    if (filteredServices === null) {
      setLoading(true);
      axiosconfig
        .get(`services/getall?page=${page}&pageSize=${rowsPerPage}`, getAxiosHeaders())
        .then((response) => {
          setServices(response.data.items);
          setItemCount(response.data.totalCount);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [page, rowsPerPage, filteredServices]);

  // Mevcut araçları listeleyen endpoint (ör: getallNonPaged) üzerinden araç listesini yüklüyoruz.
  useEffect(() => {
    axiosconfig
      .get("cars/getallNonPaged", getAxiosHeaders())
      .then((response) => {
        // Backend'in döndürdüğü yapı, veriler direkt liste olabilir.
        setAvailableCars(response.data);
      })
      .catch((error) => {
        console.error("Araç verileri alınırken hata oluştu:", error);
      });
  }, []);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filtre uygulama: Seçilen aracın ID'sini backend'e gönderiyoruz.
  const handleSearch = () => {
    setLoading(true);
    let url = "services/filter?";
    if (carFilter) {
      url += `carId=${carFilter}&`;
    }
    if (statusFilter) {
      url += `status=${statusFilter}&`;
    }
    url = url.endsWith("&") ? url.slice(0, -1) : url;
    axiosconfig
      .get(url, getAxiosHeaders())
      .then((response) => {
        setFilteredServices(response.data); // Backend endpoint direkt liste döndürüyor.
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  // Filtreleri temizleme; filteredServices -> null olduğunda sayfalı veri moduna dönülüyor.
  const handleClearFilters = () => {
    setCarFilter("");
    setStatusFilter("");
    setFilteredServices(null);
    setPage(0);
  };

  const servicesToDisplay = filteredServices !== null ? filteredServices : services;

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      <Typography variant="h5" gutterBottom>
        🔧 Servis Kayıtları
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {/* Filtre Alanı */}
      <Box display="flex" gap={2} mb={3}>
        <FormControl fullWidth>
          <InputLabel id="car-filter-label">Araç Seçin</InputLabel>
          <Select
            labelId="car-filter-label"
            label="Araç Seçin"
            value={carFilter}
            onChange={(e) => {
              setCarFilter(e.target.value);
              setPage(0);
            }}
          >
            <MenuItem value="">
              <em>Tümü</em>
            </MenuItem>
            {availableCars.map((car) => (
              <MenuItem key={car.id} value={car.id}>
                {car.licensePlate} - {car.brand} {car.model}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="status-filter-label">Durum Seçin</InputLabel>
          <Select
            labelId="status-filter-label"
            label="Durum Seçin"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(0);
            }}
          >
            <MenuItem value="">
              <em>Tümü</em>
            </MenuItem>
            <MenuItem value="PENDING">PENDING</MenuItem>
            <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
            <MenuItem value="DONE">DONE</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Ara
        </Button>
        {filteredServices !== null && (
          <Button variant="outlined" color="secondary" onClick={handleClearFilters}>
            Temizle
          </Button>
        )}
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : servicesToDisplay.length > 0 ? (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Başlık</StyledTableCell>
                  <StyledTableCell>Açıklama</StyledTableCell>
                  <StyledTableCell>Durum</StyledTableCell>
                  <StyledTableCell>Araç Plakası</StyledTableCell>
                  <StyledTableCell>Güncelle</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {servicesToDisplay.map((service) => (
                  <StyledTableRow key={service.id}>
                    <StyledTableCell>{service.id}</StyledTableCell>
                    <StyledTableCell>{service.title}</StyledTableCell>
                    <StyledTableCell>{service.description}</StyledTableCell>
                    <StyledTableCell>
                      <Chip
                        label={service.status}
                        color={
                          service.status === "DONE"
                            ? "success"
                            : service.status === "IN_PROGRESS"
                            ? "warning"
                            : "error"
                        }
                        variant="outlined"
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      {service.car ? service.car.licensePlate : "N/A"}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Link href={`/services/update?serviceId=${service.id}`} underline="none">
                        <Button variant="outlined" color="success" size="small">
                          Güncelle
                        </Button>
                      </Link>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <Typography color="textSecondary" sx={{ mt: 2 }}>
          ❌ Filtrene uyan sonuç bulunamadı.
        </Typography>
      )}

      {filteredServices === null && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={itemCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Box>
  );
}