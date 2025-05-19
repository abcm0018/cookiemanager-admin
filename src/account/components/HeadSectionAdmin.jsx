import { Box, Button, Container, Grid2 } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { CEditAdminDialog } from "./CEditAdminDialog";
import { useState } from "react";
import { useAuthStore } from "../../hooks";

export const HeadSectionAdmin = () => {
  const { user } = useAuthStore();
  const [openEditAdminDialog, setOpenEditAdminDialog] = useState(false);

  // Hook con el la información del dominio a editar
  const [adminToEdit, setAdminToEdit] = useState({});

  const handleOpenEditAdmin = () => {
    console.log("Abriendo el dialogo para añadir dominio");
    setOpenEditAdminDialog(true);
    setAdminToEdit(user);
  };

  const handleCloseEditAdminDialog = () => {
    console.log("Cerrando dialogo de añadir dominio");
    setOpenEditAdminDialog(false);
  };

  return (
    <>
      <Grid2
        container
        direction="column"
        sx={{ backgroundColor: "#F5F7F8", padding: 5 }}
      >
        <Container>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              size="small"
              startIcon={<ArrowBack />}
              href="/admin/dashboard"
            >
              Perfil | {user.name}
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "secondary.main" }}
              onClick={handleOpenEditAdmin}
            >
              Editar perfil
            </Button>
          </Box>
          <CEditAdminDialog
            openEditAdminDialog={openEditAdminDialog}
            handleCloseEditAdminDialog={handleCloseEditAdminDialog}
            adminToEdit={adminToEdit}
          />
        </Container>
      </Grid2>
    </>
  );
};
