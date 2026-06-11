import categoriesData from '@/database/categories.json';
import { ICategory } from '@/types/data';

const categories = categoriesData as ICategory[];

export function getCategories(levelId: string) {
  return categories.filter(cat => cat.level === levelId);
}

export function getCategoryCountByLevel(levelId: string): number {
  return categories.filter(cat => cat.level === levelId).length;
}
