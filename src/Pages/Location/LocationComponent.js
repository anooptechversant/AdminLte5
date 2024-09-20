import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddLocation from "./AddLocation";
import Location from "./Location";
import { getLocationData } from "../../Actions/locationActions";
const LocationComponent = () => {
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLocationRoute = location.pathname === "/location";
  const isAddLocationRoute = location.pathname === "/location/add-location";
  const isEditLocationRoute = location.pathname.startsWith(
    "/location/edit-location/"
  );
  const { locationData, locationSuccess, locationError, locationLoading } =
    useSelector((state) => state.location);

  useEffect(() => {
    dispatch(getLocationData("fetch"));
  }, [dispatch, id, isLocationRoute]);
  return (
    <>
      {isAddLocationRoute || isEditLocationRoute ? (
        <AddLocation
          Data={locationData}
          Success={locationSuccess}
          Error={locationError}
          Loading={locationLoading}
        />
      ) : isLocationRoute ? (
        <Location
          Data={locationData}
          Success={locationSuccess}
          Error={locationError}
          Loading={locationLoading}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default LocationComponent;
