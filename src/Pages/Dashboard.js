import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductData } from "../Actions/ProductActions";
import { getOrderData } from "../Actions/orderActions";
import { getUserData } from "../Actions/userActions";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { productData, productLoading } = useSelector((state) => state.product);
  const { orderData, orderLoading } = useSelector((state) => state.order);
  const userData = useSelector((state) => state.user.userData);
  const userLoading = useSelector((state) => state.user.userLoading);
  const unapprovedUsers = useSelector((state) => state.user.unapprovedUsers);

  useEffect(() => {
    dispatch(getProductData("fetch", 20, 1));
    dispatch(getOrderData("fetch", 20, 1, "PENDING"));
    dispatch(getUserData("fetch", 20, 1));
    dispatch(getUserData("unapproved", 20, 1, "B2B"));
  }, [dispatch]);

  return (
    <>
      <div className='content-header'>
        <div className='container-fluid'>
          <div className='row mb-2'>
            <div className='col-sm-6'>
              <h1 className='m-0'>Dashboard</h1>
            </div>
            <div className='col-sm-6'>
              <ol className='breadcrumb float-sm-right'>
                <li className='breadcrumb-item'>
                  <Link to='/'>Home</Link>
                </li>
                <li className='breadcrumb-item active'>Dashboard</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section className='content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-3 col-6'>
              <div className='small-box bg-info'>
                <div className='inner'>
                  {productLoading ? (
                    <h3>loading...</h3>
                  ) : (
                    <h3>{productData.total_records}</h3>
                  )}

                  <p>Total Products</p>
                </div>
                <div className='icon'>
                  <i className='ion ion-bag'></i>
                </div>
                <Link href='/product' className='small-box-footer'>
                  More info <i className='fas fa-arrow-circle-right'></i>
                </Link>
              </div>
            </div>

            <div className='col-lg-3 col-6'>
              <div className='small-box bg-success'>
                <div className='inner'>
                  {orderLoading ? (
                    <h3>loading...</h3>
                  ) : (
                    <h3>{orderData.total_records}</h3>
                  )}

                  <p>Total Orders</p>
                </div>
                <div className='icon'>
                  <i className='ion ion-stats-bars'></i>
                </div>
                <Link to='/orders' className='small-box-footer'>
                  More info <i className='fas fa-arrow-circle-right'></i>
                </Link>
              </div>
            </div>

            <div className='col-lg-3 col-6'>
              <div className='small-box bg-warning'>
                <div className='inner'>
                  {!unapprovedUsers?.total_records ? (
                    <h3>loading...</h3>
                  ) : (
                    <h3>{unapprovedUsers.total_records}</h3>
                  )}

                  <p>Unapproved Users</p>
                </div>
                <div className='icon'>
                  <i className='ion ion-person-add'></i>
                </div>
                <Link
                  to='/user-type/user-role/B2B'
                  className='small-box-footer'
                >
                  More info <i className='fas fa-arrow-circle-right'></i>
                </Link>
              </div>
            </div>

            <div className='col-lg-3 col-6'>
              <div className='small-box bg-danger'>
                <div className='inner'>
                  {userLoading ? (
                    <h3>loading...</h3>
                  ) : (
                    <h3>{userData.total_records}</h3>
                  )}

                  <p>Total Users</p>
                </div>
                <div className='icon'>
                  <i className='ion ion-pie-graph'></i>
                </div>
                <Link to='/users' className='small-box-footer'>
                  More info <i className='fas fa-arrow-circle-right'></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
