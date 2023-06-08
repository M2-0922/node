import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './page/register/register.jsx';
import Login from "./page/login/login.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
