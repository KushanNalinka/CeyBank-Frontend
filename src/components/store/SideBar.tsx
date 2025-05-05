import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  FaPizzaSlice,
  FaAppleAlt,
  FaCarrot,
  FaIceCream,
  FaHamburger,
  FaHotdog,
  FaFish,
  FaDrumstickBite
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ setSelectedCategory }) => {
  //const { meal } = useParams();
  const [activeCategory, setActiveCategory] = useState('');
  const navigate = useNavigate();

  let categories = [
    { name: 'Preservatives', icon: FaPizzaSlice },
    { name: 'fruits', icon: FaAppleAlt },
    { name: 'vegetables', icon: FaCarrot },
    { name: 'sweets', icon: FaIceCream },

    { name: 'oils', icon: FaHotdog },
    { name: 'grocery', icon: FaFish },
    { name: 'rice', icon: FaDrumstickBite },
    { name: 'grains', icon: FaHotdog },
    { name: 'spices', icon: FaHotdog },
    
  ];

  

  const handleClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setActiveCategory(categoryName);
  };

  return (

    <div className="w-56 h-screen bg-white border-r flex flex-col fixed">
      {/* Fixed CATEGORIES Header */}
      <div className="h-16 flex items-center justify-center bg-[#E3E6F6] p-4  shadow-sm cursor-pointer sticky top-0 z-10" onClick={() => setSelectedCategory('')}>
        <Link to="" className="no-underline">
          <span className="text-xl font-black text-[#28245F]">CATEGORIES</span>

        </Link>
      </div>

      {/* Scrollable Categories List */}
      <div className="flex-1 overflow-auto scrollbar-hidden">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`h-16 flex items-center justify-between p-4 rounded-lg shadow-lg my-2 cursor-pointer transition-colors duration-300 ${
              activeCategory === category.name
                ? 'bg-[#FFC10C] text-white'
                : 'bg-[#28245F] text-white'
            } hover:bg-[#FFC10C] hover:text-white`}
            onClick={() => handleClick(category.name)}
          >
            <div className="flex items-center">
              <category.icon className="text-2xl mr-4" />
              <Link to="" className="no-underline">

                <span className="text-xl font-semiboldbold  text-white">{category.name}</span>
              
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Fixed Menu Footer */}

     
        <Link to="/" className="no-underline">
        <div
      className="h-16 flex items-center justify-center bg-[#FFC10C] shadow-xl cursor-pointer"
      onClick={() => navigate('/')}
    >
      <span className="text-xl font-bold text-[#28245F]">Dashbord</span>
    </div>
      </Link>
    </div>
  );
};

export default Sidebar;



