import { Button, Modal } from "react-bootstrap"


const DeleteModal = ({showDeleteModal,handleCloseDeleteModal,confirmDeleteAppointment}) => {
  return (
    <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this appointment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteAppointment}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default DeleteModal