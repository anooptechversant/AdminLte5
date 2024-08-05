import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import profileImage from "../../assets/Images/undraw_profile.svg";
import Spinner from "../../Components/Loader/Loading";
import "./DetailView.css";
import { Link, useNavigate } from "react-router-dom";
import ViewWorkType from "./ViewWorkType";

const DetailedView = ({ Data, Success, Error, Loading }) => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [showData, setShowData] = useState(Data?.worktype);

  const goBack = () => {
    window.history.back();
  };
  const handleProjectView = () => {
    navigate(`/project/user-project/${Data.id}`);
  };
  const handleBudgetView = () => {
    navigate(`/budget/user-budget/${Data.id}`);
  };
  const handleBudgetAdd = () => {
    navigate(`/budget/add-budget/${Data.id}`);
  };
  const handleProjectAdd = () => {
    navigate(`/project/add-project/${Data.id}`);
  };
  const handleWorkTypeAdd = () => {
    navigate(`/users/add-work-type/${Data.id}`);
  };

  useEffect(() => {
    setShowData(Data?.worktype);
  }, [Data]);

  const handleWorkTypeView = () => {
    setModalShow(true);
  };

  return (
    <>
      {Loading ? (
        <Spinner />
      ) : (
        <div className='container-fluid'>
          <section className='content-header'>
            <div className='container-fluid'>
              <div className='row mb-2'>
                <div className='col-sm-6'>
                  <h1>Supplier</h1>
                </div>
                <div className='col-sm-6'>
                  <ol className='breadcrumb float-sm-right'>
                    <li className='breadcrumb-item'>
                      <Link href='/'>Home</Link>
                    </li>
                    <li className='breadcrumb-item active'>Supplier</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>
          <section className='content'>
            <div className='container-fluid'>
              {Data ? (
                <>
                  <ViewWorkType
                    Data={showData}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />

                  <Card className='text-center'>
                    {/* <Card.Header className='d-flex justify-content-between align-items-center'>
                      <span className='btn' onClick={goBack}>
                        <i className='fa fa-chevron-left m-0 font-weight-bold'></i>
                        <span className='add-label'> Back</span>
                      </span>
                    </Card.Header> */}
                    <div className='card card-primary'>
                      <div className='card-header'>
                        <h3 className='card-title'>
                          <small>
                            {" "}
                            <span className='' onClick={goBack}>
                              <i className='fa fa-chevron-left m-0 font-weight-bold'></i>
                              <span className='add-label'> Back</span>
                            </span>
                          </small>
                        </h3>
                        <div className='card-tools'>
                         
                        </div>
                      </div>
                    </div>
                    <Card.Body className='bg-gray-100'>
                      <Card.Text>
                        <section id='content' className='container'>
                          <div className='page-heading'>
                            <div className='media  row'>
                              <div className='col-md-6 mt-5 media-left pr30'>
                                <img
                                  className='media-object  img-fluid'
                                  src={
                                    Data.profile !== null
                                      ? Data.profile.image
                                      : profileImage
                                  }
                                  alt='...'
                                  width={250}
                                  height={250}
                                />
                              </div>
                              <div className='col-md-6 media-body mt-5'>
                                <h2 className='media-heading'>
                                  <small> Name - </small>
                                  {Data.name}
                                </h2>
                                <p className='lead'>
                                  <>
                                    <h4 className='media-heading d-flex justify-content-between'>
                                      {" "}
                                      <span> Company Name :</span>
                                      <strong>
                                        {Data.profile !== null
                                          ? Data.profile.company
                                          : "NILL"}
                                      </strong>
                                    </h4>
                                    <h5 className='media-heading d-flex justify-content-between'>
                                      {" "}
                                      <span> Education :</span>
                                      <strong>
                                        {Data.profile !== null
                                          ? Data.profile.education
                                          : "NILL"}
                                      </strong>
                                    </h5>
                                    <h5 className='media-heading d-flex justify-content-between'>
                                      {" "}
                                      <span> Year Of experience :</span>
                                      <strong>
                                        {Data.profile !== null
                                          ? Data.profile.year_of_exp
                                          : "NILL"}{" "}
                                      </strong>
                                    </h5>
                                  </>
                                </p>
                                <div className='media-links'>
                                  <ul className='list-inline list-unstyled '>
                                    <li className=' d-flex justify-content-between'>
                                      <a href='#' title='phone link'>
                                        <span className='fa fa-phone-square fs35 text-system'></span>
                                      </a>
                                      <span className='ml-3'>
                                        {Data.phone_prefix + "-" + Data.phone}
                                      </span>
                                    </li>
                                    <li className=' d-flex justify-content-between'>
                                      <a href='#' title='email link'>
                                        <span className='fa fa-envelope-square fs35 text-muted'></span>
                                      </a>
                                      <span className='ml-3'>
                                        {Data.email || "NILL"}
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className='row justify-content-center mt-5'>
                              <div className='col-md-12'>
                                <div className='panel'>
                                  <div className='panel-heading'>
                                    <span className='panel-icon'>
                                      <i className='fa fa-star'></i>
                                    </span>
                                    <span className='panel-title'>
                                      User Details
                                    </span>
                                  </div>
                                  <div className='pn'>
                                    <table className='table mbn tc-icon-1 tc-med-2 tc-bold-last'>
                                      <thead>
                                        <tr className='hidden'>
                                          <th></th>
                                          <th>Action</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>
                                            <strong>Projects</strong>
                                          </td>
                                          <td>
                                            <span
                                              className='btn btn-outline-primary rounded btn-sm'
                                              onClick={() => {
                                                handleProjectAdd();
                                              }}
                                            >
                                              <i className='fa fa-plus'></i>
                                            </span>
                                            <span
                                              onClick={() => {
                                                handleProjectView();
                                              }}
                                              className='ml-2 btn btn-primary align-item-center justify-content-center btn-circle btn-sm'
                                            >
                                              <i className='fas fa-eye eye-icon '></i>
                                            </span>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            {" "}
                                            <strong>Budget</strong>
                                          </td>
                                          <td>
                                            <span
                                              className='btn btn-outline-primary rounded btn-sm'
                                              onClick={() => {
                                                handleBudgetAdd();
                                              }}
                                            >
                                              <i className='fa fa-plus'></i>
                                            </span>
                                            <span
                                              onClick={() => {
                                                handleBudgetView();
                                              }}
                                              className='ml-2 btn btn-primary align-item-center justify-content-center btn-circle btn-sm'
                                            >
                                              <i className='fas fa-eye eye-icon '></i>
                                            </span>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            {" "}
                                            <strong>Work Type</strong>
                                          </td>
                                          <td>
                                            <span
                                              className='btn btn-outline-primary rounded btn-sm'
                                              onClick={() => {
                                                handleWorkTypeAdd();
                                              }}
                                            >
                                              <i className='fa fa-plus'></i>
                                            </span>
                                            <span
                                              onClick={() => {
                                                handleWorkTypeView();
                                              }}
                                              className='ml-2 btn btn-primary align-item-center justify-content-center btn-circle btn-sm'
                                            >
                                              <i className='fas fa-eye eye-icon '></i>
                                            </span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className='text-muted'></Card.Footer>
                  </Card>
                </>
              ) : (
                <div className=''>No Data Available</div>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default DetailedView;
