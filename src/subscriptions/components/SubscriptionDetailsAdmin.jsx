import PropTypes from "prop-types";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid2,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import { useSubscriptionStore } from "../../hooks";

export const SubscriptionDetailsAdmin = ({
  planType = "",
  description = "",
  price = "",
  maxDomains = "",
  buttonTitle1 = "Modificar",
  buttonTitle2 = "Eliminar",
  handleUpdateSubscription,
}) => {
  const { startDeletingSubscription, errorMessage } = useSubscriptionStore();

  const handleDeleteSubscription = (planType) => {
    Swal.fire({
      title: "Estás a punto de eliminar una suscripción, ¿Estás seguro?",
      text: "Esta acción no podrá ser revertida",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        startDeletingSubscription(planType);
        Swal.fire({
          title: "Suscripción Eliminada",
          text: "La suscripción ha sido eliminada correctamente.",
          icon: "success",
        });
      }
    });
  };

  return (
    <Grid2>
      <Card
        sx={{
          minWidth: 275,
          width: 300,
          bgcolor: "#F5F7F8",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: 250,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            fontWeight="bold"
          >
            {planType}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
            {description}
          </Typography>
          <Typography
            variant="h5"
            sx={{ pt: 2, color: "text.primary", fontWeight: "bold" }}
          >
            {price} €uros/mes
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography
            component="ul"
            sx={{ color: "text.secondary", pl: 2, mb: 3 }}
          >
            <li>El número máximo de dominios permitidos es: {maxDomains}</li>
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center", p: 2, pt: 0 }}>
          <Button
            size="small"
            fullWidth
            sx={{
              bgcolor: "secondary.main",
              color: "white",
              mt: -3,
            }}
            variant="contained"
            onClick={handleUpdateSubscription}
          >
            {buttonTitle1}
          </Button>
          <Button
            size="small"
            fullWidth
            sx={{
              bgcolor: "primary.main",
              color: "white",
              mt: -3,
            }}
            variant="contained"
            onClick={() => handleDeleteSubscription(planType)}
          >
            {buttonTitle2}
          </Button>
        </CardActions>
      </Card>
    </Grid2>
  );
};

SubscriptionDetailsAdmin.propTypes = {
  planType: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  maxDomains: PropTypes.number.isRequired,
  buttonTitle1: PropTypes.string.isRequired,
  buttonTitle2: PropTypes.string.isRequired,
  handleUpdateSubscription: PropTypes.func.isRequired,
};
