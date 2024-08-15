import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddUnits from "./AddUnits";
import Units from "./Units";
import { getUnitData } from "../../Actions/unitsActions";
const UnitsComponent = () => {
  const location = useLocation();
   const { id } = useParams();
  const dispatch = useDispatch();
  const isUnitsRoute = location.pathname === "/units";
  const isAddUnitsRoute = location.pathname === "/units/add-units";
  const isEditUnitsRoute = location.pathname.startsWith("/units/edit-units/");
  const { unitData, unitSuccess, unitError, unitLoading } = useSelector(
    (state) => state.units
  );

  useEffect(() => {
    dispatch(getUnitData("fetch"));
  }, [dispatch, id, isUnitsRoute]);
  return (
    <>
      {isAddUnitsRoute || isEditUnitsRoute ? (
        <AddUnits
          Data={unitData}
          Success={unitSuccess}
          Error={unitError}
          Loading={unitLoading}
        />
      ) : isUnitsRoute ? (
        <Units
          Data={unitData}
          Success={unitSuccess}
          Error={unitError}
          Loading={unitLoading}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default UnitsComponent;
