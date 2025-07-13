import { Title, Button, Text, ButtonGoogle, LoginForm } from "..";
import { usePopup } from "@/stores/popup-store";

const PopupLogin = () => {
  const { openPopup } = usePopup();

  return (
    <>
      <Title tag="h2" size="h5">
        Anmeldung
      </Title>

      <Text color="grey" size="subtitle" align="center">
        Melden Sie sich an, um Ihren Lernfortschritt zu speichern
      </Text>

      <LoginForm />

      <hr />

      <Text color="grey" size="small" align="center">
        Kein Konto?
      </Text>

      <ButtonGoogle />

      <Button
        onClick={() => openPopup("register")}
        size="small"
        icon="arrow-right"
        full
      >
        Registrieren
      </Button>
    </>
  );
};

export default PopupLogin;
