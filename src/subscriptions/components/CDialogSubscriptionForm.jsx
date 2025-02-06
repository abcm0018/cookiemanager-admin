import { Box, Grid2, TextField } from "@mui/material";
import PropTypes from "prop-types";

export const CDialogSubscriptionForm = ({
  planTypeSubscription,
  descriptionSubscription,
  characteristic1Subscription,
  characteristic2Subscription,
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
            id="characteristic1"
            name="characteristic1Subscription"
            value={characteristic1Subscription}
            label="Característica 1"
            placeholder="Característica 1"
            type="text"
            onChange={onEditSubscriptionChange}
            sx={{ width: 378, mr: 2 }}
          />
          <TextField
            required
            fullWidth
            id="characteristic2"
            name="characteristic2Subscription"
            value={characteristic2Subscription}
            label="Característica 2"
            placeholder="Característica 2"
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
  characteristic1Subscription: PropTypes.string.isRequired,
  characteristic2Subscription: PropTypes.string.isRequired,
  priceSubscription: PropTypes.string.isRequired,
  maxDomainsSubscription: PropTypes.number,
  onEditSubscriptionChange: PropTypes.func.isRequired,
};
