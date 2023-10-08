
import { Button, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

function CustomRow({client, index,updateClient,  handleShowEditModal ,handleDeleteAppointment, handleShowAddModal, handleDeleteClient}) {
    const [isEditing , setIsEditing ] = useState(false);
    const [firstName, setFirstName] =  useState(client.firstName);
  const [lastName, setLastName] =  useState(client.lastName);
  const [location, setLocation] =  useState(client.location);
  const [isSubmitted, setIsSumitted ] = useState(false)

  const handleSubmit = () =>{
      setIsSumitted(true)
      if(firstName && lastName && location) {
          updateClient(index, firstName, lastName, location)
      setIsEditing(false)
    }
  }
   


  return (
    <tr key={client.id} className=' hover:bg-slate-50 border-r border-gray-200 '>
    <td className="px-2 sm:px-4 py-0 text-sm font-medium border-r border-gray-200 whitespace-nowrap">

      <FormControl
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        disabled={!isEditing}
        isInvalid={isSubmitted && !firstName}
      />
    </td>
    <td className="px-2 sm:px-4 py-2 text-sm font-medium border-r border-gray-200 whitespace-nowrap">

      <FormControl
      type="text"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      disabled={!isEditing}
      isInvalid={isSubmitted && !lastName}
    />
    </td>
    <td className="px-2 sm:px-4 py-2 text-sm border-r border-gray-200 whitespace-nowrap">
 
      <FormControl
      type="text"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      disabled={!isEditing}
      isInvalid={isSubmitted && !location}

    />
    </td>
    <td className="px-2 sm:px-4 py-2 text-sm whitespace-nowrap border-r border-gray-200">
    <ul className='pt-3 px-0 ' >
      {client.appointments.map((appointment, index) => (
        <li key={index} style={{ marginBottom: '10px' }}>
        <Link to = "/calendar">
          <Button
              size="sm"
              style={{ marginLeft: '10px', color: 'white' }}
      disabled={isEditing}

              >
              {appointment.date} at {appointment.time}
              </Button>
        </Link>
          <Button
            size="sm"
            style={{ marginLeft: '10px', color: 'white' }}
            onClick={() => handleShowEditModal(client, appointment)}
            disabled={isEditing}
          >
            <EditIcon fontSize='small' color='white' />
          </Button>
          <Button
            variant="danger"
            size="sm"
            style={{ marginLeft: '10px' }}
            onClick={() => handleDeleteAppointment(client, index)}
            disabled={isEditing}

          >
            <DeleteIcon fontSize='small' />
          </Button>
        </li>
      ))}
    </ul>
    </td>


    <td className=" px-2 sm:px-4 py-2 text-sm whitespace-nowrap  border-gray-200">
    <Button
      size="sm"
      className='bg-blue-500'
      onClick={() => handleShowAddModal(client)}
      disabled={isEditing}
    >
      Add Appointment
    </Button>
    <Button
      size="sm"
      className='bg-blue-500'
      onClick={() => handleDeleteClient(client)}
      disabled={isEditing}

    >
      delete
    </Button>    
    {!isEditing ?<Button
      size="sm"
      className='bg-blue-500'
      onClick={() => setIsEditing(true)}


    >
      edit
    </Button>
    :
    <Button
      size="sm"
      className='bg-blue-500'
      onClick={() => handleSubmit()}
      
    >
    save
    </Button>}

    </td>
  </tr>
  )
}

export default CustomRow