import { notFound } from 'next/navigation';
import { getCategory, getWordsByCategory } from '@/shared/lib/data';
import { CategorySingle, Button, Words, Word } from '@/components';

interface Props {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const [categoryData, words] = await Promise.all([
    getCategory(category),
    getWordsByCategory(category),
  ]);

  if (!categoryData) notFound();

  return (
    <div className="container">
      <CategorySingle data={categoryData} />
      <Button size="normal" icon="arrow-right">
        Start to learn
      </Button>
      <Words>
        {words.map(word => (
          <li key={word.slug}>
            <Word
              link={`/levels/${categoryData.level}/${category}/${word.slug}`}
              text={word.text}
              progress={0}
            />
          </li>
        ))}
      </Words>
    </div>
  );
}
