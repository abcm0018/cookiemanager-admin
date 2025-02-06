import { Box, Button, Container, Grid2 } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

export const HeadSectionTableUser = () => {
  return (
    <>
      <Grid2
        container
        direction="column"
        sx={{ backgroundColor: "#F5F7F8", padding: 5 }}
      >
        <Container>
          <Box>
            <Grid2 container spacing={2}>
              <Grid2 size={8} alignContent="center">
                <Button
                  size="small"
                  startIcon={<ArrowBack />}
                  href="/admin/dashboard"
                >
                  Volver | Lista de usuarios
                </Button>
              </Grid2>
            </Grid2>
          </Box>
        </Container>
      </Grid2>
    </>
  );
};
