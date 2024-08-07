import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

const ViewUser = (props) => {
  const { Data } = props;
  const name = Data[0]?.name || "NILL";
  const email = Data[0]?.email || "NILL";
  const companyName = Data[0]?.profile.company || "NILL";
  const image = Data[0]?.profile.image || "NILL";
  const education = Data[0]?.profile.education || "NILL";
  const year_of_exp = Data[0]?.profile.year_of_exp || "NILL";
  const phone = Data[0]?.phone_prefix + "-" + Data[0]?.phone || "NILL";

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton className='d-flex justify-content-center'>
        <Modal.Title
          id='contained-modal-title-vcenter'
          className='d-flex justify-content-center  w-100'
        >
          <strong>{name}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='d-flex row'>
          <div className='col-md-6 d-flex justify-content-center'>
            <div>
              <h4>
                {" "}
                Company Name :<strong> {companyName}</strong>
              </h4>
              <p>
                {" "}
                Email :<strong> {email}</strong>
              </p>
              <p>
                {" "}
                Phone :<strong> {phone}</strong>
              </p>
              <h5>
                {" "}
                Education :<strong> {education}</strong>
              </h5>
              <h5>
                {" "}
                Year Of experience :<strong> {year_of_exp}</strong>
              </h5>
            </div>
          </div>
          <div className='col-md-6 d-flex justify-content-center align-items-center h-full '>
            <div className='d-flex justify-content-center'>
              {" "}
              <img
                src={image}
                alt={image}
                className='img-fluid object-fit-contain'
                width='35%'
              />
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-evenly row mt-4'>
          <div class='col-12 mt-4' id='accordion'>
            <div class='card card-primary card-outline'>
              <a
                class='d-block w-100'
                data-toggle='collapse'
                href='#collapseTwo'
              >
                <div class='card-header'>
                  <h4 class='card-title w-100'>Budget</h4>
                </div>
              </a>
              <div id='collapseTwo' class='collapse' data-parent='#accordion'>
                <div class='card-body'>
                  {Data[0]?.budget.map((budget) => (
                    <Card key={budget.id} className={`text-center w-25`}>
                      <Card.Header className='d-flex justify-content-center'>
                        {budget.price}{" "}
                        {/* <i className='fas fa-edit edit-icon text-primary'></i> */}
                      </Card.Header>
                      <Card.Body>
                        <Card.Text>{budget.unit}</Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className='btn-danger' onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewUser;
