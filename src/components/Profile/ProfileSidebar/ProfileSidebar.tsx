import css from './ProfileSidebar.module.scss';

interface ProfileSidebarProps {
  children: React.ReactNode;
}

const ProfileSidebar = ({ children }: ProfileSidebarProps) => {
  return <aside className={css.ProfileSidebar}>{children}</aside>;
};

export default ProfileSidebar;
