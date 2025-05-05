import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../Meals';
import ProductCart from '../../components/meal/ProductCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useOutletContext } from 'react-router-dom';
import breakfast from '../../assets/images/breakfast.png';
import lunch from '../../assets/images/lunch.png';
import dinner from '../../assets/images/dinner.png';


const Home = () => {
  const { meal } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedCategory } = useOutletContext();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleReset = () => {
    setSearchTerm('');
  };

  const filteredProducts = products.filter((product) => {
    //const matchesMeal = meal ? product.meal.includes(meal) : true;
    const matchesMeal = meal
    ? product.meal.map(m => m.toLowerCase()).includes(meal.toLowerCase())
    : true;
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesMeal && matchesSearchTerm && matchesCategory;
  });

  // add the imge based on the meal
  const getImageForMeal = (meal) => {
    switch (meal) {
      case 'Breakfast':
        return breakfast;
      case 'Lunch':
        return lunch;
      case 'Dinner':
        return dinner;
      default:
        return breakfast; // Default image if meal doesn't match any case
    }
  };

  return (
    <div>
      <div className='relative my-5 flex justify-center top-10'>
        
      <img src={getImageForMeal(meal)} alt="background" className='w-full max-w-4xl rounded mb-[-1%] ' />
        
        <div className='absolute w-full max-w-md top-28 left-[30%] transform -translate-x-1/4'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search for a food item...'
              value={searchTerm}
              onChange={handleSearch}
              className='w-full p-2 pl-10 pr-10 rounded-full border focus:outline-none focus:ring-2 focus:ring-[#E3E6F6] text-black placeholder-[#D2D2D2] bg-white opacity-90'
            />
            <FontAwesomeIcon icon={faSearch} className='absolute left-3 top-[45%] transform -translate-y-1/2 text-[#28245F]' />
            {searchTerm && (
              <button onClick={handleReset} className='absolute right-3 top-[45%] transform -translate-y-1/2 text-[#28245F]'>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4'>

        

 

        {filteredProducts.map((product, key) => 
          <ProductCart key={key} data={product} />
        )}
      </div>
    </div>
  );
};


export default Home;

