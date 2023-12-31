import { Button, Modal } from "react-bootstrap"


const DeleteModal = ({showDeleteModal,handleCloseDeleteModal,confirmDeleteAppointment, confirmDeleteClient, isClient}) => {
  return (
    <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this {isClient ? 'client' : 'appointment'}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={()=> isClient ? confirmDeleteClient(): confirmDeleteAppointment()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default DeleteModal