import { Title, Button, Text } from "..";
import { usePopup } from "@/stores/popup-store";

const PopupRegister = () => {
  const { openPopup } = usePopup();
  return (
    <>
      <Title tag="h2" size="h5">
        Registrierung
      </Title>
      <Text color="grey" size="small" align="center">
        Registrieren Sie sich, um Ihren Lernfortschritt zu speichern
      </Text>

      <hr />
      <Text color="grey" size="small" align="center">
        Bereits registriert?
      </Text>
      <Button
        onClick={() => openPopup("login")}
        size="small"
        icon="arrow-right"
      >
        Anmelden
      </Button>
    </>
  );
};

export default PopupRegister;
