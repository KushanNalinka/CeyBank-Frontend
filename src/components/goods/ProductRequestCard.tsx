import React from 'react';
import { useGoodRequest } from '../../context/GoodRequestContext';

const ProductRequestCard = ({ data }) => {
  const {
    id,
    name,
    image,
    quantity,
    itemCode,
    meal,
    slug,
    reOrderLevel,
  } = data;

  const { addRequestItem, setShowRequestTab } = useGoodRequest();

  const handleAdd = () => {
    addRequestItem(id, 1);
    setShowRequestTab(true);
  };

  const qtyClass = quantity < reOrderLevel ? 'text-orange-500' : 'text-[#747474]';

  return (
    <div className='bg-white p-4 rounded-lg shadow-2xl w-48 h-56 hover:scale-105 transition duration-300'>
      <div className='relative'>
        <img src={image} alt={name} className='w-full h-24 object-cover rounded-t-lg' />
      </div>
      <div className='p-2 flex flex-col justify-between flex-grow'>
        <h3 className='text-sm font-bold'>{name}</h3>
        <h3 className='text-sm font-bold'>{itemCode}</h3>
        <div className='flex justify-between items-center mt-2'>
          <p className={`text-sm font-medium ${qtyClass}`}>Quantity: {quantity}</p>
          <button onClick={handleAdd} className='bg-[#ca0000] p-2 rounded-full text-xs text-white font-bold hover:bg-[#FFC10C]'>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductRequestCard;
