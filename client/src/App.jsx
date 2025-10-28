import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "./App.css" 
// Importamos nuestros componentes y páginas
import Navbar from './componentes/Navbar';
import HomePage from './pages/AboutPage';
import AboutPage from './pages/DashboardPage';
import DashboardPage from './pages/HomePages';
 
function App() {
  return (
    <div className="App">
      {/* La barra de navegación estará visible en todas las "páginas" */}
      <Navbar />
 
      <main>
        {/* El contenido principal que cambiará según la URL */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
    </div>
  );
}
 
export default App;


