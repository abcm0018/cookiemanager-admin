import PropTypes from "prop-types";
import { useEffect, useState } from "react";
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

  const [errors, setErrors] = useState({});

  const cleanString = (str) => str.trim().replace(/\s+/g, " ");

  const {
    planTypeSubscription,
    descriptionSubscription,
    priceSubscription,
    maxDomainsSubscription,
    characteristic1Subscription,
    characteristic2Subscription,
    discount,
    onInputChange: onSubscriptionChange,
    onResetForm,
  } = useForm(addSubscriptionForm);

  const handleCloseAndReset = () => {
    onResetForm();
    setErrors({});
    handleCloseAddSubscriptionDialog();
  };

  const validateFields = () => {
    const newErrors = {};

    const specialCharRegex = /^[^a-zA-Z0-9]/;
    const startsWithNumber = /^[0-9]/;
    const allDigits = /^\d+$/;

    if (!planTypeSubscription.trim()) {
      newErrors.planTypeSubscription = "* Campo obligatorio";
    } else if (planTypeSubscription.trim().length < 3) {
      newErrors.planTypeSubscription =
        "El tipo de plan debe tener al menos 3 caracteres";
    } else if (startsWithNumber.test(planTypeSubscription)) {
      newErrors.planTypeSubscription =
        "* El campo no puede empezar por un número";
    } else if (specialCharRegex.test(planTypeSubscription)) {
      newErrors.planTypeSubscription =
        "* El campo no puede empezar por un carácter especial";
    } else if (allDigits.test(planTypeSubscription)) {
      newErrors.planTypeSubscription =
        "* El campo no puede estar compuesto solo por números";
    }

    if (!descriptionSubscription.trim()) {
      newErrors.descriptionSubscription = "* Campo obligatorio";
    } else if (descriptionSubscription.trim().length < 4) {
      newErrors.descriptionSubscription =
        "La descripción debe tener al menos 4 caracteres";
    } else if (startsWithNumber.test(descriptionSubscription)) {
      newErrors.descriptionSubscription =
        "* El campo no puede empezar por un número";
    } else if (specialCharRegex.test(descriptionSubscription)) {
      newErrors.descriptionSubscription =
        "* El campo no puede empezar por un carácter especial";
    } else if (allDigits.test(descriptionSubscription)) {
      newErrors.descriptionSubscription =
        "* El campo no puede estar compuesto solo por números";
    }

    if (!String(priceSubscription).trim()) {
      newErrors.priceSubscription = "* Campo obligatorio";
    } else if (!/^\d+([.,]\d{1,2})?$/.test(priceSubscription)) {
      newErrors.priceSubscription =
        "El precio debe contener solo números válidos (ej: 9.99 o 9,99)";
    }

    if (!String(maxDomainsSubscription).trim())
      newErrors.maxDomainsSubscription = "* Campo obligatorio";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubscriptionSubmit = (event) => {
    event.preventDefault();
    if (!validateFields()) return false;
    startSavingSubscription({
      planType: cleanString(planTypeSubscription),
      description: cleanString(descriptionSubscription),
      price: parseFloat(
        cleanString(String(priceSubscription)).replace(",", ".")
      ),
      maxDomains: Number(cleanString(String(maxDomainsSubscription))),
      characteristic1: characteristic1Subscription,
      characteristic2: characteristic2Subscription,
      discount: discount,
    });
    return true;
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
        onClose={handleCloseAndReset}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            // onSubscriptionSubmit(event);
            // handleCloseAndReset();
            const success = onSubscriptionSubmit(event);
            if (success) handleCloseAndReset();
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
            priceSubscription={priceSubscription}
            maxDomainsSubscriptions={maxDomainsSubscription}
            onEditSubscriptionChange={onSubscriptionChange}
            errors={errors}
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
            onClick={handleCloseAndReset}
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
