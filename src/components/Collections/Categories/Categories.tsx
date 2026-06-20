import { ICategoryCard } from '@/types/dto';
import Category from './Category';
import css from './Categories.module.scss';

interface CategoriesProps {
  categories: ICategoryCard[];
}

const Categories = ({ categories }: CategoriesProps) => {
  if (!categories.length)
    return (
      <div className={css.Empty}>
        <span>Empty...</span>
      </div>
    );

  return (
    <ul className={css.Categories}>
      {categories.map(category => (
        <li key={category._id}>
          <Category data={category} />
        </li>
      ))}
    </ul>
  );
};

export default Categories;
