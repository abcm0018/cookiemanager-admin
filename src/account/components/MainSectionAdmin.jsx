import { Box, Container, Grid2 } from "@mui/material";
import { CGeneralAdminInfo } from "./CGeneralAdminInfo";
import { HeadSectionAdmin } from "./HeadSectionAdmin";

export const MainSectionAdmin = () => {
  return (
    <>
      <HeadSectionAdmin />
      <Grid2
        container
        direction="column"
        sx={{ backgroundColor: "#F5F7F8", padding: 5 }}
      >
        <Container>
          <Box
            sx={{
              bgcolor: "#FFFFFF",
              boxShadow: 3,
            }}
          >
            <CGeneralAdminInfo />
          </Box>
        </Container>
      </Grid2>
    </>
  );
};
