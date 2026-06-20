import mongoose, { Schema, type InferSchemaType } from 'mongoose';
import { LANGUAGES } from '@/shared/config/user';

const TranslationEntrySchema = new Schema(
  {
    correct: { type: String, required: true },
    wrong: { type: [String], required: true },
  },
  { _id: false }
);

const translationsFields = LANGUAGES.reduce(
  (acc, lang) => {
    acc[lang] = { type: TranslationEntrySchema, required: true };
    return acc;
  },
  {} as Record<string, unknown>
);

const WordSchema = new Schema({
  word: {
    text: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    color: { type: String, required: true },
    level: { type: String, required: true, index: true },
    category: { type: String, required: true, index: true },
    audio: { type: String, default: null },
  },
  translations: translationsFields,
  dialog: {
    text: {
      speakerA: { type: String, required: true },
      speakerB: { type: String, required: true },
    },
    audio: {
      speakerA: { type: String, default: null },
      speakerB: { type: String, default: null },
    },
  },
});

export type Word = InferSchemaType<typeof WordSchema>;

const WordModel = mongoose.models.Word || mongoose.model<Word>('Word', WordSchema);

export default WordModel;
