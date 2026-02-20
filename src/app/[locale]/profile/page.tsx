'use client';

import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { Button, Title } from '@/components';

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading session…</div>;
  }

  if (!session) {
    return <div>No active session</div>;
  }

  return (
    <>
      <Title tag="h1" size="h1">
        Profile
      </Title>

      <pre
        style={{
          marginTop: 24,
          padding: 16,
          background: '#eee',
          color: '#000000',
          borderRadius: 8,
          overflowX: 'auto',
          fontSize: 12,
        }}
      >
        {JSON.stringify(session, null, 2)}
      </pre>
      <br />
      <hr />
      <br />
      <Button icon="logout" size="small" variant="red" onClick={() => signOut()}>
        Logout
      </Button>
    </>
  );
}
