import { useState, useEffect } from 'react';
import { Button, Table, FormControl, Badge } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import SuccessModal from '../components/SuccessModal';
import DeleteModal from '../components/DeleteModal';
import AddClient from '../components/AddClient';
import EditModal from '../components/EditModal';
import AddAppointment from '../components/AddAppointment';

const CLIENT_DATA = [
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
]

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

  const [clients, setClients] = useState();


  // Fetch clients data from local storage when the component mounts
  useEffect(() => {
    const clientsData = JSON.parse(localStorage.getItem('clientsData'));
    console.log(clientsData, "hi");
    if (clientsData) {
      setClients(clientsData);
    } else {
      setClients(CLIENT_DATA)
    }
  }, []);

  // Update local storage whenever 'clients' change
  useEffect(() => {
    if (clients) localStorage.setItem('clientsData', JSON.stringify(clients));
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

  const handleAddAppointment = () => {
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
    <div className='flex flex-col gap-4' >

      <div className='flex justify-end '>
        <Button variant="success" onClick={handleShowAddClientModal}>
          Add Client
        </Button>
      </div>

      <Table striped bordered responsive>
        <thead>
          <tr>
            <th className='text-lg font-medium' >First Name</th>
            <th className='text-lg font-medium' >Last Name</th>
            <th className='text-lg font-medium' >Location</th>
            <th className='text-lg font-medium' >Appointments</th>
            <th className='text-lg font-medium' >Action</th>
          </tr>
        </thead>
        <tbody>
          {clients?.map((client, index) => (
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

              <td className=' text-center '>
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
      <AddAppointment setFormData={setFormData} selectedClient={selectedClient} showAddModal={showAddModal} handleCloseAddModal={handleCloseAddModal} formData={formData} handleAddAppointment={handleAddAppointment} />


      {/* Modal for editing appointment */}

      <EditModal showEditModal={showEditModal} handleCloseEditModal={handleCloseEditModal} selectedClient={selectedClient} formData={formData} setFormData={setFormData} handleEditAppointment={handleEditAppointment} />


      {/* Modal for success message */}
      <SuccessModal showSuccessModal={showSuccessModal} handleCloseSuccessModal={handleCloseSuccessModal} />

      {/* Modal for confirmation on delete */}
      <DeleteModal showDeleteModal={showDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal} confirmDeleteAppointment={confirmDeleteAppointment} />

      <AddClient showAddClientModal={showAddClientModal} setNewClientFormData={setNewClientFormData} setShowAddClientModal={setShowAddClientModal} newClientFormData={newClientFormData} handleAddClient={handleAddClient} />
    </div>
  );
}

export default Dashboard;
