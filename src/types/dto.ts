export interface ILevelCard {
  _id: string;
  level: string;
  title: string;
  subtitle: string | null;
  image: string;
  color: string | null;
  categoryCount: number;
  wordCount: number;
  progressPercent: number | null;
}

export interface ICategoryCard {
  _id: string;
  level: string;
  name: string;
  color: string | null;
}
