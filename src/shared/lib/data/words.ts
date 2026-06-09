import wordsData from '@/database/words.json';
import { IWord } from '@/types/data';

const words = wordsData as IWord[];

export function getWordCountByLevel(levelId: string): number {
  return words.filter(word => word.level === levelId).length;
}
