import { useEffect, useState } from "react";
import { ControlView } from "./ControlView";
import descargaImage from "../../assets/img/suscripcion.jpg";
import userIconImage from "../../assets/img/usuarios.jpg";
import { useAdminStore } from "../../hooks/useAdminStore";
import Swal from "sweetalert2";

export const ControlTabs = () => {
  const { users, isLoading, startLoadingUsers, errorMessage } = useAdminStore();
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  useEffect(() => {
    // if (isPersisted) {
    startLoadingUsers();
  }, []);

  useEffect(() => {
    // Manejo de errores en la carga
    if (errorMessage !== undefined) {
      Swal.fire("Error al cargar los usuarios", errorMessage, "error");
    }
  }, [errorMessage]);

  if (isLoading) return <p>Cargando el listado de usuarios...</p>;

  const handleChange = (event, tabIndex) => {
    console.log(tabIndex);
    setCurrentTabIndex(tabIndex);
  };

  const cardsControl = [
    {
      id: 1,
      title: "Planes de suscripción",
      description: "",
      buttonTitle: "Ver todo",
      bgcolor: "#F0F4FF",
      imageSrc: descargaImage,
    },
    {
      id: 2,
      title: "Total de usuarios",
      description: `${users.length}`,
      buttonTitle: "Gestionar usuarios",
      bgcolor: "#FFF5E6",
      imageSrc: userIconImage,
    },
  ];

  return <ControlView cardsControl={cardsControl} />;
};
