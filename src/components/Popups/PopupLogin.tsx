import { Title, Button, Text, ButtonGoogle, LoginForm } from '..';
import { usePopup } from '@/stores/popup-store';
import { useTranslations } from 'next-intl';

const PopupLogin = () => {
  const { openPopup } = usePopup();
  const tPopups = useTranslations('popups');

  return (
    <>
      <Title tag="h2" size="h5">
        {tPopups('signin')}
      </Title>

      <LoginForm />

      <hr />

      <Text color="grey" size="small" align="center">
        {tPopups('no-accaunt')}
      </Text>

      <ButtonGoogle />

      <Button onClick={() => openPopup('register')} size="small" icon="arrow-right" full>
        {tPopups('signup-action')}
      </Button>
    </>
  );
};

export default PopupLogin;
