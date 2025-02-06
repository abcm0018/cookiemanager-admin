import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isLoading: true, // Indica si los datos se han cargado correctamente
    users: [],
    errorMessage: undefined,
  },
  reducers: {
    // Carga la lista de usuarios
    onLoadUsers: (state, { payload = [] }) => {
      state.isLoading = false;
      state.users = payload;

      payload.forEach((user) => {
        const exists = state.users.some((dbUser) => dbUser.id === user.id);
        if (!exists) {
          state.users.push(user);
        }
      });
    },

    // Eliminar un usuario por su email
    onDeleteUser: (state, { payload: userEmail }) => {
      state.users = state.users.filter((user) => user.email !== userEmail);
    },

    // Acción para actualizar los datos de un administrador
    onUpdateAdmin: (state, { payload }) => {
      // Código para actualizar los datos del admin
      state.isLoading = false;

      const index = state.users.findIndex((user) => user.id === payload.id);

      if (index !== -1) {
        state.users[index] = payload;
      }
    },
  },
});

export const { onLoadUsers, onDeleteUser, onUpdateAdmin } = adminSlice.actions;

export default adminSlice.reducer;
