import { useDispatch, useSelector } from "react-redux";
import cookieManagerApi from "../api/cookieManagerApi";
import {
  onDeleteUser,
  onLoadUsers,
  onUpdateAdmin,
} from "../store/admin/adminSlice";
import Swal from "sweetalert2";

export const useAdminStore = () => {
  const dispatch = useDispatch();

  const { isLoading, users, errorMessage } = useSelector(
    (state) => state.admin
  );

  const startLoadingUsers = async () => {
    try {
      const { data } = await cookieManagerApi.get("/users");
      console.log({ users: data });
      dispatch(onLoadUsers(data));
    } catch (error) {
      console.log("Error en la carga de dominios");
      console.log(error);
      Swal.fire(
        "Error al listar los dominios",
        error.response.data.msg,
        "error"
      );
    }
  };

  const startDeletingUser = async (userEmail) => {
    try {
      await cookieManagerApi.delete(`/users/${userEmail}`);

      // Despacha la acción para eliminar el usuario del estado local
      dispatch(onDeleteUser(userEmail));
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      const errorMsg = error.response?.data?.msg || "Error desconocido";
      Swal.fire("Error al eliminar", errorMsg, "error");
    }
  };

  const startUpdatigAdmin = async ({ name, surname, email }) => {
    try {
      const { data } = await cookieManagerApi.put(`/users/admin`, {
        name,
        surname,
        email,
      });
      console.log(data);
      dispatch(onUpdateAdmin(data));
    } catch (error) {
      console.log(error);
      Swal.fire("Error al actualizar", error.response.data.msg, "error");
    }
  };

  return {
    // Propiedades
    isLoading,
    users,
    errorMessage,
    // Métodos
    startLoadingUsers,
    startDeletingUser,
    startUpdatigAdmin,
  };
};
