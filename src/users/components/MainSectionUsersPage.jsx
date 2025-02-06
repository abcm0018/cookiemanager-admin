import {
  Box,
  Grid2,
  Paper,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { UserTable } from "./UserTable";
import { useAdminStore } from "../../hooks";
import { useEffect, useState } from "react";
import { HeadSectionTableUser } from "./HeadSectionTableUser";
import Swal from "sweetalert2";

export const MainSectionUsersPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { users, isLoading, startLoadingUsers, errorMessage } = useAdminStore();

  useEffect(() => {
    // if (isPersisted) {
    startLoadingUsers();
  }, []);

  useEffect(() => {
    // Manejo de errores en la carga
    if (errorMessage !== undefined) {
      Swal.fire("Error al cargar los usuarios", errorMessage, "error");
    }
  }, [errorMessage]);

  if (isLoading) return <p>Cargando el listado de usuarios...</p>;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <HeadSectionTableUser />
      <Grid2
        container
        sx={{
          pb: 5,
          pt: 4,
          pl: 10,
          pr: 10,
          display: "flex",
          justifyContent: "center",
        }}
        bgcolor="#F5F7F8"
      >
        <Box sx={{ width: "100%", maxWidth: 1080 }}>
          <Box component="div">
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
              <UserTable users={users} />
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Filas por página:"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
              }
            />
          </Box>
        </Box>
      </Grid2>
    </>
  );
};
