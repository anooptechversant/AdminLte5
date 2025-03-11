import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategoryData } from "../../Actions/categoryActions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableCategory from "./DraggableCategory";
import Spinner from "../../Components/Loader/Loading";
import Toasts from "../../Components/Common/Toasts";

const Category = ({ Data, Success, Error, Loading, isActiveData }) => {
  const successStatusData = Success || isActiveData;
  const errorStatusData = Error;
  const responseMessage = {
    success: "successful",
  };
  const [categories, setCategories] = useState(Data || []);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setCategories(Data);
  }, [Data]);

  const handleCategoryActivate = (id) => {
    const data = { is_active: true };
    dispatch(getCategoryData("activate", data, id));
  };

  const handleCategoryDeactivate = (id) => {
    const data = { is_active: false };
    dispatch(getCategoryData("deactivate", data, id));
  };

  const handleSwitchChange = (id, isActive) => {
    if (isActive) {
      handleCategoryDeactivate(id);
    } else {
      handleCategoryActivate(id);
    }
  };

  const handleCategoryEdit = (id) => {
    navigate(`/category/edit-category/${id}`);
  };

  const handleCategoryAdd = () => {
    navigate("/category/add-category");
  };

  const moveItem = (fromIndex, toIndex) => {
    const updatedData = [...categories]; // Copy the data
    const [movedItem] = updatedData.splice(fromIndex, 1);
    updatedData.splice(toIndex, 0, movedItem);
    setCategories(updatedData);
  };
  
  const moveCategory = (dragIndex, hoverIndex) => {
    const updatedCategories = [...categories];
    const draggedCategory = updatedCategories[dragIndex];

    updatedCategories.splice(dragIndex, 1);
    updatedCategories.splice(hoverIndex, 0, draggedCategory);

    setCategories(updatedCategories);
  };

  const saveCategoryOrder = async () => {
    const formattedData = categories.map((category, index) => ({
      id: category.id,
      priority: index + 1,
    }));
    dispatch(getCategoryData("priority", formattedData));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {Loading && <Spinner />}
      <Toasts
        propResponseMessage={responseMessage}
        propActionType={"success"}
        propStatusData={{ successStatusData, errorStatusData }}
      />
      <section className='content-header'>
        <div className='container-fluid'>
          <div className='row mb-2'>
            <div className='col-sm-6'>
              <h1>Category</h1>
            </div>
            <div className='col-sm-6'>
              <ol className='breadcrumb float-sm-right'>
                <li className='breadcrumb-item'>
                  <a href='/'>Home</a>
                </li>
                <li className='breadcrumb-item active'>Category</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className='content'>
        <div className='container-fluid'>
          <div className=''>
            <div className='card-header mb-3'>
              <div className='card-tools'>
                <button
                  className='btn btn-tool pointer-event'
                  onClick={() => handleCategoryAdd()}
                >
                  <i className='fa fa-plus'></i> Add
                </button>
              </div>
            </div>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {categories.map((item, index) => (
                <DraggableCategory
                  key={item.id}
                  item={item}
                  index={index}
                  moveItem={moveItem}
                  onEdit={handleCategoryEdit}
                  onSwitchChange={handleSwitchChange}
                  moveCategory={moveCategory}
                  saveCategoryOrder={saveCategoryOrder}
                />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </DndProvider>
  );
};

export default Category;
