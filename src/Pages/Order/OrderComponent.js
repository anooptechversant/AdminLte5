import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Order from "./Order";
import ViewOrder from "./ViewOrder";
import { getOrderData } from "../../Actions/orderActions";
import UpdateTrackOrder from "./UpdateTrackOrder";

const OrderComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [currPage, setCurrPage] = useState(1);
  const [records, setRecords] = useState([]);
  const [limit, setLimit] = useState(8);
  const [orderStatus, setOrderStatus] = useState("PENDING");
  const isOrderRoute = location.pathname === "/orders";

  const isViewOrderRoute = location.pathname.startsWith("/orders/view-order/");
  const isUpdateOrderRoute = location.pathname.startsWith(
    "/orders/update-order/"
  );
  const {
    orderData,
    userOrderData,
    orderLoading,
    orderSuccess,
    orderError,
    deleteOrder,
  } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderData("fetch", limit, currPage, orderStatus));
    if (id) {
      dispatch(getOrderData("single", id));
    }
  }, [
    dispatch,
    id,
    limit,
    currPage,
    isViewOrderRoute,
    isUpdateOrderRoute,
    orderStatus,
    deleteOrder,
  ]);
  useEffect(() => {
    const newData = orderData.records?.map((item) => {
      const formattedDeliveryDate = new Date(
        item.OrderTrack.delivery_date
      ).toLocaleString();
      return {
        id: item.Order.id,
        order_status: item.OrderTrack.status,
        quantity: item.OrderDetails.quantity,
        payment_type: item.Order.payment_type,
        delivery_date: formattedDeliveryDate,
        user_id: item.Order.user_id,
        product_name: item.OrderDetails.product_name,
      };
    });
    setRecords(newData);
  }, [orderData.records]);
  const currentPageChange = (currPage) => {
    setCurrPage(currPage);
  };
  const limitChange = (limit) => {
    setLimit(limit);
  };
  const currentPage = orderData.current_page;
  const totalPages = orderData.total_pages;

  return (
    <>
      {isOrderRoute ? (
        <>
          <Order
            Data={records}
            Success={orderSuccess}
            Error={orderError}
            Loading={orderLoading}
            propTotalPages={totalPages}
            propCurrentPage={currentPage}
            setOrderStatus={setOrderStatus}
            currentPageChange={currentPageChange}
            limitChange={limitChange}
          />
        </>
      ) : isViewOrderRoute ? (
        <ViewOrder
          viewData={userOrderData}
          Success={orderSuccess}
          Error={orderError}
          Loading={orderLoading}
        />
      ) : isUpdateOrderRoute ? (
        <UpdateTrackOrder
          Data={userOrderData}
          Success={orderSuccess}
          Error={orderError}
          Loading={orderLoading}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default OrderComponent;
