import React from 'react';
import { Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white py-4 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-blue-600 font-bold text-xl">MedTranslate</h1>
      </div>
      
      <div className="hidden md:flex space-x-6 text-sm">
        <a href="#" className="text-gray-800 hover:text-blue-600">Home</a>
        <a href="#" className="text-gray-800 hover:text-blue-600">How it Works</a>
        <a href="#" className="text-gray-800 hover:text-blue-600">Services/Fees</a>
        <a href="#" className="text-gray-800 hover:text-blue-600">FAQ</a>
        <a href="#" className="text-gray-800 hover:text-blue-600">Sign in or create</a>
      </div>
      
      <button className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
        Get Started
      </button>
      
      <div className="md:hidden">
        <Menu className="text-gray-800" />
      </div>
    </nav>
  );
};

export default Navbar;