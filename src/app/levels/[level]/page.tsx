import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getLevel, getCategories } from '@/shared/lib/data';
import { CollectionGrid, LevelSingle, Categories } from '@/components';

interface Props {
  params: Promise<{ level: string }>;
}

export default async function LevelPage({ params }: Props) {
  const { level } = await params;
  const t = await getTranslations('main-page');

  if (!level) notFound();

  const [levelData, categories] = await Promise.all([getLevel(level), getCategories(level)]);

  if (!levelData) notFound();

  return (
    <div className="container">
      <CollectionGrid title={t('title-thema')}>
        <LevelSingle data={levelData} />
        <Categories categories={categories} />
      </CollectionGrid>
    </div>
  );
}
