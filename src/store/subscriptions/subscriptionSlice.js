import { createSlice } from "@reduxjs/toolkit";

export const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState: {
    isLoadingSubscriptions: true, // Nos indica si ya se han cargado las subscripciones
    subscriptions: [],
    errorMessage: undefined,
  },
  reducers: {
    // Carga la lista de suscripciones
    onLoadSubscriptions: (state, { payload = [] }) => {
      state.isLoadingSubscriptions = false;
      state.subscriptions = payload;
    },
    onAddNewSubscription: (state, { payload }) => {
      // Codigo para crear un nuevo dominio
      state.isLoading = false;
      state.subscriptions.push(payload);

      // Si se produce un error en la edición del dominio
      state.errorDomainMessage = payload;
    },

    onUpdateSubscription: (state, { payload }) => {
      // código para actualizar una subscripcion
      state.isLoading = false;

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
