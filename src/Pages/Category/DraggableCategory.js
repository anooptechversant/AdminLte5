import { forwardRef, useImperativeHandle, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  CATEGORY: "category",
};

const DraggableCategory = forwardRef(
  (
    {
      index,
      moveCategory,
      saveCategoryOrder,
      item,
      onEdit,
      onSwitchChange,
    },
    ref
  ) => {
    const internalRef = useRef(null);

    const [{ isDragging }, drag] = useDrag({
      type: ItemTypes.CATEGORY,
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: ItemTypes.CATEGORY,
      hover: (item, monitor) => {
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

    const dragDropRef = (node) => {
      internalRef.current = node;
      drag(drop(node));
    };

    useImperativeHandle(ref, () => internalRef.current);

    return (
      <li
        ref={internalRef}
        className={`my-4 ${isDragging ? "opacity-50" : ""}`}
        style={{
          display: "block",
          minWidth: "fit-content",
          minHeight: "fit-content",
          transition: "opacity 0.2s ease",
        }}
      >
        <div
          style={{
            flexShrink: 0,
            marginBottom: "10px",
            padding: "10px",
            background: "#f9f9f9",
            border: "1px solid #ddd",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          ref={dragDropRef}
          className='projects relative flex cursor-move items-center justify-between rounded-md border  px-4 py-2 '
        >
          <div className='category-details d-flex align-items-center gap-5'>
            <img alt={item?.name} className='table-avatar' src={item?.image} />
            <span>{item.name}</span>
          </div>
          <div className='category-actions d-flex align-items-center gap-2'>
            <button
              className='btn btn-info btn-sm'
              onClick={() => onEdit(item.id)}
            >
              <i className='fas fa-pencil-alt'></i>
            </button>
            <div
              className={`custom-control custom-switch ${
                item.is_active
                  ? "custom-switch-on-success"
                  : "custom-switch-off-danger"
              }`}
            >
              <input
                type='checkbox'
                className='custom-control-input'
                id={`customSwitch-${item.id}`}
                checked={item.is_active}
                onChange={() => onSwitchChange(item.id, item.is_active)}
              />
              <label
                className={`custom-control-label ${
                  item.is_active ? "text-success" : "text-danger"
                }`}
                htmlFor={`customSwitch-${item.id}`}
              >
                {item.is_active ? "Active" : "Inactive"}
              </label>
            </div>
          </div>
        </div>
      </li>
    );
  }
);
// DraggableCategory.displayName = "DraggableCategory";

export default DraggableCategory;
