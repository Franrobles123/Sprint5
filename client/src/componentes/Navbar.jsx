import React from 'react';
import { Link } from 'react-router-dom';

 
function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>
      <Link to="/about">Sobre Nosotros</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/add">Add</Link>
    </nav>
  );
}
 
export default Navbar;