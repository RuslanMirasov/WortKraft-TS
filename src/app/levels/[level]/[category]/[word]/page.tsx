import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth';
import { getWord } from '@/shared/lib/data';
import { authOptions } from '@/shared/lib/api/auth';
import { Dialog, Hero, Button, WordTranslation } from '@/components';
import type { Language } from '@/shared/config/user';

interface Props {
  params: Promise<{ word: string }>;
}

function resolveTranslationLang(sessionLang?: string, localeCookie?: string): Language {
  if (sessionLang) return sessionLang as Language;
  if (localeCookie === 'uk') return 'ua';
  return 'en';
}

export default async function WordPage({ params }: Props) {
  const { word: slug } = await params;

  const [data, session, cookieStore] = await Promise.all([
    getWord(slug),
    getServerSession(authOptions),
    cookies(),
  ]);

  if (!data) notFound();

  const locale = cookieStore.get('NEXT_LOCALE')?.value;
  const lang = resolveTranslationLang(session?.user.language, locale);

  const { word, translations, dialog } = data;
  const translation = translations[lang]?.correct;

  return (
    <div className="container small">
      <Hero>
        <WordTranslation
          text={word.text}
          color={word.color}
          audio={word.audio}
          translation={translation}
        />
      </Hero>

      <Dialog
        textA={dialog.text.speakerA}
        textB={dialog.text.speakerB}
        audioA={dialog.audio.speakerA}
        audioB={dialog.audio.speakerB}
      />

      <Button size="normal" icon="arrow-right">
        Start to learn
      </Button>
    </div>
  );
}
