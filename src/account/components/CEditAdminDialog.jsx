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
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CDialogAdminForm } from "./CDialogAdminForm";
import { useAdminStore, useForm } from "../../hooks";
import { updateAdminForm } from "../utils";

export const CEditAdminDialog = ({
  adminToEdit,
  openEditAdminDialog,
  handleCloseEditAdminDialog,
}) => {
  const { startUpdatingAdmin, errorMessage } = useAdminStore();

  const [errors, setErrors] = useState({});
  const cleanString = (str) => str.trim().replace(/\s+/g, " ");

  const {
    name,
    surname,
    email,
    onInputChange: onAdminChange,
    setFormState,
  } = useForm(updateAdminForm);

  // Prellenar los datos del formulario cuando el diálogo se abre
  useEffect(() => {
    if (openEditAdminDialog && adminToEdit) {
      setFormState({
        name: adminToEdit.name,
        surname: adminToEdit.surname,
        email: adminToEdit.email,
      });
      setErrors({});
    }
  }, [openEditAdminDialog, adminToEdit, setFormState]);

  const validateFields = () => {
    const newErrors = {};

    const specialCharRegex = /^[^a-zA-Z0-9]/;
    const startsWithNumber = /^[0-9]/; // empieza por número
    const allDigits = /^\d+$/; // solo números

    if (!name.trim()) {
      newErrors.name = "* Campo obligatorio";
    } else if (name.trim().length < 3) {
      newErrors.name = "* El nombre debe tener al menos 3 caracteres";
    } else if (startsWithNumber.test(name)) {
      newErrors.name = "* El campo no puede empezar por un número";
    } else if (specialCharRegex.test(name)) {
      newErrors.name = "* El campo no puede empezar por un carácter especial";
    } else if (allDigits.test(name)) {
      newErrors.name = "* El campo no puede estar compuesto solo por números";
    }

    if (!surname.trim()) {
      newErrors.surname = "* Campo obligatorio";
    } else if (surname.trim().length < 3) {
      newErrors.surname = "* Los apellidos debe tener al menos 3 caracteres";
    } else if (startsWithNumber.test(surname)) {
      newErrors.surname = "* El campo no puede empezar por un número";
    } else if (specialCharRegex.test(surname)) {
      newErrors.surname =
        "* El campo no puede empezar por un carácter especial";
    } else if (allDigits.test(surname)) {
      newErrors.surname =
        "* El campo no puede estar compuesto solo por números";
    }
    if (!email.trim()) newErrors.email = "* Campo obligatorio";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onAdminSubmit = (event) => {
    event.preventDefault();
    if (!validateFields()) return false;
    startUpdatingAdmin({
      name: cleanString(name),
      surname: cleanString(surname),
      email: cleanString(email),
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
        open={openEditAdminDialog}
        onClose={handleCloseEditAdminDialog}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            // onAdminSubmit(event);
            // handleCloseEditAdminDialog();
            const success = onAdminSubmit(event);
            if (success) handleCloseEditAdminDialog();
          },
        }}
      >
        <DialogTitle sx={{ pl: 8, pr: 8 }}>Modificar perfil</DialogTitle>
        <DialogContent sx={{ pl: 8, pr: 8 }}>
          <DialogContentText color="primary.main">
            Modifique los campos necesarios para agregar cambios a tu perfil.
          </DialogContentText>
          <CDialogAdminForm
            name={name}
            surname={surname}
            email={adminToEdit.email}
            onEditAdminChange={onAdminChange}
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
            Actualizar
          </Button>
          <Button
            variant="outlined"
            sx={{ bgcolor: "primary.main", color: "white" }}
            onClick={handleCloseEditAdminDialog}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

CEditAdminDialog.propTypes = {
  adminToEdit: PropTypes.object.isRequired,
  openEditAdminDialog: PropTypes.bool,
  handleCloseEditAdminDialog: PropTypes.func,
};
