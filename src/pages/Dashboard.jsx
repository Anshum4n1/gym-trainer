import  { useState,useEffect } from 'react';
import { Button, Modal, Table, FormControl, Badge } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SuccessModal from '../components/SuccessModal';
import DeleteModal from '../components/DeleteModal';

function Dashboard() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showAddClientModal, setShowAddClientModal] = useState(false); // Add this state variable
  const [newClientFormData, setNewClientFormData] = useState({ // Add this state variable
    firstName: '',
    lastName: '',
    location: '',
  });
  const [formData, setFormData] = useState({
    date: null,
    time: '',
  });

  const [clients, setClients] = useState([
    { id: 1, firstName: 'John', lastName: 'Doe', location: 'New York', appointments: [] },
    { id: 2, firstName: 'Jane', lastName: 'Smith', location: 'Los Angeles', appointments: [] },
    { id: 3, firstName: 'Mike', lastName: 'Johnson', location: 'Chicago', appointments: [] },
    { id: 4, firstName: 'Emily', lastName: 'Brown', location: 'Houston', appointments: [] },
    { id: 5, firstName: 'William', lastName: 'Jones', location: 'Miami', appointments: [] },
    { id: 6, firstName: 'Olivia', lastName: 'Davis', location: 'Seattle', appointments: [] },
    { id: 7, firstName: 'Liam', lastName: 'Wilson', location: 'San Francisco', appointments: [] },
    { id: 8, firstName: 'Sophia', lastName: 'Lee', location: 'Boston', appointments: [] },
    { id: 9, firstName: 'Lucas', lastName: 'Garcia', location: 'Denver', appointments: [] },
    { id: 10, firstName: 'Ava', lastName: 'Martinez', location: 'Atlanta', appointments: [] },
    // Add more dummy clients here
  ]);
  

  // Fetch clients data from local storage when the component mounts
  useEffect(() => {
    const clientsData = JSON.parse(localStorage.getItem('clientsData'));
    if (clientsData) {
      setClients(clientsData);
    }
  }, []);
  
  // Update local storage whenever 'clients' change
  useEffect(() => {
    localStorage.setItem('clientsData', JSON.stringify(clients));
  }, [clients]);
  const handleFirstNameChange = (e, index) => {
    const updatedClients = [...clients];
    updatedClients[index].firstName = e.target.value;
    setClients(updatedClients);
  };
  const handleShowAddClientModal = () => { // Function to show "Add Client" modal
    setShowAddClientModal(true);
  };

  const handleAddClient = () => { // Function to handle adding a new client
    const newClient = {
      id: clients.length + 1, // Generate a new ID based on the current client count
      ...newClientFormData,
      appointments: [],
    };

    const updatedClients = [...clients, newClient];
    setClients(updatedClients);
    setNewClientFormData({
      firstName: '',
      lastName: '',
      location: '',
    });

    // Close the "Add Client" modal
    setShowAddClientModal(false);
  };
  const handleLastNameChange = (e, index) => {
    const updatedClients = [...clients];
    updatedClients[index].lastName = e.target.value;
    setClients(updatedClients);
  };
  
  const handleLocationChange = (e, index) => {
    const updatedClients = [...clients];
    updatedClients[index].location = e.target.value;
    setClients(updatedClients);
  };
  
  const handleShowAddModal = (client) => {
    setSelectedClient(client);
    setSelectedAppointment(null);
    setFormData({
      date: null,
      time: '',
    });
    setShowAddModal(true);
  };

  const handleShowEditModal = (client, appointment) => {
    setSelectedClient(client);
    setSelectedAppointment(appointment);
    setFormData({
      date: new Date(appointment.date),
      time: appointment.time,
    });
    setShowEditModal(true);
  };

  const handleDashboard = () => {
    if (!selectedClient) {
      return; // Ensure a client is selected
    }

    const newAppointment = {
      date: formData.date.toLocaleDateString(),
      time: formData.time,
    };

    const updatedClients = clients.map((client) => {
      if (client.id === selectedClient.id) {
        return {
          ...client,
          appointments: [...client.appointments, newAppointment],
        };
      }
      return client;
    });

    setClients(updatedClients);
    setFormData({
      date: null,
      time: '',
    });

    // Show the success modal
    setShowSuccessModal(true);
    // Close the add appointment modal
    setShowAddModal(false);
  };

  const handleEditAppointment = () => {
    if (!selectedClient || selectedAppointment === null) {
      return;
    }
  
    const updatedAppointment = {
      date: formData.date.toLocaleDateString(),
      time: formData.time,
    };
  
    const updatedClients = clients.map((client) => {
      if (client.id === selectedClient.id) {
        const updatedAppointments = [...client.appointments];
        // Create a new appointment and delete the previous one
        updatedAppointments.splice(selectedAppointment, 1, updatedAppointment);
        return {
          ...client,
          appointments: updatedAppointments,
        };
      }
      return client;
    });
  
    setClients(updatedClients);
    setFormData({
      date: null,
      time: '',
    });
  
    // Show the success modal
    setShowSuccessModal(true);
    // Close the edit appointment modal
    setShowEditModal(false);
  };
  
  
  

  const handleDeleteAppointment = (client, appointmentIndex) => {
    setSelectedClient(client);
    setSelectedAppointment(appointmentIndex);
    setShowDeleteModal(true);
  };

  const confirmDeleteAppointment = () => {
    if (selectedClient === null || selectedAppointment === null) {
      return;
    }

    const updatedClients = clients.map((c) => {
      if (c.id === selectedClient.id) {
        const updatedAppointments = [...c.appointments];
        updatedAppointments.splice(selectedAppointment, 1);
        return {
          ...c,
          appointments: updatedAppointments,
        };
      }
      return c;
    });
    setClients(updatedClients);

    // Close the delete modal
    setShowDeleteModal(false);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };
  

  return (
    <div>
       
      <h2>Clients</h2> 
      <Button variant="success" onClick={handleShowAddClientModal}>
        Add Client
      </Button>
      
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Location</th>
            <th>Appointments</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client,index) => (
            <tr key={client.id}>
               <td>
        <FormControl
          type="text"
          value={client.firstName}
          onChange={(e) => handleFirstNameChange(e, index)}
        />
      </td>
      <td>
        <FormControl
          type="text"
          value={client.lastName}
          onChange={(e) => handleLastNameChange(e, index)}
        />
      </td>
      <td>
        <FormControl
          type="text"
          value={client.location}
          onChange={(e) => handleLocationChange(e, index)}
        />
      </td>
      <td>
  <ul>
    {client.appointments.map((appointment, index) => (
      <li key={index} style={{ marginBottom: '10px' }}>
        <Badge variant="light" className="mr-2">
          {appointment.date} at {appointment.time}
        </Badge>
        <Button
          variant="info"
          size="sm"
          style={{ marginLeft: '10px' }}
          onClick={() => handleShowEditModal(client, appointment)}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          size="sm"
          style={{ marginLeft: '10px' }}
          onClick={() => handleDeleteAppointment(client, index)}
        >
          Delete
        </Button>
      </li>
    ))}
  </ul>
</td>

              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleShowAddModal(client)}
                >
                  Add Appointment
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

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
          <Button variant="primary" onClick={handleDashboard}>
            Add Appointment
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for editing appointment */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit Appointment for {selectedClient?.firstName} {selectedClient?.lastName}
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
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditAppointment}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for success message */}
      <SuccessModal showSuccessModal={showSuccessModal} handleCloseSuccessModal={handleCloseSuccessModal}/>

      {/* Modal for confirmation on delete */}
      <DeleteModal showDeleteModal={showDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal} confirmDeleteAppointment={confirmDeleteAppointment} />
      {/* <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
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
      </Modal> */}
      <Modal show={showAddClientModal} onHide={() => setShowAddClientModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddClientModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddClient}>
            Add Client
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Dashboard;
