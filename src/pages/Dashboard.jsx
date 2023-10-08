import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import SuccessModal from '../components/SuccessModal';
import DeleteModal from '../components/DeleteModal';
import AddClient from '../components/AddClient';
import EditModal from '../components/EditModal';
import AddAppointment from '../components/AddAppointment';
import { v4 as uuidv4 } from 'uuid';
import CustomRow from '../components/CustomRow';
import { AddOutlined } from '@mui/icons-material';

const CLIENT_DATA = [
  { id: uuidv4(), firstName: 'John', lastName: 'Doe', location: 'New York', appointments: [] },
  { id: uuidv4(), firstName: 'Jane', lastName: 'Smith', location: 'Los Angeles', appointments: [] },
  { id: uuidv4(), firstName: 'Mike', lastName: 'Johnson', location: 'Chicago', appointments: [] },
  { id: uuidv4(), firstName: 'Emily', lastName: 'Brown', location: 'Houston', appointments: [] },
  { id: uuidv4(), firstName: 'William', lastName: 'Jones', location: 'Miami', appointments: [] },
  { id: uuidv4(), firstName: 'Olivia', lastName: 'Davis', location: 'Seattle', appointments: [] },
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
  const [isClient, setIsClient] = useState()
  const [formData, setFormData] = useState({
    date: null,
    time: '',
  });

  const [validSlots, setValidSlots] = useState([])

  const [clients, setClients] = useState();


  // Fetch clients data from local storage when the component mounts
  useEffect(() => {
    const clientsData = JSON.parse(localStorage.getItem('clientsData'));
    if (clientsData) {
      setClients(clientsData);
    } else {
      setClients(CLIENT_DATA)
    }
  }, []);

  // Update local storage whenever 'clients' change
  useEffect(() => {
    if (clients) {localStorage.setItem('clientsData', JSON.stringify(clients));
    console.log(clients);
    getValidSlots(clients)
  }
  }, [clients]);

  const handleShowAddClientModal = () => {
    setShowAddClientModal(true);
  };


  const handleDeleteClient = (client) =>{
    setSelectedClient(client)
    setIsClient(true)
    setShowDeleteModal(true);
    
  }
  
  const confirmDeleteClient=()=>{
console.log(selectedClient);
    const newClients = [...clients].filter((i)=> i.id !== selectedClient.id)
    console.log(newClients);
    setClients([...newClients])
  
    setShowDeleteModal(false)
    // setSelectedClient('');
  }

  const handleAddClient = (firstName, lastName, location) => { 
    const newClient = {
      id: uuidv4(), // Generate a new ID 
      firstName,
      lastName,
      location,
      appointments: [],
    };

    const updatedClients = [...clients, newClient];
    setClients(updatedClients);
    setShowAddClientModal(false);
  };

  const updateClient  = (index,firstName, lastName, location) => { 
    console.log(index,firstName, lastName, location);
    const updatedClients = [...clients];
    updatedClients[index].firstName= firstName;
    updatedClients[index].lastName = lastName;
    updatedClients[index].location = location;
    setClients(updatedClients)
  }

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

  const handleEditAppointment = (selectedDate, selectedTime,fullDate) => {
    if (!selectedClient || selectedAppointment === null) {
      return;
    }

    const updatedAppointment = {
      date: selectedDate,
      time: selectedTime,
      fullDate: fullDate
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


  const getValidSlots = (clientsData) =>{const slots =  clientsData?.map((e)=>{
    let current = e.appointments
    let currDate = current.map((item)=>item.fullDate)
    return currDate
  })
  setValidSlots(slots.flat())
}
  const handleAddAppointment = (selectedDate, selectedTime,fullDate) => {
    if (!selectedClient) {
      return; // Ensure a client is selected
    }

    const newAppointment = {
      date: selectedDate,
      time: selectedTime,
      fullDate: fullDate
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
    setIsClient(false)
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
        <Button variant="success" onClick={handleShowAddClientModal} className='flex items-center' >
        <AddOutlined fontSize='small' color='blue' /> Add Client
        </Button>
      </div>
      <div className="overflow-x-scroll sm:overflow-x-hidden border border-gray-200 shadow-md md:rounded-lg">
        <table className=" w-full divide-y  divide-gray-200   ">
          <thead className="bg-slate-200 ">
            <tr>


              <th scope="col" className="px-12 py-3.5  text-left rtl:text-right text-gray-800 font-semibold ">
                First Name
              </th>
              <th scope="col" className="px-12 py-3.5  text-left rtl:text-right text-gray-800 font-semibold ">
                Last Name
              </th>

              <th scope="col" className="px-4 py-3.5  text-left rtl:text-right text-gray-800 font-semibold ">
                Location
              </th>

              <th scope="col" className="px-4 py-3.5  text-left rtl:text-right text-gray-800 font-semibold ">Appointments</th>

              <th scope="col" className="px-4 py-3.5  text-left rtl:text-right text-gray-800 font-semibold ">Action</th>

            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-x divide-gray-200 ">
            {clients && clients?.map((client, index) => (
              <CustomRow client={client} key={client.id}  index={index} updateClient={updateClient}  handleShowEditModal={handleShowEditModal} handleDeleteAppointment={handleDeleteAppointment} handleShowAddModal={handleShowAddModal} handleDeleteClient={handleDeleteClient} /> 
            ))}
          </tbody>


        </table>
      </div>


      {/* Modal for adding appointment */}
      <AddAppointment setFormData={setFormData} selectedClient={selectedClient} showAddModal={showAddModal} handleCloseAddModal={handleCloseAddModal} formData={formData} handleAddAppointment={handleAddAppointment} validSlots={validSlots} />


      {/* Modal for editing appointment */}

      <EditModal showEditModal={showEditModal} handleCloseEditModal={handleCloseEditModal} selectedClient={selectedClient} formData={formData} setFormData={setFormData} handleEditAppointment={handleEditAppointment} validSlots={validSlots} />


      {/* Modal for success message */}
      <SuccessModal showSuccessModal={showSuccessModal} handleCloseSuccessModal={handleCloseSuccessModal} />

      {/* Modal for confirmation on delete */}
      <DeleteModal showDeleteModal={showDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal} confirmDeleteAppointment={confirmDeleteAppointment} confirmDeleteClient={confirmDeleteClient} isClient={isClient} />

      <AddClient showAddClientModal={showAddClientModal} setShowAddClientModal={setShowAddClientModal}  handleAddClient={handleAddClient} />
    </div>
  );
}

export default Dashboard;
