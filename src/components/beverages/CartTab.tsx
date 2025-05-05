import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { products } from '../../Beverages';
import CartItem from './CartItem';

const CartTab = () => {
  const { items, clearCart } = useCart(); // ❌ removed statusTab
  const [serviceNumber, setServiceNumber] = useState('');

  const totalAmount = items.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    return total + (product?.price ?? 0) * item.quantity;
  }, 0);

  const handleCheckout = () => {
    const purchaseData = items.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        ...item,
        name: product?.name ?? 'Unknown'
      };
    });

    console.log("Inserting data into the database:", {
      items: purchaseData,
      totalAmount,
      serviceNumber
    });

    clearCart();
    setServiceNumber('');
  };

  return (
    <div className="fixed top-0 right-0 bg-white shadow-2xl w-96 h-full flex flex-col z-40">
      <div className='bg-[#E3E6F6] shadow-sm'>
        <h2 className='p-5 text-[#28245F] font-black text-2xl text-center h-16'>SHOPPING CART</h2>
      </div>
      <div className='p-5 flex-grow overflow-y-auto' style={{ maxHeight: 'calc(100vh - 300px)' }}>
        {items.map((item, key) => <CartItem key={key} data={item} />)}
      </div>
      <div className='bg-[#E3E6F6] shadow-lg absolute bottom-0 left-0 right-0'>
        <div className='p-3 text-[#4E4E4E] font-bold'>
          <h3>Total Amount: Rs {totalAmount.toFixed(2)}</h3>
        </div>
        <div className='p-3 font-semibold'>
          <input
            type="text"
            placeholder="Enter Service Number"
            value={serviceNumber}
            onChange={(e) => setServiceNumber(e.target.value)}
            className='w-full p-2 mb-2 rounded-md'
          />
        </div>
        <div className='grid grid-cols-2 gap-2 p-2'>
          <button className='bg-[#24256D] text-white font-bold px-5 py-3 text-lg rounded-md shadow-md'>Pay Here</button>
          <button className='bg-[#FFC10C] text-white font-bold px-5 py-3 text-lg rounded-md shadow-md' onClick={handleCheckout}>Check Out</button>
        </div>
      </div>
    </div>
  );
};

export default CartTab;
