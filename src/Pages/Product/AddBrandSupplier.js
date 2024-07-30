// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import AddSecButtons from "../../../Components/CommonComponents/AddSecButtons";
// import "../../Css/menu.css";
// import { useNavigate, useParams } from "react-router-dom";
// import SelectionInput from "../../../Components/InputComponents/SelectionInput";
// import Spinner from "../../../Components/Loader/Loading";
// import Toasts from "../../../Components/CommonComponents/Toasts";
// import { getProductData } from "../../../Actions/ProductActions";
// import { getUnitData } from "../../../Actions/unitsActions";
// import { getSupplierData } from "../../../Actions/supplierActions";

// const AddProduct = ({ Data, Success, Error, Loading }) => {
//   const { brProdId, add, prodId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state);
//   const { supplierData, supplierLoading } = data.supplier;
//   console.log(Success);
//   const [inputProduct, setInputProduct] = useState({
//     supplier_id: "",
//   });
//   const [validationError, setValidationError] = useState({
//     supplier_id: "",
//   });
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

//   const supplier_idArray = supplierData?.map((supplier) => ({
//     option: supplier.name,
//     value: supplier.id,
//   }));
//   const handleAddBrand = (type) => {
//     if (type === "save") {
//       const inputData = {
//         supplier_id: Number(inputProduct.supplier_id),
//         products_id: Number(prodId),
//       };

//       dispatch(getProductData("addSupplier", inputData));
//     } else if (type === "cancel") {
//       window.history.back();
//     }
//   };
//   if (!add && Success && Success.data && Success.data.id) {
//     navigate(`/product/add-product-image/${prodId}`);
//   }
//   const goBack = () => {
//     window.history.back();
//   };
//   useEffect(() => {
//     dispatch(getSupplierData("fetch"));
//   }, [dispatch, Data, prodId]);

//   const successStatusData = Success;
//   const errorStatusData = Error;
//   const responseMessage = {
//     insert: "Successfully added",
//     update: "Updated Successfully",
//   };

//   return (
//     <div>
//       {supplierLoading ? (
//         <Spinner />
//       ) : (
//         <div className='container-fluid'>
//           <Toasts
//             propResponseMessage={responseMessage}
//             propActionType={"insert"}
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
//                   <h1 className='h3 mb-4 text-gray-800'>Add Brand Supplier</h1>
//                 </div>
//                 <div className='col-md-3'></div>
//               </div>
//               <div className='row'>
//                 <div className='col-md-6'>
//                   <label>
//                     Supplier
//                     <span className='errorLabel'>*</span>
//                   </label>
//                   <SelectionInput
//                     propOnChange={(newValue) =>
//                       handleInputChange(newValue, setInputProduct)
//                     }
//                     propValidationError={validationError.supplier_id}
//                     propAttributeValue='supplier_id'
//                     options={supplier_idArray}
//                     propValue={""}
//                   />
//                 </div>
//                 <div className='col-md-6'></div>
//               </div>
//               <AddSecButtons
//                 handleSubmit={handleAddBrand}
//                 isNext={add ? false : true}
//                 propAllErrorEmpty={areAllErrorsEmpty}
//                 propValue={brProdId}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddProduct;
