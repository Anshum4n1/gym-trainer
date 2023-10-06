import { Button, Modal } from "react-bootstrap"
import DatePicker from 'react-datepicker';

const EditModal = ({showEditModal,handleCloseEditModal,selectedClient,formData,setFormData,handleEditAppointment}) => {
  return (
    <Modal show={showEditModal} onHide={handleCloseEditModal} centered >
        <Modal.Header closeButton>
          <Modal.Title>
            Edit Appointment for {selectedClient?.firstName} {selectedClient?.lastName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="mb-3 flex flex-col gap-1.5">
            <label>Date</label>
          <DatePicker
            selected={formData.date}
            onChange={(date) => setFormData({ ...formData, date })}
            dateFormat="MM/dd/yyyy"
            className='w-full border px-2 py-1.5 rounded '
          />
          </div>
          <div className="mb-3">
            <label>Time</label>
            <input
              type="time"
              className="form-control"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditAppointment}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default EditModal