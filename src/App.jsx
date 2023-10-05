import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
function App() {

  return (
    <>
    <Router>
    <Routes>
       <Route path="/" element={<Dashboard />} />
        <Route path="/calendar" element={<Calendar/>}/>

      </Routes>
      </Router>
      
    </>
  )
}

export default App
