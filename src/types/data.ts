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
  color: string | null;
}

// --------- Words -------------

export interface IWord {
  _id: string;
  level: string;
  category: string;
  name: string;
}
