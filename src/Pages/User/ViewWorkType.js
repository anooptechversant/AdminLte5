import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";

const ViewWorkType = (props) => {
  const navigate = useNavigate();

  const { Data } = props;
  const types = Data?.types || "NILL";
  const userId = Data?.user_id || "NILL";
  const Id = Data?.id || "NILL";

  const handleWorkTypeEdit = () => {
    navigate(`/users/edit-work-type/${userId}/${Id}`);
  };
  const handleWorkTypeAdd = () => {
    navigate(`/users/add-work-type/${userId}`);
  };
  return (
    <>
      {Data ? (
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
              <strong>Work Types</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='d-flex justify-content-center'>
              <div className='w-100'>
                <h4>
                  <ListGroup as='ol' numbered>
                    {types.map((type, index) => (
                      <ListGroup.Item key={index} as='li'>
                        <strong>{type}</strong>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </h4>
              </div>
            </div>
            <div className='d-flex justify-content-evenly row mt-4'></div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className='btn-outline-primary  text-light'
              onClick={() => handleWorkTypeAdd()}
            >
              <i className='fas fa-add add-icon text-light'></i> Add
            </Button>
            <Button onClick={() => handleWorkTypeEdit()}>
              <i className='fas fa-edit edit-icon text-light'></i> Edit
            </Button>
            <Button className='btn-danger' onClick={props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

export default ViewWorkType;
