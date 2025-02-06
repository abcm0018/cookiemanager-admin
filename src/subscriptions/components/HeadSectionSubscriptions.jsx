import { Box, Button, Container, Grid2 } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useState } from "react";
import { CAddSubscriptionDialog } from "./CAddSubscriptionDialog";

export const HeadSectionSubscriptions = () => {
  const [openAddSubscriptionDialog, setOpenAddSubscriptionDialog] =
    useState(false);

  const handleOpenAddDomain = () => {
    console.log("Abriendo el dialogo para añadir suscripcion");
    setOpenAddSubscriptionDialog(true);
  };

  const handleCloseAddDomainDialog = () => {
    console.log("Cerrando dialogo de añadir suscripcion");
    setOpenAddSubscriptionDialog(false);
  };

  return (
    <>
      <Grid2
        container
        direction="column"
        sx={{ backgroundColor: "#F5F7F8", padding: 5 }}
      >
        <Container>
          <Box>
            <Grid2 container alignItems="center" justifyContent="space-between">
              <Grid2>
                <Button
                  size="small"
                  startIcon={<ArrowBack />}
                  href="/admin/dashboard"
                >
                  Volver | Plan de subscripción
                </Button>
              </Grid2>
              <Grid2>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "secondary.main" }}
                  onClick={handleOpenAddDomain}
                >
                  Añadir subscripción
                </Button>
              </Grid2>
            </Grid2>
          </Box>
          <CAddSubscriptionDialog
            openAddSubscriptionDialog={openAddSubscriptionDialog}
            handleCloseAddSubscriptionDialog={handleCloseAddDomainDialog}
          />
        </Container>
      </Grid2>
    </>
  );
};
