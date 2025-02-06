import { Box, Container, Grid2 } from "@mui/material";
import { ControlTabs } from "./ControlTabs";

export const MainSectionPanelControl = () => {
  return (
    <>
      <Grid2
        container
        direction="column"
        sx={{ backgroundColor: "#F5F7F8", padding: 5 }}
      >
        <Container>
          <Box sx={{ mt: 4 }}>
            <ControlTabs />
          </Box>
        </Container>
      </Grid2>
    </>
  );
};
