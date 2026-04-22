import { ProfileUpdateForm, PasswordUpdateForm, ProfileBody, ProfileSidebar, ProfileHero } from '@/components';

export default function Profile() {
  return (
    <div className="container">
      <ProfileHero />

      <ProfileBody>
        <ProfileUpdateForm />
        <PasswordUpdateForm />
        <ProfileSidebar />
      </ProfileBody>
    </div>
  );
}
