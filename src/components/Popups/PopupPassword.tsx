import { Title, Text, PasswordForm } from "..";

const PopupPassword = () => {
  return (
    <>
      <Title tag="h2" size="h5">
        Wiederherstellung
      </Title>
      <Text color="grey" size="small" align="center">
        Geben Sie die mit Ihrem Konto verknüpfte E-Mail-Adresse ein,
        und&nbsp;wir senden Ihnen Anweisungen zur Wiederherstellung von
      </Text>
      <PasswordForm />
    </>
  );
};

export default PopupPassword;
