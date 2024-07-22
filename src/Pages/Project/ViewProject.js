import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";

const ViewProject = (props) => {
  const { Data } = props;
  const name = Data && Data.length > 0 ? Data[0].name : "";
  const description = Data && Data.length > 0 ? Data[0].description : "";

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
        <h4>
          {" "}
          <strong>Description : </strong>
          {description}
        </h4>
        <div className='d-flex justify-content-evenly row'>
          {Data[0]?.medias.map((image) => (
            <Card key={image.id} className={`text-center ml-4 mb-4 col-md-3 `}>
              <Card.Body>
                <img
                  src={image.url}
                  alt={image.given_name}
                  className='img-fluid object-fit-contain'
                 
                />
              </Card.Body>
            </Card>
          ))}
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

export default ViewProject;
