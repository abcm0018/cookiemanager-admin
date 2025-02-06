import { Container, Grid2 } from "@mui/material";
import { CardsSubscription } from "./CardsSuscription";
import { useEffect } from "react";
import { HeadSectionSubscriptions } from "./HeadSectionSubscriptions";
import { useSubscriptionStore } from "../../hooks";

export const MainSectionSubscriptions = () => {
  const {
    subscriptions,
    errorMessage,
    isLoadingSubscriptions,
    startLoadingSubscriptions,
  } = useSubscriptionStore();

  useEffect(() => {
    startLoadingSubscriptions();
  }, []);

  return (
    <>
      <HeadSectionSubscriptions />
      <Grid2
        container
        direction="column"
        sx={{ backgroundColor: "#F5F7F8", padding: 5 }}
      >
        <Container>
          <Grid2>
            <CardsSubscription subscriptions={subscriptions} />
          </Grid2>
        </Container>
      </Grid2>
    </>
  );
};
