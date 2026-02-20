'use client';

import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

const SessionBootstrap = () => {
  const { data: session, status, update } = useSession();
  const hydrated = useRef(false);

  useEffect(() => {
    if (status !== 'authenticated') return;
    if (!session?.user?.id) return;

    if (typeof session.user.hasRequiredConsents === 'boolean') {
      return;
    }

    if (hydrated.current) return;
    hydrated.current = true;

    (async () => {
      const res = await fetch('/api/auth/me');
      if (!res.ok) return;

      const user = await res.json();

      await update({ user });
    })();
  }, [status, session, update]);

  return null;
};

export default SessionBootstrap;
