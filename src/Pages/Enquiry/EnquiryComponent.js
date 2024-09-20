import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Enquiry from "./Enquiry";
import { getEnquiryData } from "../../Actions/enquiryActions";
const EnquiryComponent = () => {
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const isEnquiryRoute = location.pathname === "/enquiry";

  const { enquiryData, enquirySuccess, enquiryError, enquiryLoading } = useSelector(
    (state) => state.enquiry
  );

  useEffect(() => {
    dispatch(getEnquiryData("fetch"));
  }, [dispatch, id, isEnquiryRoute]);
  return (
    <>
      {isEnquiryRoute ? (
        <Enquiry
          Data={enquiryData}
          Success={enquirySuccess}
          Error={enquiryError}
          Loading={enquiryLoading}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default EnquiryComponent;
