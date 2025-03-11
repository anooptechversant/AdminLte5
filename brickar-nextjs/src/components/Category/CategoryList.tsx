'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast, ToastContainer } from 'react-toastify';

import Plus from '@/components/Svg/Plus';
import { Category } from '@/types/category';
import { apiRequest, getRequest } from '@/utils/api';

import CategoryTree from './CategoryTree';

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getRequest(`admin/category/`);
        setCategories(response || []);
      } catch (err: any) {
        toast.error(`Error fetching categories: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  const moveCategory = (dragIndex: number, hoverIndex: number) => {
    const updatedCategories = [...categories];
    const draggedCategory = updatedCategories[dragIndex];

    updatedCategories.splice(dragIndex, 1);
    updatedCategories.splice(hoverIndex, 0, draggedCategory);

    setCategories(updatedCategories);
  };

  const saveCategoryOrder = async () => {
    const formattedData = categories.map((category, index) => ({
      id: category.id,
      priority: index,
    }));

    try {
      await apiRequest({
        method: 'PUT',
        path: 'admin/category/',
        data: formattedData,
      });
      toast.success('Category positions updated successfully');
    } catch (err: any) {
      toast.error(`Error: ${err.message}`);
    }
  };
  const toggleCategoryStatus = async (id: string, currentStatus: boolean) => {
    try {
      const newStatus = !currentStatus;
      const endpoint = newStatus
        ? `admin/category/${id}/activate`
        : `admin/category/${id}/`;

      await apiRequest({
        method: newStatus ? 'PUT' : 'DELETE',
        path: endpoint,
        data: { is_active: newStatus },
      });

      toast.success(
        newStatus
          ? 'Category enabled successfully'
          : 'Category disabled successfully',
      );

      // Update the state in the parent component
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === id ? { ...category, is_active: newStatus } : category,
        ),
      );
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="rounded-lg border border-stroke bg-white px-5  pt-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-1">
        <div className="flex justify-end">
          <Link href="/category/create">
            <span className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80">
              <Plus /> Add Category
            </span>
          </Link>
        </div>
        <ToastContainer />
        <div className="max-w-full">
          {loading ? (
            <div className="flex h-96 items-center justify-center">
              <span className="size-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></span>
            </div>
          ) : categories && categories.length > 0 ? (
            <CategoryTree
              categories={categories}
              moveCategory={moveCategory}
              saveCategoryOrder={saveCategoryOrder}
              toggleCategoryStatus={toggleCategoryStatus}
            />
          ) : (
            <div className="ml-4 mt-2 h-96 text-center">
              No categories available.
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default CategoryList;
