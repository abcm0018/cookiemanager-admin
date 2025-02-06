import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { CMenuAdmin } from "./CMenuAdmin";
import { AuthLogo } from "../../admin/components/AuthLogo";

export const NavBarAdmin = () => {
  const pages = [
    { label: "Panel de control", route: "/admin/dashboard" },
    { label: "Suscripciones", route: "/admin/subscriptions" },
    { label: "Usuarios", route: "/admin/users" },
  ];

  const location = useLocation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container>
        <AppBar
          position="static"
          elevation={0}
          sx={{ backgroundColor: "white" }}
        >
          <Toolbar disableGutters>
            <AuthLogo />
            <Box sx={{ flexGrow: 0.08 }} />

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  component={Link}
                  to={page.route}
                  sx={{
                    my: 2,
                    color: "primary.main",
                    display: "block",
                    backgroundColor: location.pathname.includes(page.route)
                      ? "secondary.light"
                      : "transparent",
                  }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <CMenuAdmin />
            </Box>
          </Toolbar>
        </AppBar>
      </Container>
    </Box>
  );
};
