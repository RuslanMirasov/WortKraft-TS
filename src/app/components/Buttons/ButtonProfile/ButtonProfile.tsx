import Link from 'next/link';
import { Avatar, Text } from '../../../components';
import { useTranslations } from 'next-intl';
import css from './ButtonProfile.module.scss';

const ButtonProfile = () => {
  const t = useTranslations();
  const profile = {
    name: 'Ruslan Mirasov',
    email: 'olga-mariupol33@gmail.com',
    image: '',
    status: 'admin',
  };

  const { name, email, image, status } = profile;
  return (
    <Link href="./profile" className={css.ButtonProfile}>
      <Avatar email={email} name={name} image={image} />
      <div className={css.Texts}>
        <Text color="black">{name || email}</Text>
        <Text size="small" color="green">
          {status == 'free' && 'Free accaunt'}
          {status == 'pro' && 'Pro'}
          {status == 'admin' && 'Admin'}
        </Text>
      </div>
    </Link>
  );
};

export default ButtonProfile;
