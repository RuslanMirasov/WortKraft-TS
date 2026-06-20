import { dbConnect } from '@/shared/lib/mongodb';
import WordModel from '@/shared/models/Word';

type WordCounts = Record<string, number>;

export async function getWordCounts(): Promise<WordCounts> {
  await dbConnect();

  const result = await WordModel.aggregate<{ _id: { level: string; category: string }; count: number }>([
    { $group: { _id: { level: '$word.level', category: '$word.category' }, count: { $sum: 1 } } },
  ]);

  const counts: WordCounts = {};
  for (const item of result) {
    counts[`${item._id.level}::${item._id.category}`] = item.count;
  }
  return counts;
}

export function getWordCountFromMap(counts: WordCounts, level: string, category: string): number {
  return counts[`${level}::${category}`] ?? 0;
}

export function getLevelWordCountFromMap(counts: WordCounts, level: string): number {
  return Object.entries(counts)
    .filter(([key]) => key.startsWith(`${level}::`))
    .reduce((total, [, count]) => total + count, 0);
}
