import levelsData from '@/database/levels.json';
import { ILevel } from '@/types/data';
import { ILevelCard } from '@/types/dto';
import { getCategoryCountByLevel } from './categories';
import { getWordCountByLevel } from './words';

const levels = levelsData as ILevel[];

export function getLevels(): ILevelCard[] {
  return levels.map(level => ({
    ...level,
    categoryCount: getCategoryCountByLevel(level._id),
    wordCount: getWordCountByLevel(level._id),
    progressPercent: null,
  }));
}

export function getLevelById(id: string): ILevelCard | undefined {
  const level = levels.find(l => l._id === id);
  if (!level) return undefined;
  return {
    ...level,
    categoryCount: getCategoryCountByLevel(level._id),
    wordCount: getWordCountByLevel(level._id),
    progressPercent: null,
  };
}
