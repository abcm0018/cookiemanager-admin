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
import { useEffect } from "react";
import Swal from "sweetalert2";
import { CDialogAdminForm } from "./CDialogAdminForm";
import { useAdminStore, useForm } from "../../hooks";
import { updateAdminForm } from "../utils";

export const CEditAdminDialog = ({
  adminToEdit,
  openEditAdminDialog,
  handleCloseAdminUserDialog,
}) => {
  const { startUpdatigAdmin, errorMessage } = useAdminStore();

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
    }
  }, [openEditAdminDialog, adminToEdit, setFormState]);

  const onAdminSubmit = (event) => {
    event.preventDefault();
    startUpdatigAdmin({
      name: name,
      surname: surname,
      email: email,
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
        open={openEditAdminDialog}
        onClose={handleCloseAdminUserDialog}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            onAdminSubmit(event);
            handleCloseAdminUserDialog();
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
            email={email}
            onEditUserChange={onAdminChange}
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
            onClick={handleCloseAdminUserDialog}
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
  handleCloseAdminUserDialog: PropTypes.func,
};
