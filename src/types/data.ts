// --------- Levels -------------

export interface ILevel {
  _id: string;
  level: string;
  title: string;
  subtitle: string | null;
  image: string;
  color: string | null;
}

// --------- Categorys -------------

export interface ICategory {
  _id: string;
  level: string;
  name: string;
  slug: string;
  color: string | null;
}

// --------- Words -------------

type TranslationEntry = {
  correct: string;
  wrong: string[];
};

export interface IWord {
  _id: string;
  word: {
    text: string;
    slug: string;
    color: string;
    level: string;
    category: string;
    audio: string | null;
  };
  translations: Record<string, TranslationEntry>;
  dialog: {
    text: { speakerA: string; speakerB: string };
    audio: { speakerA: string | null; speakerB: string | null };
  };
}
