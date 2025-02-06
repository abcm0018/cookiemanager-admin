import { Grid2, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { AuthLogo } from "../components";

export const AuthLayout = ({
  children,
  title = "",
  description = "",
  size = 0,
}) => {
  return (
    <Grid2
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    >
      <AuthLogo />
      <Grid2
        className="box-shadow"
        sx={{
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          width: { md: size },
        }}
      >
        <Typography variant="h4" align="center" sx={{ mt: 1 }}>
          {title}
        </Typography>
        <Grid2 sx={{ mt: 3 }}>
          <Typography variant="body1" align="center" sx={{ mb: 1 }}>
            {description}
          </Typography>
        </Grid2>
        {children}
      </Grid2>
    </Grid2>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  size: PropTypes.number,
};
