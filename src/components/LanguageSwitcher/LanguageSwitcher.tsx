'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Icon } from '../../components';
import css from './LanguageSwitcher.module.scss';

type SupportedLocale = 'de' | 'en' | 'uk';

const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale() as SupportedLocale;
  const [open, setOpen] = useState(false);
  const switcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const switchLanguage = useCallback(
    (targetLocale: SupportedLocale) => {
      if (targetLocale === locale) {
        setOpen(false);
        return;
      }

      const segments = pathname.split('/');
      segments[1] = targetLocale;
      const newPath = segments.join('/') || '/';

      document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;
      setOpen(false);
      router.push(newPath);
    },
    [pathname, router, locale]
  );

  const toggleOpen = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return (
    <button className={css.LanguageSwitcher} ref={switcherRef}>
      <div className={css.Select} onClick={toggleOpen}>
        <Icon name={locale} />
        {locale === 'de' && <span>Deutsch</span>}
        {locale === 'en' && <span>English</span>}
        {locale === 'uk' && <span>Українська</span>}

        <div className={`${css.Arrow} ${open ? css.Open : ''}`}>
          <Icon name="arrow-down" />
        </div>
      </div>

      {open && (
        <ul className={css.List}>
          <li>
            <div className={css.Select} onClick={() => switchLanguage('de')}>
              <Icon name="de" />
              <span>Deutsch</span>
            </div>
          </li>
          <li>
            <div className={css.Select} onClick={() => switchLanguage('en')}>
              <Icon name="en" />
              <span>English</span>
            </div>
          </li>
          <li>
            <div className={css.Select} onClick={() => switchLanguage('uk')}>
              <Icon name="uk" />
              <span>Українська</span>
            </div>
          </li>
        </ul>
      )}
    </button>
  );
};

export default LanguageSwitcher;
