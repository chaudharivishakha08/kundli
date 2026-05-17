import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import PdfUpload from './components/PdfUpload';
import Nakshatras from './components/Nakshatras';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Query from './components/Query';
import ProtectedRoute from './components/ProtectedRoute';
import NakshatraDetail from './components/NakshatraDetail';
import Problems from './components/Problems';
import MatchMaking from './components/MatchMaking';
import KundliHouses from './components/KundliHouses';
import GenerateKundli from './components/GenerateKundli';

function App() {
  const [language, setLanguage] = useState('mr');

  return (
    <Router>
      <div className="App">
        {/* <Header language={language} onLanguageChange={setLanguage} /> */}
        <Routes>
          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/query" element={
            <ProtectedRoute>
              <Query />
            </ProtectedRoute>
          } />
          <Route path="/problems" element={
            <ProtectedRoute requiredRole="Admin">
              <Problems />
            </ProtectedRoute>
          } />
           <Route path="/kundli" element={
            // <ProtectedRoute requiredRole="Admin">
             <PdfUpload language={language} />
            // </ProtectedRoute>
          } />
          <Route path="/kundli-houses" element={
            // <ProtectedRoute requiredRole="Admin">
             <KundliHouses language={language} />
            // </ProtectedRoute>
          } />
           <Route path="/match-making" element={
            <ProtectedRoute requiredRole="Admin">
              <MatchMaking />
            </ProtectedRoute>
          } />
          <Route path="/nakshatras" element={<Nakshatras language={language} />} />
          <Route path="/nakshatra/:id" element={<NakshatraDetail language={language} />} />
          <Route path="/"  element={<Nakshatras language={language} />}/> */}
          <Route path="" element={<GenerateKundli  />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
