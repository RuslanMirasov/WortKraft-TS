import Image from 'next/image';
import { avatarSignature } from '@/lib/avatarActions';
import clsx from 'clsx';
import css from './Avatar.module.scss';

interface AvatarProps {
  email: string;
  size?: 'big' | 'normal' | 'small';
  image?: string | null;
  name?: string | null;
  isLoading?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ image, name, email, size = 'normal', isLoading = false }) => {
  const avatarClasses = clsx({
    [css.Avatar]: true,
    [css[size]]: true,
    [css.Loading]: isLoading,
    [css.WithImage]: !!image,
  });

  return (
    <div className={avatarClasses}>
      {image ? (
        <Image src={image} width="156" height="156" alt="Uniux avatar" />
      ) : (
        <span>{avatarSignature(name ? name : email)}</span>
      )}
    </div>
  );
};

export default Avatar;
