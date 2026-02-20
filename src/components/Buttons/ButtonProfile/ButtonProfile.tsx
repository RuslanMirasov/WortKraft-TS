import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Avatar, Text } from '../../../components';
import css from './ButtonProfile.module.scss';

const ButtonProfile = () => {
  const { data: session } = useSession();

  if (!session) return null;

  const { name, email, image, role } = session.user;

  return (
    <Link href="./profile" className={css.ButtonProfile}>
      <Avatar email={email ?? ''} name={name} image={image} bg={role !== 'free' ? 'green' : 'orange'} />
      <div className={css.Texts}>
        <Text color="black">{name || email}</Text>
        <Text size="small" color={role !== 'free' ? 'green' : 'grey-light'}>
          {role == 'free' && 'Free accaunt'}
          {role == 'pro' && 'Pro accaunt'}
          {role == 'admin' && 'Admin accaunt'}
        </Text>
      </div>
    </Link>
  );
};

export default ButtonProfile;
