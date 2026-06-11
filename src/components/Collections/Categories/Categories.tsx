import { getCategories } from '@/shared/lib/data';
import Category from './Category';
import css from './Categories.module.scss';

interface CategoriesProps {
  level: string;
}

const Categories = async ({ level }: CategoriesProps) => {
  const categories = await getCategories(level);

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
