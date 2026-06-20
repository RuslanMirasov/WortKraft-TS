import { dbConnect } from '@/shared/lib/mongodb';
import WordModel from '@/shared/models/Word';
import { LANGUAGES, type Language } from '@/shared/config/user';

export type WordListItem = { text: string; slug: string };

export type WordDetail = {
  word: { text: string; color: string; audio: string | null };
  translations: Record<Language, { correct: string }>;
  dialog: {
    text: { speakerA: string; speakerB: string };
    audio: { speakerA: string | null; speakerB: string | null };
  };
};

export type WordListItem = { text: string; slug: string };

export async function getWordsByCategory(category: string): Promise<WordListItem[]> {
  await dbConnect();
  const docs = await WordModel.find({ 'word.category': category }, { 'word.text': 1, 'word.slug': 1, _id: 0 }).lean();
  return docs.map(d => ({ text: d.word.text, slug: d.word.slug }));
}

export async function getWord(slug: string): Promise<WordDetail | null> {
  await dbConnect();

  const projection: Record<string, number> = {
    'word.text': 1,
    'word.color': 1,
    'word.audio': 1,
    dialog: 1,
    _id: 0,
  };
  for (const lang of LANGUAGES) {
    projection[`translations.${lang}.correct`] = 1;
  }

  const doc = await WordModel.findOne({ 'word.slug': slug }, projection).lean();
  return doc as WordDetail | null;
}

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
