import { Box, Grid2, TextField } from "@mui/material";
import PropTypes from "prop-types";

export const CDialogSubscriptionForm = ({
  planTypeSubscription,
  descriptionSubscription,
  priceSubscription,
  maxDomainsSubscription,
  onEditSubscriptionChange,
}) => {
  return (
    <Box>
      <Grid2 container direction={"row"}>
        <Box sx={{ width: 775, mt: 2 }}>
          <TextField
            required
            fullWidth
            id="subscription-plan"
            name="planTypeSubscription"
            value={planTypeSubscription}
            label="Plan de suscripción"
            placeholder="Plan de suscripción"
            type="text"
            onChange={onEditSubscriptionChange}
            sx={{ width: 378, mr: 2 }}
          />
          <TextField
            required
            fullWidth
            id="price"
            name="priceSubscription"
            value={priceSubscription}
            label="Precio"
            placeholder="Precio"
            type="text"
            onChange={onEditSubscriptionChange}
            sx={{ width: 378 }}
          />
        </Box>
        <Box sx={{ width: 775, mt: 1 }}>
          <TextField
            required
            fullWidth
            id="description"
            name="descriptionSubscription"
            value={descriptionSubscription}
            label="Descripción"
            placeholder="Descripción"
            type="text"
            onChange={onEditSubscriptionChange}
            sx={{ width: 378, mr: 2 }}
          />
          <TextField
            required
            fullWidth
            id="maxDomains"
            name="maxDomainsSubscription"
            value={maxDomainsSubscription}
            label="Número de dominios"
            placeholder="Número de dominios"
            type="number"
            onChange={onEditSubscriptionChange}
            sx={{ width: 378 }}
          />
        </Box>
      </Grid2>
    </Box>
  );
};

CDialogSubscriptionForm.propTypes = {
  planTypeSubscription: PropTypes.string.isRequired,
  descriptionSubscription: PropTypes.string.isRequired,
  priceSubscription: PropTypes.string.isRequired,
  maxDomainsSubscription: PropTypes.number,
  onEditSubscriptionChange: PropTypes.func.isRequired,
};
