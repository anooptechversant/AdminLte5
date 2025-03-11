import { CategoryTreeProps } from '@/types/category';

import DraggableCategory from './DraggableCategory';

const CategoryTree = ({
  categories,
  moveCategory,
  saveCategoryOrder,
  toggleCategoryStatus,
}: CategoryTreeProps) => {
  return (
    <ul className="ml-4 mt-2">
      {categories.map((category, index) => (
        <DraggableCategory
          key={category.id}
          category={category}
          index={index}
          moveCategory={moveCategory}
          saveCategoryOrder={saveCategoryOrder}
          toggleCategoryStatus={toggleCategoryStatus}
        />
      ))}
    </ul>
  );
};

export default CategoryTree;
