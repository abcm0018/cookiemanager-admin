import PropTypes from "prop-types";

import { useAuthStore } from "../../hooks";
import { Footer, NavBarAdmin } from "../components";

export const AdminLayout = ({ children }) => {
  const { startLogout, user } = useAuthStore();

  return (
    <>
      <NavBarAdmin startLogout={startLogout} user={user} />
      {children}
      <Footer />
    </>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node,
};
