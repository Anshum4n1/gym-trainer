import { Button, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AddAppointment({setFormData,selectedClient,showAddModal,handleCloseAddModal,formData,handleAddAppointment}) {

  return (
    <div>

      {/* Modal for adding appointment */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Add Appointment for {selectedClient?.firstName} {selectedClient?.lastName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DatePicker
            selected={formData.date}
            onChange={(date) => setFormData({ ...formData, date })}
            dateFormat="MM/dd/yyyy"
          />
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
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddAppointment}>
            Add Appointment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddAppointment;
