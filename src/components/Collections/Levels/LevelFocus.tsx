'use client';

import React, { useEffect, useRef } from 'react';

const MOBILE_MAX_WIDTH = 767;
const SCROLL_DELAY = 500;
const ENABLE_SCROLL = false;

interface Props {
  children: React.ReactNode;
  className?: string;
}

const LevelFocus = ({ children, className }: Props) => {
  const ref = useRef<HTMLUListElement>(null);
  const isInitializing = useRef(true);

  const isMobile = () => window.innerWidth <= MOBILE_MAX_WIDTH;

  const scrollToItem = (li: HTMLLIElement, isFirst: boolean) => {
    if (!ENABLE_SCROLL) return;
    setTimeout(() => {
      if (isFirst) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const top = li.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, SCROLL_DELAY);
  };

  useEffect(() => {
    if (!isMobile()) {
      isInitializing.current = false;
      return;
    }

    const ul = ref.current;
    if (!ul) return;

    const items = ul.querySelectorAll<HTMLLIElement>('li');
    const firstItem = items[0];
    const hash = window.location.hash.slice(1);

    if (hash) {
      const target = ul.querySelector<HTMLLIElement>(`li[data-id="${hash}"]`);
      if (target) {
        target.focus();
        isInitializing.current = false;
        scrollToItem(target, target === firstItem);
        return;
      }
    }

    if (firstItem) {
      firstItem.focus();
      isInitializing.current = false;
      if (ENABLE_SCROLL) {
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), SCROLL_DELAY);
      }
    } else {
      isInitializing.current = false;
    }
  }, []);

  const handleFocus = (e: React.FocusEvent<HTMLUListElement>) => {
    if (isInitializing.current || !isMobile()) return;
    const li = (e.target as HTMLElement).closest<HTMLLIElement>('li');
    if (!li) return;

    const id = li.dataset.id;
    if (id) history.replaceState(null, '', `#${id}`);

    const isFirst = li === ref.current?.querySelector('li');
    scrollToItem(li, isFirst);
  };

  return (
    <ul ref={ref} className={className} onFocus={handleFocus}>
      {children}
    </ul>
  );
};

export default LevelFocus;
