import {  Modal } from "react-bootstrap"
import moment from 'moment/moment';
import DayTimePicker from '@mooncake-dev/react-day-time-picker';
import { useState } from 'react';

const EditModal = ({showEditModal,handleCloseEditModal,selectedClient,formData,setFormData,handleEditAppointment, validSlots}) => {


  const [isScheduling, setIsScheduling] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleErr, setScheduleErr] = useState('');
  const handleScheduled = (date) => {
    setIsScheduling(true);
    setScheduleErr('');
    let selectedDate = moment(date).format('L')
    let selectedTime = moment(date).format().split('T')[1].slice(0, 5)
    setFormData({ ...formData, time: selectedTime, date: selectedDate, fullDate: date })
    handleEditAppointment(selectedDate, selectedTime, moment(date).format())
    setIsScheduling(false)
    setIsScheduled(true)
    handleCloseEditModal()
    setIsScheduled(false)
  }

  const vaildTimeSlots = (slot) => {
    for (const currSlot of validSlots) {
      if (moment(currSlot).format() === moment(slot).format()) {
        return false;
      }
    }
    return true;
  }


  return (
    <Modal show={showEditModal} onHide={handleCloseEditModal} centered >
        <Modal.Header closeButton>
          <Modal.Title>
            Edit Appointment for <span className="text-blue-400">{selectedClient?.firstName} {selectedClient?.lastName}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DayTimePicker
            timeSlotSizeMinutes={60}
            isLoading={isScheduling}
            isDone={isScheduled}
            err={scheduleErr}
            onConfirm={handleScheduled}
            timeSlotValidator={vaildTimeSlots}
            
          />
        </Modal.Body>
        
      </Modal>
  )
}

export default EditModal