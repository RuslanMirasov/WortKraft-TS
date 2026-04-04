'use client';

import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { Button, Title, Text, Hero, GoBack, Avatar } from '@/components';

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
      <Button icon="logout" size="small" variant="red" onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  );
}
