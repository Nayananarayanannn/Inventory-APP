import { Routes, Route } from 'react-router-dom'
import './App.css';
import ContactForm from './ContactForm';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import Home from './Pages/Home/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="/try" element={<ContactForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
