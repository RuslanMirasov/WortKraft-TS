import Link from 'next/link';
import { Avatar } from '../../../components';
import { useTranslations } from 'next-intl';
import css from './ButtonProfile.module.scss';

const ButtonProfile = () => {
  const t = useTranslations();
  const profile = {
    name: 'Mirasov Ruslan',
    email: 'info@mirasov.dev',
    image: '',
  };

  const { name, email, image } = profile;
  return (
    <Link href="./profile" className={css.ButtonProfile}>
      <Avatar email={email} name={name} image={image} />
      <p>
        <span>{t('greeting')}</span>
        <span>{name}</span>
      </p>
    </Link>
  );
};

export default ButtonProfile;
