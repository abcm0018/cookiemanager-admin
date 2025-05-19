import { createSlice } from "@reduxjs/toolkit";

export const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState: {
    isLoadingSubscriptions: true, // Nos indica si ya se han cargado las subscripciones
    subscriptions: [],
    errorSubscriptionMessage: undefined,
  },
  reducers: {
    // Carga la lista de suscripciones
    onLoadSubscriptions: (state, { payload = [] }) => {
      state.isLoadingSubscriptions = false;
      state.subscriptions = payload;
      //Si se produce un error en el listado de las suscripciones
      state.errorSubscriptionMessage = payload;

      // Si se añade una nueva suscripcion
      payload.forEach((subscription) => {
        const exists = state.subscriptions.some(
          (dbSubscription) => dbSubscription.id === subscription.id
        );
        if (!exists) {
          state.subscriptions.push(subscription);
        }
      });
    },
    onAddNewSubscription: (state, { payload }) => {
      // Codigo para crear una nueva suscripción
      state.isLoadingSubscriptions = false;
      state.subscriptions.push(payload);

      // Si se produce un error en la edición de la suscripción
      state.errorSubscriptionMessage = payload;
    },

    onUpdateSubscription: (state, { payload }) => {
      // código para actualizar una subscripcion
      state.isLoadingSubscriptions = false;

      const index = state.subscriptions.findIndex(
        (subscription) => subscription.planType === payload.planType
      );

      if (index !== -1) {
        state.subscriptions[index] = payload;
      }
    },

    // Eliminar un plan de subscripcion por su nombre
    onDeleteSubscription: (state, { payload: planType }) => {
      state.subscriptions = state.subscriptions.filter(
        (subscription) => subscription.planType !== planType
      );
    },
  },
});

export const {
  onLoadSubscriptions,
  onAddNewSubscription,
  onUpdateSubscription,
  onDeleteSubscription,
} = subscriptionSlice.actions;
