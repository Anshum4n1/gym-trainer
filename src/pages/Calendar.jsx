import { useEffect, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
const localizer = momentLocalizer(moment);

function Calendar(  ) {
    const [clients, setClients] = useState([]);

  useEffect(() => {
    // Retrieve 'clients' data from local storage
    const clientsData = JSON.parse(localStorage.getItem('clientsData'));
    if (clientsData) {
      setClients(clientsData);
    }
  }, []);
  // Map clients' appointments to events for the calendar
  const events = clients.reduce((allEvents, client) => {
    const clientEvents = client.appointments.map((appointment) => {
      // Parse the appointment date in the format "MM/dd/yyyy"
      const appointmentDate = moment(appointment.fullDate);
  
      // Format the date to a JavaScript Date object
      const startDate = appointmentDate.toDate();
  
      // Clone the startDate to avoid modifying the same object
      const endDate = new Date(startDate);
  
      // Create the event with the formatted date
      return {
        title: `${client.firstName} ${client.lastName}`,
        start: startDate,
        end: endDate,
      };
    });
    return [...allEvents, ...clientEvents];
  }, []);
  

  return (
    <div>
      {/* <h2>Calendar</h2> */}
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

export default Calendar;
