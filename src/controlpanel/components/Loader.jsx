import { Backdrop, Box, CircularProgress } from "@mui/material";

export const Loader = () => {
  return (
    <Box>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};
