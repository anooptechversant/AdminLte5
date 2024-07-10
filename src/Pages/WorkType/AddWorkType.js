// import React, { useState, useEffect } from "react";
// import Text from "../../../Components/InputComponents/Text";
// import AddSecButtons from "../../../Components/CommonComponents/AddSecButtons";
// import { useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getWorkTypeData } from "../../../Actions/workTypeActions";
// import Spinner from "../../../Components/Loader/Loading";
// import Toasts from "../../../Components/CommonComponents/Toasts";

// function AddWorkType({ Data, Success, Error, Loading }) {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const [inputWorkType, setInputWorkType] = useState({ worktype: "" });
//   const [validationError, setValidationError] = useState({ worktype: "" });
//   const [editData, setEditData] = useState([]);
//   const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(true);

//   const handleWorkTypeChange = (newWorkType) => {
//     setInputWorkType((prevState) => ({
//       ...prevState,
//       [newWorkType.name]: newWorkType.value,
//     }));
//     setValidationError((prevState) => ({
//       ...prevState,
//       [newWorkType.name]: newWorkType.value !== "" ? "" : "Required Field",
//     }));
//   };
//   useEffect(() => {
//     setAreAllErrorsEmpty(
//       Object.values(validationError).every((value) => !value)
//     );
//   }, [validationError]);
//   const handleAddWorkType = (type) => {
//     if (type === "save") {
//       dispatch(getWorkTypeData("insert", inputWorkType, 0));
//     } else if (type === "cancel") {
//       window.history.back();
//     } else {
//       if (id !== undefined) {
//         dispatch(getWorkTypeData("update", inputWorkType, id));
//         setEditData([{ worktype: inputWorkType.worktype }]);
//       }
//     }
//   };

//   const goBack = () => {
//     window.history.back();
//   };
// useEffect(() => {
//   setEditData(Data.filter((obj) => obj.id == id));
// }, [Data, id]);
//   useEffect(() => {
//     if (editData.length > 0) {
//       setInputWorkType({ worktype: editData[0].workType });
//       setValidationError({ worktype: "" });
//     }
//   }, [editData]);

//   const successStatusData = Success;
//   const loading = Loading;
//   const errorStatusData = Error;
//   const pageTitle = {
//     create: "Add Work Type",
//     update: "Update Work Type",
//   };
//   const responseMessage = {
//     insert: "Work type successfully added",
//     update: "Work type Updated Successfully",
//   };
//   return (
//     <div>
//       {loading ? (
//         <Spinner />
//       ) : (
//         <div className='container-fluid'>
//           <Toasts
//             propResponseMessage={responseMessage}
//             propStatusData={{ successStatusData, errorStatusData }}
//             propActionType={id !== undefined ? "update" : "insert"}
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
//                     {editData[0] ? pageTitle.update : pageTitle.create}
//                   </h1>
//                 </div>
//                 <div className='col-md-3'></div>
//               </div>
//               <div className='row'>
//                 <div className='col-md-6'>
//                   <label>
//                     Work Type Name <span className='errorLabel'>*</span>
//                   </label>
//                   <Text
//                     propOnChange={handleWorkTypeChange}
//                     propValidationError={validationError.worktype}
//                     propAttributeValue='worktype'
//                     propValue={editData[0] ? editData[0].worktype : ""}
//                   />
//                 </div>
//               </div>
//               <AddSecButtons
//                 handleSubmit={handleAddWorkType}
//                 propAllErrorEmpty={areAllErrorsEmpty}
//                 propValue={id}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AddWorkType;
