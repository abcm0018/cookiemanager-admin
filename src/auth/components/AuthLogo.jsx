import { CookieRounded } from "@mui/icons-material";
import { Grid2, Typography } from "@mui/material";

export const AuthLogo = () => {
  return (
    <Grid2 container>
      <CookieRounded
        fontSize="large"
        sx={{
          mb: 1,
          mt: 3,
          mr: 0.2,
          color: "secondary.main",
          rotate: "45deg",
        }}
      />
      <Typography
        variant="h4"
        align="center"
        sx={{ mb: 1, mt: 3, color: "white" }}
      >
        Cookie
      </Typography>
      <Typography
        variant="h4"
        align="center"
        sx={{ mt: 3, color: "secondary.main" }}
      >
        Manager
      </Typography>
    </Grid2>
  );
};
