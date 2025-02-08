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
          rotate: "45 deg",
        }}
      />
      <Typography
        variant="h4"
        align="center"
        sx={{ mb: 1, mt: 3, color: "white", fontStyle: "italic" }}
      >
        Cookie
      </Typography>
      <Typography
        variant="h4"
        align="center"
        sx={{ mt: 3, color: "white", fontStyle: "italic" }}
      >
        Manager
      </Typography>
      <Typography
        variant="h4"
        align="center"
        sx={{ mt: 3, color: "secondary.main", fontStyle: "italic" }}
      >
        Admin
      </Typography>
    </Grid2>
  );
};
