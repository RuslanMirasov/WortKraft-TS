import Link from 'next/link';
import { Avatar, Text } from '../../../components';
// import { useTranslations } from 'next-intl';
import { useSidebarStore } from '@/stores/sidebar-store';
import clsx from 'clsx';
import css from './ButtonProfile.module.scss';

const ButtonProfile = () => {
  // const t = useTranslations();
  const minify = useSidebarStore(s => s.minify);
  const classes = clsx(css.ButtonProfile, minify && css.Minify);

  const profile = {
    name: 'Ruslan',
    email: 'olga-mariupol33@gmail.com',
    image: '',
    status: 'admin',
  };

  const { name, email, image, status } = profile;

  return (
    <Link href="./profile" className={classes}>
      <Avatar email={email} name={name} image={image} bg={status !== 'free' ? 'green' : 'orange'} />
      <div className={css.Texts}>
        <Text color="black">{name || email}</Text>
        <Text size="small" color={status !== 'free' ? 'green' : 'grey-light'}>
          {status == 'free' && 'Free accaunt'}
          {status == 'pro' && 'Pro accaunt'}
          {status == 'admin' && 'Admin'}
        </Text>
      </div>
    </Link>
  );
};

export default ButtonProfile;
