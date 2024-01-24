// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import SignIn from './components/SignIn';
import SignUp from './components/Signup'; // Corrected typo in component name
import { NoteProvider } from './context/notes/noteContext';
import isAuthenticated from './components/AuthHelper';

const PrivateRoute = ({ element, path }) => {
  return isAuthenticated() ? element : <Navigate to="/signin" />;
};

function App() {
  return (
    <NoteProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<PrivateRoute element={<Home />} />} />
            <Route path="/about" element={<PrivateRoute element={<About />} />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    </NoteProvider>
  );
}

export default App;
