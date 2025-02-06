import PropTypes from "prop-types";
import { Grid2 } from "@mui/material";
import { CUpdateSubscriptionDialog } from "./CUpdateSubscriptionDialog";
import { useState } from "react";
import { SubscriptionDetailsAdmin } from "../../subscriptions/components/SubscriptionDetailsAdmin";

export const CardsSubscription = ({ subscriptions = [] }) => {
  const [openUpdateSubscriptionDialog, setOpenUpdateSubscriptionDialog] =
    useState(false);

  // Hook con el la información del dominio a editar
  const [subscriptionToEdit, setSubscriptionToEdit] = useState({});

  // Establecemos la suscripcion a editar
  const handleOpenUpdateSubscription = (subscription) => {
    console.log("Abriendo el dialogo para añadir dominio");
    setOpenUpdateSubscriptionDialog(true);
    setSubscriptionToEdit(subscription);
  };

  const handleCloseUpdateSubscriptionDialog = () => {
    console.log("Cerrando dialogo de añadir dominio");
    setOpenUpdateSubscriptionDialog(false);
  };

  return (
    <>
      <Grid2 container spacing={2} justifyContent="center" alignItems="center">
        {subscriptions.map((subscription) => (
          <SubscriptionDetailsAdmin
            key={subscription.id}
            planType={subscription.planType}
            description={subscription.description}
            characteristic1={subscription.characteristic1}
            characteristic2={subscription.characteristic2}
            price={subscription.price}
            maxDomains={subscription.maxDomains}
            handleUpdateSubscription={() =>
              handleOpenUpdateSubscription(subscription)
            }
          />
        ))}
        <CUpdateSubscriptionDialog
          subscriptionToEdit={subscriptionToEdit}
          openUpdateSubscriptionDialog={openUpdateSubscriptionDialog}
          handleCloseUpdateSubscriptionDialog={
            handleCloseUpdateSubscriptionDialog
          }
        />
      </Grid2>
    </>
  );
};

CardsSubscription.propTypes = {
  subscriptions: PropTypes.array.isRequired,
};
