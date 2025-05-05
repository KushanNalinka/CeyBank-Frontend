import React, { useEffect, useState } from 'react';
import { useGoodRequest } from '../../context/GoodRequestContext';
import iconCart from '../../assets/images/iconCart.png';
import logo from '../../assets/images/cey.png';

const HeaderWithRequest = () => {
  const { requestItems, setShowRequestTab } = useGoodRequest();
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    setTotalQuantity(requestItems.reduce((sum, item) => sum + item.quantity, 0));
  }, [requestItems]);

  return (
    <header className='fixed left-56 right-96 z-50 top-0 h-16 flex justify-between items-center mb-5 bg-[#FFC10C] p-4'>
      <div className='flex items-center'>
        <img src={logo} alt="Logo" className='w-12 h-12 mr-2' />
        <h3 className='text-lg font-semibold text-white'>
          <span className='text-2xl font-bold'>CeyBank Rest Anuradhapura Good Requisition</span>
        </h3>
      </div>
      <div
        className='w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center relative cursor-pointer'
        onClick={() => setShowRequestTab(true)}
      >
        <img src={iconCart} alt="" className='w-6' />
        <span className='absolute top-2/3 right-1/2 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center'>
          {totalQuantity}
        </span>
      </div>
    </header>
  );
};

export default HeaderWithRequest;
