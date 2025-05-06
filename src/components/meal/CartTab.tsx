// import React, { useState } from 'react';
// import { useCart } from '../../context/CartContext';
// import { products } from '../../Meals';
// import CartItem from './CartItem';

// const CartTab = () => {
//   const { items, clearCart } = useCart(); // ❌ removed statusTab
//   const [serviceNumber, setServiceNumber] = useState('');

//   const totalAmount = items.reduce((total, item) => {
//     const product = products.find(p => p.id === item.productId);
//     return total + (product?.price ?? 0) * item.quantity;
//   }, 0);

//   const handleCheckout = () => {
//     const purchaseData = items.map(item => {
//       const product = products.find(p => p.id === item.productId);
//       return {
//         ...item,
//         name: product?.name ?? 'Unknown'
//       };
//     });

//     console.log("Inserting data into the database:", {
//       items: purchaseData,
//       totalAmount,
//       serviceNumber
//     });

//     clearCart();
//     setServiceNumber('');
//   };

//   return (
//     <div className="fixed top-0 right-0 bg-white shadow-2xl w-96 h-full flex flex-col z-40">
//       <div className='bg-[#E3E6F6] shadow-sm'>
//         <h2 className='p-5 text-[#28245F] font-black text-2xl text-center h-16'>SHOPPING CART</h2>
//       </div>
//       <div className='p-5 flex-grow overflow-y-auto' style={{ maxHeight: 'calc(100vh - 300px)' }}>
//         {items.map((item, key) => <CartItem key={key} data={item} />)}
//       </div>
//       <div className='bg-[#E3E6F6] shadow-lg absolute bottom-0 left-0 right-0'>
//         <div className='p-3 text-[#4E4E4E] font-bold'>
//           <h3>Total Amount: Rs {totalAmount.toFixed(2)}</h3>
//         </div>
//         <div className='p-3 font-semibold'>
//           <input
//             type="text"
//             placeholder="Enter Service Number"
//             value={serviceNumber}
//             onChange={(e) => setServiceNumber(e.target.value)}
//             className='w-full p-2 mb-2 rounded-md'
//           />
//         </div>
//         <div className='grid grid-cols-2 gap-2 p-2'>
//           <button className='bg-[#24256D] text-white font-bold px-5 py-3 text-lg rounded-md shadow-md'>Pay Here</button>
//           <button className='bg-[#FFC10C] text-white font-bold px-5 py-3 text-lg rounded-md shadow-md' onClick={handleCheckout}>Check Out</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartTab;

import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { products } from '../../Meals';
import CartItem from './CartItem';
import axios from 'axios';

const CartTab = () => {
  const { items, clearCart, updateItemQuantity } = useCart();
  const [roomNumber, setRoomNumber] = useState('');
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const totalAmount = items.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    return total + (product?.price ?? 0) * item.quantity;
  }, 0);

  const fetchUserDetails = async () => {
    if (!roomNumber.trim()) return;
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/reservations/by-room/${roomNumber}`);
      setUserDetails(response.data);
      setShowPopup(true);
    } catch (error) {
      console.error("Error fetching user details", error);
      setUserDetails(null);
    } finally {
      setLoading(false);
    }
  };

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
      roomNumber
    });

    clearCart();
    setRoomNumber('');
    setUserDetails(null);
    setConfirmed(false);
    setShowPopup(false);
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateItemQuantity(productId, newQuantity);
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
            placeholder="Enter Room Number"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            className='w-full p-2 mb-2 rounded-md'
          />
          <button
            onClick={fetchUserDetails}
            className='bg-[#24256D] text-white font-bold px-4 py-2 text-sm rounded-md shadow-md w-full'
          >
            {loading ? 'Checking...' : 'Check Order'}
          </button>
        </div>

        <div className='grid grid-cols-1 p-3'>
          <button
            className={`${
              confirmed ? 'bg-[#FFC10C] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
            } text-white font-bold px-5 py-3 text-lg rounded-md shadow-md`}
            onClick={handleCheckout}
            disabled={!confirmed}
          >
            Place Meal Order
          </button>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 max-w-lg p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-[#28245F] mb-4">Confirm Order</h3>

            {userDetails && (
              <div className="mb-4 text-sm">
                <p><strong>Name:</strong> {userDetails.name}</p>
                <p><strong>Reservation ID:</strong> {userDetails.reservationId}</p>
                <p><strong>NIC:</strong> {userDetails.nic}</p>
              </div>
            )}

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Order Items</h4>
              {items.map(item => {
                const product = products.find(p => p.id === item.productId);
                return (
                  <div key={item.productId} className="flex justify-between items-center mb-2">
                    <span>{product?.name}</span>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                      className="w-16 p-1 border rounded text-center"
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center mt-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={() => setConfirmed(!confirmed)}
                />
                <span className='text-sm font-semibold'>Confirm all details</span>
              </label>
              <button
                onClick={() => setShowPopup(false)}
                className="text-sm text-gray-500 underline"
              >
                Cancel
              </button>
            </div>

            <button
              className="mt-4 w-full bg-[#24256D] text-white font-bold py-2 rounded-md shadow-md"
              onClick={() => {
                setShowPopup(false);
              }}
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartTab;
