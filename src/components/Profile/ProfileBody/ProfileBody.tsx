import css from './ProfileBody.module.scss';

const ProfileBody = ({ children }: { children: React.ReactNode }) => {
  return <div className={css.ProfileBody}>{children}</div>;
};

export default ProfileBody;
