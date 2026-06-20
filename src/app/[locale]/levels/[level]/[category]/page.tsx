import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getCategory } from '@/shared/lib/data';
import { CategorySingle, Button } from '@/components';

interface Props {
  params: Promise<{ locale: string; category: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { locale, category } = await params;
  setRequestLocale(locale);

  const categoryData = await getCategory(category);

  if (!categoryData) notFound();

  return (
    <div className="container">
      <CategorySingle data={categoryData} />
      <Button size="normal" icon="arrow-right">
        Start to learn
      </Button>
    </div>
  );
}
