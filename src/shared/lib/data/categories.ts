import categoriesData from '@/database/categories.json';
import { ICategory } from '@/types/data';
import { ICategoryCard } from '@/types/dto';
import { getWordCounts, getWordCountFromMap } from './words';

const categories = categoriesData as ICategory[];

export async function getCategories(level: string): Promise<ICategoryCard[]> {
  const wordCounts = await getWordCounts();

  return categories
    .filter(cat => cat.level === level)
    .map(cat => ({
      ...cat,
      wordCount: getWordCountFromMap(wordCounts, cat.level, cat.slug),
    }));
}

export async function getCategory(slug: string): Promise<ICategoryCard | undefined> {
  const category = categories.find(cat => cat.slug === slug);
  if (!category) return undefined;

  const wordCounts = await getWordCounts();

  return {
    ...category,
    wordCount: getWordCountFromMap(wordCounts, category.level, category.slug),
  };
}

export function getCategoryCountByLevel(levelName: string): number {
  return categories.filter(cat => cat.level === levelName).length;
}
