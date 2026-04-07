import css from './ProfileContent.module.scss';

interface ProfileContentProps {
  children: React.ReactNode;
}

const ProfileContent = ({ children }: ProfileContentProps) => {
  return <div className={css.ProfileContent}>{children}</div>;
};

export default ProfileContent;
