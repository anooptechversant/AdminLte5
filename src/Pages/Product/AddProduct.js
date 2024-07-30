// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Text from "../../../Components/InputComponents/Text";
// import AddSecButtons from "../../../Components/CommonComponents/AddSecButtons";
// import "../../Css/menu.css";
// import { useNavigate, useParams } from "react-router-dom";
// import SelectionInput from "../../../Components/InputComponents/SelectionInput";
// import Spinner from "../../../Components/Loader/Loading";
// import Toasts from "../../../Components/CommonComponents/Toasts";
// import { getProductData } from "../../../Actions/ProductActions";
// import { getUnitData } from "../../../Actions/unitsActions";

// const AddProduct = ({ Data, Success, Error, Loading }) => {
//   const { brProdId, prodId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state);
//   const { unitData } = data.units;
//   const [inputProduct, setInputProduct] = useState({
//     is_active: "",
//     min_purchase_quantity: "",
//     weight_value: "",
//     weight_unit: "",
//     weight_description: "",
//     brand_product_id: "",
//     market_price: "",
//     selling_price: "",
//   });
//   const [validationError, setValidationError] = useState({
//     is_active: "",
//     min_purchase_quantity: "",
//     weight_value: "",
//     weight_unit: "",
//     weight_description: "",
//     supplier_id: "",
//     brand_product_id: "",
//     market_price: "",
//     selling_price: "",
//   });
//   const [editData, setEditData] = useState({});
//   const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(true);

//   const handleInputChange = (newValue, setterFunction) => {
//     setterFunction((prevState) => ({
//       ...prevState,
//       [newValue.name]: newValue.value,
//     }));
//     setValidationError((prevState) => ({
//       ...prevState,
//       [newValue.name]: newValue.value !== "" ? "" : "Required Field",
//     }));
//   };
//   useEffect(() => {
//     setAreAllErrorsEmpty(
//       Object.values(validationError).every((value) => !value)
//     );
//   }, [validationError]);

//   const is_activeArray = [
//     { option: "True", value: true },
//     { option: "False", value: false },
//   ];
//   const weight_unitArray = unitData?.map((unit) => ({
//     option: unit.unit,
//     value: unit.unit,
//   }));
//   const handleAddBrand = (type) => {
//     if (type === "save" || (type === "update" && prodId !== undefined)) {
//       const inputData = {
//         is_active: inputProduct.is_active,
//         min_purchase_quantity: Number(inputProduct.min_purchase_quantity),
//         weight_value: Number(inputProduct.weight_value),
//         weight_unit: inputProduct.weight_unit,
//         weight_description: inputProduct.weight_description,
//         brand_product_id: Number(brProdId),
//         market_price: Number(inputProduct.market_price),
//         selling_price: Number(inputProduct.selling_price),
//       };
//       const inputUpdateData = {
//         min_purchase_quantity: Number(inputProduct.min_purchase_quantity),
//         weight_value: Number(inputProduct.weight_value),
//         weight_unit: inputProduct.weight_unit,
//         weight_description: inputProduct.weight_description,
//         brand_product_id: Number(brProdId),
//         market_price: Number(inputProduct.market_price),
//         selling_price: Number(inputProduct.selling_price),
//       };
//       const argData =
//         type === "save" ? inputData : type === "update" ? inputUpdateData : "";
//       const argument =
//         type === "save" ? "insert" : type === "update" ? "update" : "";
//       dispatch(getProductData(argument, argData, prodId));
//       if (type === "update") {
//         setEditData([inputData]);
//       }
//     } else if (type === "cancel") {
//       window.history.back();
//     }
//   };
//   if (!prodId && Success && Success.data && Success.data.id) {
//     navigate(`/product/add-brand-supplier/${Success.data.id}`);
//   }
//   const goBack = () => {
//     window.history.back();
//   };
//   useEffect(() => {
//     dispatch(getUnitData("fetch"));
//     if (prodId) {
//       setEditData(Data);
//     } else {
//       setEditData({});
//     }
//   }, [dispatch, Data, prodId]);
//   useEffect(() => {
//     if (editData && Object.keys(editData).length > 0) {
//       const {
//         is_active,
//         min_purchase_quantity,
//         weight_value,
//         weight_unit,
//         weight_description,
//         brand_product_id,
//         market_price,
//         selling_price,
//       } = editData;
//       setInputProduct({
//         is_active,
//         min_purchase_quantity,
//         weight_value,
//         weight_unit,
//         weight_description,
//         brand_product_id,
//         market_price,
//         selling_price,
//       });
//       setValidationError((prevState) => ({
//         ...prevState,
//         is_active: is_active === "" ? "Required Field" : "",
//         min_purchase_quantity:
//           min_purchase_quantity === "" ? "Required Field" : "",
//         weight_value: weight_value === "" ? "Required Field" : "",
//         weight_unit: weight_unit === "" ? "Required Field" : "",
//         weight_description: weight_description === "" ? "Required Field" : "",
//         brand_product_id: brand_product_id === "" ? "Required Field" : "",
//         selling_price: selling_price === "" ? "Required Field" : "",
//         market_price: market_price === "" ? "Required Field" : "",
//       }));
//     }
//   }, [editData]);

//   const pageTitle = {
//     create: "Add Product",
//     update: "Update Product",
//   };
//   const successStatusData = Success;
//   const errorStatusData = Error;
//   const loading = Loading;
//   const responseMessage = {
//     insert: "Successfully added",
//     update: "Updated Successfully",
//   };

//   return (
//     <div>
//       {loading ? (
//         <Spinner />
//       ) : (
//         <div className='container-fluid'>
//           <Toasts
//             propResponseMessage={responseMessage}
//             propActionType={prodId !== undefined ? "update" : "insert"}
//             propStatusData={{ successStatusData, errorStatusData }}
//           />
//           <div className='card'>
//             <div className='card-body'>
//               <div className='row'>
//                 <div className='col-md-6 d-flex'>
//                   <span className='btn  ' onClick={goBack}>
//                     <i className='fa fa-chevron-left m-0 font-weight-bold '></i>
//                     <span className='add-label'> Back</span>
//                   </span>
//                   <h1 className='h3 mb-4 text-gray-800'>
//                     {editData && Object.keys(editData).length > 0
//                       ? pageTitle.update
//                       : pageTitle.create}
//                   </h1>
//                 </div>
//                 <div className='col-md-3'></div>
//               </div>
//               <div className='row'>
//                 <div className='col-md-6'>
//                   <label>
//                     Minimum Purchase Quantity
//                     <span className='errorLabel'>*</span>
//                   </label>
//                   <Text
//                     propOnChange={(newValue) =>
//                       handleInputChange(newValue, setInputProduct)
//                     }
//                     propValidationError={validationError.min_purchase_quantity}
//                     propAttributeValue='min_purchase_quantity'
//                     propValue={
//                       editData && Object.keys(editData).length > 0
//                         ? editData.min_purchase_quantity
//                         : ""
//                     }
//                   />{" "}
//                   <label>
//                     Weight Value
//                     <span className='errorLabel'>*</span>
//                   </label>
//                   <Text
//                     propOnChange={(newValue) =>
//                       handleInputChange(newValue, setInputProduct)
//                     }
//                     propValidationError={validationError.weight_value}
//                     propAttributeValue='weight_value'
//                     propValue={
//                       editData && Object.keys(editData).length > 0
//                         ? editData.weight_value
//                         : ""
//                     }
//                   />{" "}
//                   <label>
//                     Market Price
//                     <span className='errorLabel'>*</span>
//                   </label>
//                   <Text
//                     propOnChange={(newValue) =>
//                       handleInputChange(newValue, setInputProduct)
//                     }
//                     propValidationError={validationError.market_price}
//                     propAttributeValue='market_price'
//                     propValue={
//                       editData && Object.keys(editData).length > 0
//                         ? editData.market_price
//                         : ""
//                     }
//                   />{" "}
//                   {editData && Object.keys(editData).length > 0 ? null : (
//                     <>
//                       <label>
//                         IsActive <span className='errorLabel'>*</span>
//                       </label>
//                       <SelectionInput
//                         propOnChange={(newValue) =>
//                           handleInputChange(newValue, setInputProduct)
//                         }
//                         propValidationError={validationError.is_active}
//                         propAttributeValue='is_active'
//                         options={is_activeArray}
//                         propValue={
//                           editData && Object.keys(editData).length > 0
//                             ? editData.is_active
//                             : ""
//                         }
//                       />
//                     </>
//                   )}
//                 </div>
//                 <div className='col-md-6'>
//                   <label>
//                     Weight Unit
//                     <span className='errorLabel'>*</span>
//                   </label>
//                   <SelectionInput
//                     propOnChange={(newValue) =>
//                       handleInputChange(newValue, setInputProduct)
//                     }
//                     propValidationError={validationError.weight_unit}
//                     propAttributeValue='weight_unit'
//                     options={weight_unitArray}
//                     propValue={
//                       editData && Object.keys(editData).length > 0
//                         ? editData.weight_unit
//                         : ""
//                     }
//                   />
//                   <label>
//                     Weight Description
//                     <span className='errorLabel'>*</span>
//                   </label>
//                   <Text
//                     propOnChange={(newValue) =>
//                       handleInputChange(newValue, setInputProduct)
//                     }
//                     propValidationError={validationError.weight_description}
//                     propAttributeValue='weight_description'
//                     propValue={
//                       editData && Object.keys(editData).length > 0
//                         ? editData.weight_description
//                         : ""
//                     }
//                   />{" "}
//                   <label>
//                     Selling Price
//                     <span className='errorLabel'>*</span>
//                   </label>
//                   <Text
//                     propOnChange={(newValue) =>
//                       handleInputChange(newValue, setInputProduct)
//                     }
//                     propValidationError={validationError.selling_price}
//                     propAttributeValue='selling_price'
//                     propValue={
//                       editData && Object.keys(editData).length > 0
//                         ? editData.selling_price
//                         : ""
//                     }
//                   />{" "}
//                 </div>
//               </div>
//               <AddSecButtons
//                 handleSubmit={handleAddBrand}
//                 isNext={true}
//                 propAllErrorEmpty={areAllErrorsEmpty}
//                 propValue={prodId}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddProduct;
