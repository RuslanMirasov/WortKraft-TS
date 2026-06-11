import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getLevelById } from '@/shared/lib/data';
import { CollectionGrid, LevelSingle, Categories } from '@/components';

interface Props {
  params: Promise<{ level: string }>;
}

export default async function LavelPage({ params }: Props) {
  const { level } = await params;
  const t = await getTranslations('main-page');

  if (!level) notFound();

  const levelData = getLevelById(level);

  if (!levelData) notFound();

  return (
    <div className="container">
      <CollectionGrid title={t('title-thema')}>
        <LevelSingle data={levelData} />
        <Categories level={level} />
      </CollectionGrid>
    </div>
  );
}
