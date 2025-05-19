import { useDispatch, useSelector } from "react-redux";
import cookieManagerApi from "../api/cookieManagerApi";
import Swal from "sweetalert2";
import {
  onAddNewSubscription,
  onDeleteSubscription,
  onLoadSubscriptions,
  onUpdateSubscription,
} from "../store/subscriptions/subscriptionSlice";

export const useSubscriptionStore = () => {
  const dispatch = useDispatch();

  const { subscriptions, isLoadingSubscriptions, errorMessage } = useSelector(
    (state) => state.subscriptions
  );

  const startLoadingSubscriptions = async () => {
    try {
      const { data } = await cookieManagerApi.get("/auth/subscriptions");
      console.log({ subscriptions: data });
      dispatch(onLoadSubscriptions(data));
    } catch (error) {
      console.log("Error en la carga de subscripciones");
      console.log(error);
      Swal.fire(
        "Error al listar las subscripciones",
        error.response.data.msg,
        "error"
      );
    }
  };

  const startSavingSubscription = async ({
    planType,
    description,
    characteristic1,
    characteristic2,
    price,
    maxDomains,
  }) => {
    try {
      const { data } = await cookieManagerApi.post("/subscriptions", {
        planType,
        description,
        characteristic1,
        characteristic2,
        price,
        maxDomains,
      });
      console.log(data);

      // Despachamos la suscripcion recién creado
      dispatch(onAddNewSubscription(data));

      // Devolvemos la suscripcion creado para usarlo en el componente si fuera necesario
      return data;
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.msg || "Error desconocido";
      Swal.fire("Error al crear la suscripcion", errorMessage, "error");

      // Retornamos null en caso de error.
      return null;
    }
  };

  const startUpdatingSubscription = async ({
    planType,
    description,
    characteristic1,
    characteristic2,
    price,
    maxDomains,
  }) => {
    try {
      const { data } = await cookieManagerApi.put(
        `/subscriptions/${planType}`,
        {
          planType,
          description,
          characteristic1,
          characteristic2,
          price,
          maxDomains,
        }
      );
      console.log(data);
      dispatch(onUpdateSubscription(data));
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error al actualizar la suscripcion",
        error.response.data.msg,
        "error"
      );
    }
  };

  const startDeletingSubscription = async (planType) => {
    try {
      await cookieManagerApi.delete(`/subscriptions/${planType}`);

      // Despacha la acción para eliminar el usuario del estado local
      dispatch(onDeleteSubscription(planType));
    } catch (error) {
      console.error("Error al eliminar la suscripción:", error);
      const errorMsg = error.response?.data?.msg || "Error desconocido";
      Swal.fire("Error al eliminar la suscripción", errorMsg, "error");
    }
  };

  return {
    // Propiedades
    subscriptions,
    isLoadingSubscriptions,
    errorMessage,
    // Métodos
    startLoadingSubscriptions,
    startSavingSubscription,
    startUpdatingSubscription,
    startDeletingSubscription,
  };
};
