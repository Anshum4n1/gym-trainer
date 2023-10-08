import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Header from './components/Header';
function App() {

  return (
    <div>
      <Router>
        <div className=''>
            <Header />
            <div className=' md:mx-10   my-4 '>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/calendar" element={<Calendar />} />
              </Routes>
          </div>
        </div>
      </Router>
    </div>
  )
}

export default App
