import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './page/register/register.jsx';
import Login from "./page/login/login.jsx"
import Home from './page/home/Home';
import Dashboard from './page/dashboard/Dashboard';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <h1>Logo</h1>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
