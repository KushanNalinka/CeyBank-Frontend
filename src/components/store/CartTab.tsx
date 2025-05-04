// import React, { useState } from 'react';
// import { useCart } from '../../context/CartContext';
// import { products } from '../../Products';
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
//         <h1 className='p-5 text-[#28245F] font-black text-2xl text-center h-16'>STORE  REQUISTION  FORM</h1>
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

// import React, { useState } from 'react';
// import { useCart } from '../../context/CartContext';
// import { products, ProductData } from '../../Products';
// import CartItem from './CartItem';

// const CartTab: React.FC = () => {
//   const { items, clearCart, changeQuantity } = useCart();
//   const [showModal, setShowModal] = useState(false);
//   const [orderConfirmed, setOrderConfirmed] = useState(false);

//   // track within‐modal confirmation
//   const [modalConfirmed, setModalConfirmed] = useState(false);

//   const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

//   const handlePlaceOrder = () => {
//     // ... your place-order logic here ...
//     clearCart();
//     setOrderConfirmed(false);
//     setModalConfirmed(false);
//     setShowModal(false);
//   };

//   return (
//     <>
//       {/* Cart sidebar */}
//       <div className="fixed top-0 right-0 bg-white shadow-2xl w-96 h-full flex flex-col z-40">
//         <div className="bg-[#E3E6F6] shadow-sm">
//           <h1 className="p-5 text-[#28245F] font-black text-2xl text-center h-16">
//             STORE REQUISITION FORM
//           </h1>
//         </div>
//         <div
//           className="p-5 flex-grow overflow-y-auto"
//           style={{ maxHeight: 'calc(100vh - 240px)' }}
//         >
//           {items.map((item, key) => (
//             <CartItem key={key} data={item} />
//           ))}
//         </div>
//         <div className="bg-[#E3E6F6] shadow-lg absolute bottom-0 left-0 right-0 p-4 space-y-3">
//           <div className="font-bold text-[#4E4E4E]">
//             Total Items: <span className="text-xl">{totalItems}</span>
//           </div>
//           <button
//             className="w-full bg-[#28245F] text-white font-bold py-3 rounded-md shadow-md"
//             onClick={() => setShowModal(true)}
//           >
//             View All Selected Items
//           </button>

//           {orderConfirmed && (
//             <label className="flex items-center gap-2 mt-2">
//               <input type="checkbox" checked readOnly className="form-checkbox" />
//               I confirm this order is true
//             </label>
//           )}

//           <button
//             className="w-full bg-[#FFC10C] text-white font-bold py-3 rounded-md shadow-md disabled:opacity-50"
//             disabled={!orderConfirmed}
//             onClick={handlePlaceOrder}
//           >
//             Place Order
//           </button>
//         </div>
//       </div>

//       {/* Full-screen transparent overlay + enlarged modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-4xl h-5/6 overflow-y-auto p-8 flex flex-col">
//             <h2 className="text-2xl font-bold mb-6">Selected Items</h2>

//             {/* List with inline quantity controls */}
//             <div className="flex-1 overflow-y-auto space-y-4">
//               {items.map((i, idx) => {
//                 const p = products.find((prod: ProductData) => prod.id === i.productId)!;
//                 return (
//                   <div key={idx} className="flex items-center gap-4">
//                     <img
//                       src={p.image}
//                       alt={p.name}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                     <div className="flex-1">
//                       <div className="font-semibold text-lg">{p.name}</div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <button
//                         className="bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center"
//                         onClick={() => changeQuantity(p.id, i.quantity - 1)}
//                       >
//                         –
//                       </button>
//                       <span className="w-8 text-center">{i.quantity}</span>
//                       <button
//                         className="bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center"
//                         onClick={() => changeQuantity(p.id, i.quantity + 1)}
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Confirmation checkbox and buttons */}
//             <div className="mt-6 flex items-center gap-3">
//               <input
//                 type="checkbox"
//                 id="modal-confirm"
//                 checked={modalConfirmed}
//                 onChange={(e) => setModalConfirmed(e.target.checked)}
//                 className="form-checkbox w-5 h-5"
//               />
//               <label htmlFor="modal-confirm" className="font-medium">
//                 I confirm this order is true
//               </label>
//             </div>

//             <div className="mt-8 flex justify-end gap-4">
//               <button
//                 className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                 onClick={() => {
//                   setShowModal(false);
//                   setModalConfirmed(false);
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-6 py-2 bg-[#FFC10C] text-white rounded hover:bg-yellow-400 disabled:opacity-50"
//                 disabled={!modalConfirmed}
//                 onClick={() => {
//                   setOrderConfirmed(true);
//                   setShowModal(false);
//                 }}
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CartTab;
import React, { useState } from 'react';
// ✅ Changed from useCart to useStore
import { useStore } from '../../context/StoreContext'; 
import { products, ProductData } from '../../Products';
import CartItem from './CartItem';

const CartTab: React.FC = () => {
  const { storeItems, clearStore, updateStoreQuantity } = useStore(); // ✅ Updated names
  const [showModal, setShowModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [modalConfirmed, setModalConfirmed] = useState(false);

  const totalItems = storeItems.reduce((sum, i) => sum + i.quantity, 0);

  const handlePlaceOrder = () => {
    clearStore();
    setOrderConfirmed(false);
    setModalConfirmed(false);
    setShowModal(false);
  };

  return (
    <>
      <div className="fixed top-0 right-0 bg-white shadow-2xl w-96 h-full flex flex-col z-40">
        <div className="bg-[#E3E6F6] shadow-sm">
          <h1 className="p-5 text-[#28245F] font-black text-2xl text-center h-16">
            STORE REQUISITION FORM
          </h1>
        </div>
        <div className="p-5 flex-grow overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
          {storeItems.map((item, key) => (
            <CartItem key={key} data={item} />
          ))}
        </div>
        <div className="bg-[#E3E6F6] shadow-lg absolute bottom-0 left-0 right-0 p-4 space-y-3">
          <div className="font-bold text-[#4E4E4E]">
            Total Items: <span className="text-xl">{totalItems}</span>
          </div>
          <button
            className="w-full bg-[#28245F] text-white font-bold py-3 rounded-md shadow-md"
            onClick={() => setShowModal(true)}
          >
            View All Selected Items
          </button>

          {orderConfirmed && (
            <label className="flex items-center gap-2 mt-2">
              <input type="checkbox" checked readOnly className="form-checkbox" />
              I confirm this order is true
            </label>
          )}

          <button
            className="w-full bg-[#FFC10C] text-white font-bold py-3 rounded-md shadow-md disabled:opacity-50"
            disabled={!orderConfirmed}
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-4xl h-5/6 overflow-y-auto p-8 flex flex-col">
            <h2 className="text-2xl font-bold mb-6">Selected Items</h2>
            <div className="flex-1 overflow-y-auto space-y-4">
              {storeItems.map((i, idx) => {
                const p = products.find((prod: ProductData) => prod.id === i.productId)!;
                return (
                  <div key={idx} className="flex items-center gap-4">
                    <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <div className="font-semibold text-lg">{p.name}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={() => updateStoreQuantity(p.id, i.quantity - 1)}
                      >
                        –
                      </button>
                      <span className="w-8 text-center">{i.quantity}</span>
                      <button
                        className="bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={() => updateStoreQuantity(p.id, i.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <input
                type="checkbox"
                id="modal-confirm"
                checked={modalConfirmed}
                onChange={(e) => setModalConfirmed(e.target.checked)}
                className="form-checkbox w-5 h-5"
              />
              <label htmlFor="modal-confirm" className="font-medium">
                I confirm this order is true
              </label>
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <button
                className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => {
                  setShowModal(false);
                  setModalConfirmed(false);
                }}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-[#FFC10C] text-white rounded hover:bg-yellow-400 disabled:opacity-50"
                disabled={!modalConfirmed}
                onClick={() => {
                  setOrderConfirmed(true);
                  setShowModal(false);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartTab;
