import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../../assets/images/cey.png';

const Navbar = () => {
  return (
    <nav className="bg-[#FFC10C] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-12 h-12 mr-1" />
          <span className="text-2xl font-bold text-white">DOCCAFÉ</span>
        </div>
        <div className="space-x-4 font-semibold text-white">

          <Link to="/" className="text-lg">Home</Link>
          <Link to="/menu" className="text-lg">Menu</Link>
          <Link to="/order" className="text-lg">Order</Link>
          <Link to="/about" className="text-lg">About</Link>
          <Link to="/contact" className="text-lg">Contact</Link>
        </div>
        <div className="flex items-center">
          <FaUserCircle size={32} className="text-white" />
     
          <div className="ml-2 text-lg">Jhon</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
