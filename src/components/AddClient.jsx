import { Button, FormControl, Modal } from "react-bootstrap"

function AddClient({showAddClientModal, setNewClientFormData,setShowAddClientModal,newClientFormData, handleAddClient}) {
  return (
    <div> <Modal show={showAddClientModal} onHide={() => setShowAddClientModal(false)} centered>
    <Modal.Header closeButton>
      <Modal.Title>Add New Client</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="flex flex-col gap-3">
        <FormControl
          type="text"
          placeholder="First Name"
          value={newClientFormData.firstName}
          onChange={(e) =>
            setNewClientFormData({ ...newClientFormData, firstName: e.target.value })
          }
        />
        <FormControl
          type="text"
          placeholder="Last Name"
          value={newClientFormData.lastName}
          onChange={(e) =>
            setNewClientFormData({ ...newClientFormData, lastName: e.target.value })
          }
        />
        <FormControl
          type="text"
          placeholder="Location"
          value={newClientFormData.location}
          onChange={(e) =>
            setNewClientFormData({ ...newClientFormData, location: e.target.value })
          }
        />
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowAddClientModal(false)}>
        Close
      </Button>
      <Button variant="primary" onClick={handleAddClient}>
        Add Client
      </Button>
    </Modal.Footer>
  </Modal></div>
  )
}

export default AddClient