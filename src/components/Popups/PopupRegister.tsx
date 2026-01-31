import { Title, Button, Text, RegistrationForm } from '..';
import { usePopup } from '@/stores/popup-store';
import { useTranslations } from 'next-intl';

const PopupRegister = () => {
  const tPopups = useTranslations('popups');
  const { openPopup } = usePopup();
  return (
    <>
      <Title tag="h2" size="h5">
        {tPopups('signup')}
      </Title>
      <Text color="grey" size="small" align="center">
        {tPopups('signup-subtitle')}
      </Text>
      <RegistrationForm />
      <hr />
      <Text color="grey" size="small" align="center">
        {tPopups('have-accaunt')}
      </Text>
      <Button onClick={() => openPopup('login')} size="small" icon="arrow-right" full>
        {tPopups('signin-action')}
      </Button>
    </>
  );
};

export default PopupRegister;
