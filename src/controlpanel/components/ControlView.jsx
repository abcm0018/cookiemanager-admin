import PropTypes from "prop-types";
import { Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CardsControl } from "./CardsControl";

export const ControlView = ({ cardsControl = [] }) => {
  const navigate = useNavigate();

  const handleButtonClick = (buttonTitle) => {
    switch (buttonTitle) {
      case "Ver todo":
        navigate("/admin/subscriptions");
        break;
      case "Gestionar usuarios":
        navigate("/admin/users");
        break;
    }
  };
  return (
    <Grid2 container sx={{ pb: 10, pt: 4, pl: 12 }}>
      {cardsControl.map((cardControl) => (
        <CardsControl
          key={cardControl.id}
          title={cardControl.title}
          description={cardControl.description}
          buttonTitle={cardControl.buttonTitle}
          bgcolor={cardControl.bgcolor}
          onButtonClick={() => handleButtonClick(cardControl.buttonTitle)}
          imageSrc={cardControl.imageSrc}
        />
      ))}
    </Grid2>
  );
};

ControlView.propTypes = {
  cardsControl: PropTypes.array,
  setCurrentTabIndex: PropTypes.func.isRequired,
};
