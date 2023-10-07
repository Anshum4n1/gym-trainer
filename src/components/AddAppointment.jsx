import {  Modal } from 'react-bootstrap';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import moment from 'moment/moment';
import DayTimePicker from '@mooncake-dev/react-day-time-picker';
import { useState } from 'react';



function AddAppointment({setFormData,selectedClient,showAddModal,handleCloseAddModal,formData,handleAddAppointment, validSlots}) {
  const [isScheduling, setIsScheduling] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleErr, setScheduleErr] = useState('');
  const handleScheduled = (date) => {
    setIsScheduling(true);
    setScheduleErr('');
    let selectedDate = moment(date).format('L')
    let selectedTime =  moment(date).format().split('T')[1].slice(0,5)
    setFormData({...formData, time: selectedTime, date: selectedDate, fullDate: date})
    handleAddAppointment(selectedDate,selectedTime,moment(date).format())
    setIsScheduling(false)
    setIsScheduled(true)
    handleCloseAddModal()
    setIsScheduled(false)
    }


    const vaildTimeSlots = (slot)=>{
      for(const currSlot of validSlots){
        if(moment(currSlot).format() === moment(slot).format()) {
          return false;
        }
      }
      return true;
    }

  return (
    <div>

      {/* Modal for adding appointment */}
      <Modal show={showAddModal} onHide={handleCloseAddModal} centered>
      
        <Modal.Header closeButton>
          <Modal.Title>
            Add Appointment for {selectedClient?.firstName} {selectedClient?.lastName}
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
        {/* <div className="mb-3 flex flex-col gap-1.5">
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
          </div> */}
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddAppointment}>
            Add Appointment
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}

export default AddAppointment;
