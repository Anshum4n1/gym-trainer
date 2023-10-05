
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { FaCalendarAlt } from 'react-icons/fa';
 // Import the calendar icon

function Header() {
  const isSmallScreen = useMediaQuery({ maxWidth: 768 }); // Define your breakpoint here

  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Link to="/">
          <Navbar.Brand>Easy Appointment</Navbar.Brand>
        </Link>
        <Nav className="ml-auto">
          {isSmallScreen ? (
            <Link to="/calendar" className="nav-link">
              <FaCalendarAlt />
            </Link>
          ) : (
            <Link to="/calendar" className="nav-link">
              Calendar
            </Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
