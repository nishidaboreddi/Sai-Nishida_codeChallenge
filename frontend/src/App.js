import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import PlayerList from './components/PlayerList';
import PlayerForm from './components/PlayerForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App bg-light min-vh-100 pb-5">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Navigate to="/players" />} />
            <Route path="/players" element={<PlayerList />} />
            <Route path="/add-player" element={<PlayerForm />} />
            <Route path="/edit-player/:id" element={<PlayerForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
