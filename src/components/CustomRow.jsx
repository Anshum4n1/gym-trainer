
import { FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import Button from '@mui/material/Button';
import {  AddOutlined, DeleteOutlineOutlined, EditCalendar, Save } from '@mui/icons-material';

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
        <li key={index}  className='flex gap-2 mb-2' >
        <Link to = "/calendar">
          <Button 
          variant='contained'
              size="sm"
              className='bg-blue-500 shadow-none  '
      disabled={isEditing}

              >
              {appointment.date} at {appointment.time}
              </Button>
        </Link>
          <Button 
          variant='contained'
            size="sm"
            className='bg-blue-500 shadow-none w-8 '
            style={{'backgroundColor': isEditing ? 'rgba(0, 0, 0, 0.12)' :  'rgb(234 179 8 )' }}
            onClick={() => handleShowEditModal(client, appointment)}
            disabled={isEditing}
          >
            <EditCalendar fontSize='small' color='blue' />
          </Button>
          <Button 
          variant='contained'
      size="sm"
      className='bg-blue-500 shadow-none w-8 '
      style={{'backgroundColor': isEditing ? 'rgba(0, 0, 0, 0.12)' : ' rgb(239 68 68)' }}
      onClick={() => handleDeleteAppointment(client)}
      disabled={isEditing}

    >
      <DeleteOutlineOutlined fontSize='small' color='blue'  />
    </Button> 
        </li>
      ))}
    </ul>
    </td>
    {/* handleDeleteClient */}

    <td className=" px-2 sm:px-4 py-2 text-sm whitespace-nowrap  border-gray-200">
    <div className="flex justify-center items-center gap-2">
        <Button
        variant='contained'
          size="sm"
          className='bg-blue-500 shadow-none w-8 '
          onClick={() => handleShowAddModal(client)}
          disabled={isEditing}
        >
           <AddOutlined fontSize='small' color='blue' />
        </Button>
        {!isEditing ?<Button
        variant='contained'
          size="sm"
          style={{'backgroundColor': isEditing ? 'rgba(0, 0, 0, 0.12)' :  'rgb(234 179 8 )' }}
          className=' shadow-none w-8 '
          onClick={() => setIsEditing(true)}
        >
          <EditIcon fontSize='small' color='blue'  />
        </Button>
        :
        <Button
        variant='contained'
          size="sm"
          style={{'backgroundColor':  'rgb(22 163 74)' }}
          className='bg-green-600 shadow-none w-8  '
          onClick={() => handleSubmit()}
        >
        <Save fontSize='small' color='white' />
        </Button>}
        <Button
            variant='contained'
          size="sm"
          style={{'backgroundColor':  isEditing ? 'rgba(0, 0, 0, 0.12)' :  'rgb(239 68 68)' }}
          className='bg-red-500 shadow-none w-8 '
          onClick={() => handleDeleteClient(client)}
          disabled={isEditing}
        >
          <DeleteOutlineOutlined fontSize='small' color='blue'  />
        </Button>
      
    </div>

    </td>
  </tr>
  )
}

export default CustomRow