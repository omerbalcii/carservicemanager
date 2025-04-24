import { useEffect, useState } from "react";
import axiosconfig from "../utils/axiosconfig";
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

export default function CarsComponent() {
  const [cars, setCars] = useState<ICar[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosconfig.get(`cars/getall?page=${page}&pageSize=${rowsPerPage}`, getAxiosHeaders())
      .then((response) => {
        setCars(response.data.items);
        setItemCount(response.data.totalCount);
        setLoading(false);
      });
  }, [page, rowsPerPage]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Plaka</StyledTableCell>
              <StyledTableCell>Marka</StyledTableCell>
              <StyledTableCell>Model</StyledTableCell>
              <StyledTableCell>Güncelle</StyledTableCell>
              <StyledTableCell>Detay</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car) => (
              <StyledTableRow key={car.id}>
                <StyledTableCell>{car.id}</StyledTableCell>
                <StyledTableCell>{car.licensePlate}</StyledTableCell>
                <StyledTableCell>{car.brand}</StyledTableCell>
                <StyledTableCell>{car.model}</StyledTableCell>
                <StyledTableCell>
                  <Link href={`/cars/update?carId=${car.id}`} underline="none">
                    <Button variant="outlined" color="success" size="small">
                      Güncelle
                    </Button>
                  </Link>
                </StyledTableCell>
                <StyledTableCell>
                  <Link href={`/cars/detail?carId=${car.id}`} underline="none">
                    <Button variant="outlined" color="primary" size="small">
                      Detay
                    </Button>
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={itemCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
