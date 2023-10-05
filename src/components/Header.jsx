
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { FaCalendarAlt } from 'react-icons/fa';
 // Import the calendar icon

function Header() {
  const isSmallScreen = useMediaQuery({ maxWidth: 768 }); // Define your breakpoint here

  return (
    <Navbar bg="dark" variant="dark">
      <div className='mx-5 flex justify-between items-center py-1 w-full '>
        <Link to="/" className='no-underline' >
          <div className=' text-2xl text-white    ' >Gym Appointments</div>
        </Link>
        <Nav className="ml-5 ">
          {isSmallScreen ? (
            <>
            <Link to="/" className="nav-link">
              <FaCalendarAlt />
            </Link> <Link to="/calendar" className="nav-link">
              <FaCalendarAlt />
            </Link>
            </>
           
          ) : (
            <>
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/calendar" className="nav-link">
              Calendar
            </Link>

            </>
          )}
        </Nav>
      </div>
    </Navbar>
  );
}

export default Header;
