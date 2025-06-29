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
    onClearUser: (state) => {
      state.isLoading = false;
      state.users = [];
    },
  },
});

export const { onLoadUsers, onDeleteUser, onClearUser } = adminSlice.actions;

export default adminSlice.reducer;
