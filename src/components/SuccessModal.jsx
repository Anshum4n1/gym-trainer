import { Button, Modal } from 'react-bootstrap'

function SuccessModal({showSuccessModal,handleCloseSuccessModal}) {
  return (
    <div>      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
    <Modal.Header closeButton>
      <Modal.Title>Appointment Added Successfully</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Your appointment has been added successfully!
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseSuccessModal}>
        Close
      </Button>
    </Modal.Footer>
  </Modal></div>
  )
}

export default SuccessModal