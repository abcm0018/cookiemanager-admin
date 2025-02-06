import { Box, Container, Paper, Typography } from "@mui/material";

export const Footer = () => {
  const fecha = new Date();
  return (
    <Paper
      sx={{
        marginTop: "calc(10% + 60px)",
        width: "100%",
        position: "fixed",
        bottom: 0,
      }}
      component="footer"
      square
      variant="elevation"
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            mb: 2,
            mt: 2,
          }}
        >
          <Typography variant="body" color="initial">
            Copyright © {`${fecha.getFullYear()}`} CookieManager. Todos los
            derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
};
