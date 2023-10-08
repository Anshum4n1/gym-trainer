import { useState } from "react"
import { Button, FormControl, Modal } from "react-bootstrap"

function AddClient({showAddClientModal,setShowAddClientModal, handleAddClient}) {

  const [firstName, setFirstName] =  useState();
  const [lastName, setLastName] =  useState();
  const [location, setLocation] =  useState();
  const [isSubmitted, setIsSumitted ] = useState(false)

  const handleSubmit = () =>{
    setIsSumitted(true)
    if(firstName && lastName && location) {
      handleAddClient(firstName, lastName, location)
      setFirstName('')
      setLastName('')
      setLocation('')
      setIsSumitted(false)
    }
  }
   

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
          required
          value={firstName}
          onChange={(e) =>
          setFirstName( e.target.value) 
          }
          isInvalid={isSubmitted && !firstName}
        />
        <FormControl
          type="text"
          placeholder="Last Name"
          required
          value={lastName}
          onChange={(e) =>
            setLastName( e.target.value )
          }
          isInvalid={isSubmitted && !lastName}
        />
        <FormControl
          type="text"
          placeholder="Location"
          required
          value={location}
          onChange={(e) =>
            setLocation( e.target.value )
          }
          isInvalid={isSubmitted && !location}
        />
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowAddClientModal(false)}>
        Close
      </Button>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Add Client
      </Button>
    </Modal.Footer>
  </Modal></div>
  )
}

export default AddClient