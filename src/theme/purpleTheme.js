import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const purpleTheme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },

    secondary: {
      main: "#FF9800",
    },

    error: {
      main: red.A400,
    },
  },
});
