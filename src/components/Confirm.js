import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function Confirm(props) {

  return (
    <Modal
      onHide={props.onRemoveCancel}
      show={true}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton >
        <Modal.Title id="contained-modal-title-vcenter">
          Are you sure?
            </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Do you really want to remove {props.tasksSize} task{props.tasksSize > 1 && "s"}? This process cannot be undone. </h6>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onRemoveConfirm}>Delete</Button>
        <Button onClick={props.onRemoveCancel}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

Confirm.propTypes = {
  onRemoveConfirm: PropTypes.func.isRequired,
  onRemoveCancel: PropTypes.func.isRequired,
  tasksSize: PropTypes.number.isRequired
} 
