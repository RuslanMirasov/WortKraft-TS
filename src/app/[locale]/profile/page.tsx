'use client';

import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import {
  Button,
  Title,
  Hero,
  GoBack,
  Avatar,
  ProfileUpdateForm,
  PasswordUpdateForm,
  ProfileBody,
  ProfileSidebar,
} from '@/components';

export default function Profile() {
  const { data: session, status = false } = useSession();

  if (status === 'loading') {
    return (
      <div className="container">
        <div>
          <Hero>
            <GoBack />
            <Title tag="h1" size="h1">
              Hello
              <br />
              ...
            </Title>
            <Avatar email="" size="big" isLoading={true} />
          </Hero>
        </div>
      </div>
    );
  }

  if (!session) return;

  const { role, name, email, image, language, subscriptionUntil } = session?.user;

  return (
    <div className="container">
      <Hero>
        <GoBack />
        <Title tag="h1" size="h1">
          Hello
          <br />
          {name}
        </Title>
        <Avatar email={email ?? ''} name={name} image={image} role={role} size="big" />
      </Hero>

      <ProfileBody>
        <ProfileUpdateForm
          fields={{
            name: name ?? '',
            email: email ?? '',
            language: language ?? '',
          }}
        />

        <PasswordUpdateForm />

        <ProfileSidebar>
          <Title tag="h2" size="h3">
            Gefährliche Zone
          </Title>
          <hr />
          <Button icon="login" size="small" full onClick={() => signOut()}>
            Logout
          </Button>
          <Button icon="user" size="small" full variant="red" onClick={() => console.log('Удаляем аккаунт')}>
            Account löschen
          </Button>
        </ProfileSidebar>
      </ProfileBody>
    </div>
  );
}
