import { Title, Button, Text, ButtonGoogle } from "..";
import { usePopup } from "@/stores/popup-store";

const PopupLogin = () => {
  const { openPopup } = usePopup();

  return (
    <>
      <Title tag="h2" size="h5">
        Anmeldung
      </Title>
      <Text color="grey" size="small" align="center">
        Melden Sie sich an, um Ihren Lernfortschritt zu speichern
      </Text>

      <hr />
      <Text color="grey" size="small" align="center">
        Kein Konto?
      </Text>
      <ButtonGoogle />
      <Button
        onClick={() => openPopup("register")}
        size="small"
        icon="arrow-right"
      >
        Registrieren
      </Button>
    </>
  );
};

export default PopupLogin;
