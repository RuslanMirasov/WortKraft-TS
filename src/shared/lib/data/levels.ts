import levelsData from '@/database/levels.json';
import { ILevel } from '@/types/data';
import { ILevelCard } from '@/types/dto';
import { getCategoryCountByLevel } from './categories';
import { getWordCounts, getLevelWordCountFromMap } from './words';

const levels = levelsData as ILevel[];

export async function getLevels(): Promise<ILevelCard[]> {
  const wordCounts = await getWordCounts();

  return levels.map(level => ({
    ...level,
    categoryCount: getCategoryCountByLevel(level.level),
    wordCount: getLevelWordCountFromMap(wordCounts, level.level),
    progressPercent: null,
  }));
}

export async function getLevel(levelName: string): Promise<ILevelCard | undefined> {
  const level = levels.find(l => l.level === levelName);
  if (!level) return undefined;

  const wordCounts = await getWordCounts();

  return {
    ...level,
    categoryCount: getCategoryCountByLevel(level.level),
    wordCount: getLevelWordCountFromMap(wordCounts, level.level),
    progressPercent: null,
  };
}
