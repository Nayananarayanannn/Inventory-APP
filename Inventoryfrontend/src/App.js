import { Routes, Route } from 'react-router-dom'
import './App.css';
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
      </Routes>
    </div>
  );
}

export default App;
