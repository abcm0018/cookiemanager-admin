import PropTypes from "prop-types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useForm, useSubscriptionStore } from "../../hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { CDialogSubscriptionForm } from "./CDialogSubscriptionForm";
import { updateSubscriptionForm } from "../../account/utils";

export const CUpdateSubscriptionDialog = ({
  subscriptionToEdit,
  openUpdateSubscriptionDialog,
  handleCloseUpdateSubscriptionDialog,
}) => {
  const { startUpdatingSubscription, errorMessage } = useSubscriptionStore();

  const {
    planTypeSubscription,
    descriptionSubscription,
    priceSubscription,
    maxDomainsSubscription,
    onInputChange: onSubscriptionChange,
    setFormState,
  } = useForm(updateSubscriptionForm);

  // Prellenar los datos del formulario cuando el diálogo se abre
  useEffect(() => {
    if (openUpdateSubscriptionDialog && subscriptionToEdit) {
      setFormState({
        planTypeSubscription: subscriptionToEdit.planType,
        descriptionSubscription: subscriptionToEdit.description,
        priceSubscription: subscriptionToEdit.price,
        maxDomainsSubscription: subscriptionToEdit.maxDomains || 0,
      });
    }
  }, [openUpdateSubscriptionDialog, subscriptionToEdit, setFormState]);

  const onSubscriptionSubmit = (event) => {
    event.preventDefault();
    startUpdatingSubscription({
      planType: planTypeSubscription,
      description: descriptionSubscription,
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
        open={openUpdateSubscriptionDialog}
        onClose={handleCloseUpdateSubscriptionDialog}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            onSubscriptionSubmit(event);
            handleCloseUpdateSubscriptionDialog();
          },
        }}
      >
        <DialogTitle sx={{ pl: 8, pr: 8 }}>Modificar suscripción</DialogTitle>
        <DialogContent sx={{ pl: 8, pr: 8 }}>
          <DialogContentText color="primary.main">
            Modifique los campos necesarios para agregar una modificación a la
            suscripción.
          </DialogContentText>
          <DialogContentText sx={{ mt: 2 }} color="primary.main">
            Modifica la información necesaria como el tipo de plan, precio y
            características clave de la suscripción.
          </DialogContentText>
          <CDialogSubscriptionForm
            planTypeSubscription={planTypeSubscription}
            descriptionSubscription={descriptionSubscription}
            priceSubscription={priceSubscription}
            maxDomainsSubscription={maxDomainsSubscription}
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
            Modificar suscripción
          </Button>
          <Button
            variant="outlined"
            sx={{ bgcolor: "primary.main", color: "white" }}
            onClick={handleCloseUpdateSubscriptionDialog}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

CUpdateSubscriptionDialog.propTypes = {
  subscriptionToEdit: PropTypes.object.isRequired,
  openUpdateSubscriptionDialog: PropTypes.bool,
  handleCloseUpdateSubscriptionDialog: PropTypes.func,
};
