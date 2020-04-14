import React from "react";
import { Modal } from "react-bootstrap";

// Como recomendacion general cuentan con mushoss componentes el comentar el codigo de cada uno de estos seria ideal pues las personas que
// no conozcan el codigo podrian llegar a tener problemas al momento de entender que estan haciendo en cada uno de los componentes.


function Confirmacion(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.message}</Modal.Body>
    </Modal>
  );
}

export default Confirmacion;
