import PropTypes from "prop-types";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useForm, useSubscriptionStore } from "../../hooks";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { CDialogSubscriptionForm } from "./CDialogSubscriptionForm";
import { addSubscriptionForm } from "../../account/utils";

export const CAddSubscriptionDialog = ({
  openAddSubscriptionDialog,
  handleCloseAddSubscriptionDialog,
}) => {
  const { startSavingSubscription, errorMessage } = useSubscriptionStore();

  const {
    planTypeSubscription,
    descriptionSubscription,
    characteristic1Subscription,
    characteristic2Subscription,
    priceSubscription,
    maxDomainsSubscription,
    onInputChange: onSubscriptionChange,
  } = useForm(addSubscriptionForm);

  const onSubscriptionSubmit = (event) => {
    event.preventDefault();
    startSavingSubscription({
      planType: planTypeSubscription,
      description: descriptionSubscription,
      characteristic1: characteristic1Subscription,
      characteristic2: characteristic2Subscription,
      price: priceSubscription,
      maxDomains: maxDomainsSubscription,
    });
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en los datos de la suscripción", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <Box>
      <Dialog
        fullWidth
        maxWidth="md"
        open={openAddSubscriptionDialog}
        onClose={handleCloseAddSubscriptionDialog}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            onSubscriptionSubmit(event);
            handleCloseAddSubscriptionDialog();
          },
        }}
      >
        <DialogTitle sx={{ pl: 8, pr: 8 }}>Añadir suscripción</DialogTitle>
        <DialogContent sx={{ pl: 8, pr: 8 }}>
          <DialogContentText color="primary.main">
            Completa los campos a continuación para agregar una nueva
            suscripción.
          </DialogContentText>
          <DialogContentText sx={{ mt: 2 }} color="primary.main">
            Especifica la información necesaria como el tipo de plan, precio y
            características clave de la suscripción.
          </DialogContentText>
          <CDialogSubscriptionForm
            planTypeSubscription={planTypeSubscription}
            descriptionSubscription={descriptionSubscription}
            characteristic1Subscription={characteristic1Subscription}
            characteristic2Subscription={characteristic2Subscription}
            priceSubscription={priceSubscription}
            maxDomainsSubscriptions={maxDomainsSubscription}
            onEditSubscriptionChange={onSubscriptionChange}
          />
        </DialogContent>
        <DialogActions sx={{ pl: 8, pr: 8, pb: 3 }}>
          <Button
            variant="outlined"
            type="submit"
            sx={{
              bgcolor: "secondary.main",
              color: "white",
              borderColor: "secondary.main",
            }}
          >
            Añadir suscripción
          </Button>
          <Button
            variant="outlined"
            sx={{ bgcolor: "primary.main", color: "white" }}
            onClick={handleCloseAddSubscriptionDialog}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

CAddSubscriptionDialog.propTypes = {
  openAddSubscriptionDialog: PropTypes.bool.isRequired,
  handleCloseAddSubscriptionDialog: PropTypes.func.isRequired,
};
