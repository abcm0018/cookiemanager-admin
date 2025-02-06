import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

export const CardsControl = ({
  title = "",
  description = "",
  buttonTitle = "",
  bgcolor = "#F5F5F7",
  onButtonClick,
  imageSrc,
}) => {
  return (
    <Card
      sx={{
        width: 438,
        height: 242,
        mr: 3,
        mt: 2,
        bgcolor: bgcolor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardActionArea>
        <CardContent sx={{ textAlign: "center", paddingBottom: "16px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              component="img"
              src={imageSrc}
              alt={title}
              alignContent="left"
              sx={{ width: 146, height: 137, mb: 1, mt: 2 }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "right",
                width: "100%",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold", mb: 1 }}
                textAlign="right"
              >
                {title}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold", color: "text.primary" }}
                textAlign="right"
              >
                {description}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{ justifyContent: "flex-end", width: "100%", paddingRight: 2 }}
      >
        <Button
          size="small"
          sx={{
            color: "primary.main",
            "&:hover": {
              bgcolor: "white",
              color: "secondary.main",
              borderColor: "primary.main",
            },
          }}
          variant="outlined"
          onClick={onButtonClick}
        >
          {buttonTitle}
        </Button>
      </CardActions>
    </Card>
  );
};

CardsControl.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  buttonTitle: PropTypes.string,
  bgcolor: PropTypes.string,
  onButtonClick: PropTypes.func,
  imageSrc: PropTypes.string,
};
