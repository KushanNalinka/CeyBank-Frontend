import { useEffect, useState } from 'react';
import { useGoodRequest } from '../../context/GoodRequestContext';
import { products } from '../../Store';

const GoodRequestItem = ({ data }) => {
  const { updateRequestQuantity } = useGoodRequest();
  const { productId, quantity } = data;
  const [detail, setDetail] = useState({});

  useEffect(() => {
    const product = products.find(p => p.id === productId);
    setDetail(product || {});
  }, [productId]);

  return (
    <div className='flex justify-between items-center bg-white text-black p-2 gap-5 mb-3 shadow-md rounded-xl w-90 h-24'>
      <div className='flex items-center gap-5'>
        <img src={detail.image} alt="" className='object-cover w-12 h-12 rounded-full shadow-md' />
        <div className='flex flex-col'>
          <h3 className='font-bold'>{detail.name}</h3>
          <p className='font-medium'> {quantity}</p>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <button className='bg-[#28245F] rounded-full w-6 h-6 text-white font-black' onClick={() => updateRequestQuantity(productId, quantity - 1)}>-</button>
        <span className='font-bold'>{quantity}</span>
        <button className='bg-[#28245F] rounded-full w-6 h-6 text-white font-black' onClick={() => updateRequestQuantity(productId, quantity + 1)}>+</button>
      </div>
    </div>
  );
};

export default GoodRequestItem;
