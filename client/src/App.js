import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import GenerateKundli from './components/GenerateKundli';

function App() {
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
          <Route path="" element={<GenerateKundli />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
