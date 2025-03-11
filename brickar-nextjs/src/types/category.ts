export type Category = {
  id: string;
  name: string;
  image: any;
  is_active: boolean;
};
export type CategoryProps = {
  id?: string | null;
};

export type CategoryTreeProps = {
  categories: Category[];
  moveCategory: (dragIndex: number, hoverIndex: number) => void;
  saveCategoryOrder: () => Promise<void>;
  toggleCategoryStatus: (id: string, currentStatus: boolean) => void;
};
export type DraggableCategoryProps = {
  category: Category;
  index: number;
  moveCategory: (dragIndex: number, hoverIndex: number) => void;
  saveCategoryOrder: () => Promise<void>;
  toggleCategoryStatus: (id: string, currentStatus: boolean) => void;
};
