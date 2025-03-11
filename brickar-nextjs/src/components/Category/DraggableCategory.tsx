import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { DraggableCategoryProps } from '@/types/category';

import Check from '../Svg/Check';
import Close from '../Svg/Close';
import Edit from '../Svg/Edit';
// import CategoryTree from './CategoryTree';

const DraggableCategory = forwardRef<HTMLLIElement, DraggableCategoryProps>(
  (
    { category, index, moveCategory, saveCategoryOrder, toggleCategoryStatus },
    ref,
  ) => {
    const internalRef = useRef<HTMLLIElement | any>(null);

    const [{ isDragging }, drag] = useDrag({
      type: 'CATEGORY',
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: 'CATEGORY',
      hover: (item: { index: number }, monitor) => {
        const hoverBoundingRect = internalRef.current?.getBoundingClientRect();
        const hoverMiddleY = hoverBoundingRect
          ? (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
          : 0;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset
          ? clientOffset.y - (hoverBoundingRect?.top || 0)
          : 0;

        if (!hoverBoundingRect) return;

        if (item.index < index && hoverClientY < hoverMiddleY) return;
        if (item.index > index && hoverClientY > hoverMiddleY) return;

        if (item.index !== index) {
          moveCategory(item.index, index);
          item.index = index;
        }
      },
      drop: () => {
        saveCategoryOrder();
      },
    });

    const dragDropRef = (node: HTMLSpanElement | null) => {
      internalRef.current = node;
      drag(drop(node));
    };

    useImperativeHandle(ref, () => internalRef.current);

    const router = useRouter();

    const handleEdit = (id: string) => {
      router.push(`/category/edit/${id}`);
    };

    return (
      <li
        ref={internalRef}
        className={`my-4 ${isDragging ? 'opacity-50' : ''}`}
        style={{
          display: 'block',
          minWidth: 'fit-content',
          minHeight: 'fit-content',
          transition: 'opacity 0.2s ease',
        }}
      >
        <div
          style={{
            flexShrink: 0,
          }}
          ref={dragDropRef}
          className="relative flex cursor-move items-center justify-between rounded-md border border-primary bg-primary/10 px-4 py-2 font-medium text-primary dark:text-white"
        >
          <Image
            alt={category.name}
            src={category?.image}
            width={50}
            height={50}
            className="size-[40px] rounded-full object-cover"
          />
          <span>{category.name}</span>
          <div className="flex items-center space-x-3.5">
            <div className="group relative">
              <button
                className="hover:text-primary"
                onClick={() => handleEdit(category.id)}
              >
                <Edit />
              </button>
              {/* <Tooltip content="Edit" /> */}
            </div>
            <div className="group relative">
              <div className="group relative flex items-center">
                <label
                  htmlFor={`toggle-${category.id}`}
                  className="flex cursor-pointer select-none items-center"
                  data-tooltip-id={`delete-tooltip-${category.id}`}
                  data-tooltip-content={
                    category.is_active ? 'Disable Brand' : 'Enable Brand'
                  }
                >
                  <div className="group relative">
                    <input
                      type="checkbox"
                      id={`toggle-${category.id}`}
                      className="sr-only"
                      onChange={() =>
                        toggleCategoryStatus(category.id, category.is_active)
                      }
                    />
                    <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
                    <div
                      className={`dot absolute !right-1 left-1 top-1 flex size-6 items-center justify-center rounded-full ${category.is_active ? '!translate-x-full !bg-primary' : ''} bg-white transition dark:!bg-white`}
                    >
                      {category.is_active ? (
                        <span className=" text-white dark:text-bodydark">
                          <Check />
                        </span>
                      ) : (
                        <Close />
                      )}
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* {category.children && (
          <CategoryTree
            categories={category.children}
            moveCategory={moveCategory}
            saveCategoryOrder={saveCategoryOrder}
          />
        )} */}
      </li>
    );
  },
);
DraggableCategory.displayName = 'DraggableCategory';

export default DraggableCategory;
