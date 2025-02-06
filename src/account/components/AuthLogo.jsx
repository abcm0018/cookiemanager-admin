import { CookieRounded } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const AuthLogo = () => {
  return (
    <Link
      to="admin/control"
      style={{
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
      }}
    >
      <CookieRounded
        fontSize="large"
        sx={{ color: "secondary.main", rotate: "45deg" }}
      />
      <Typography variant="h5" component="div" sx={{ color: "secondary.main" }}>
        Cookie
      </Typography>
      <Typography
        variant="h5"
        component="div"
        sx={{ flexGrow: 0.1, color: "primary.main" }}
      >
        Manager
      </Typography>
    </Link>
  );
};
