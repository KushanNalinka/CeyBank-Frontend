import React, { useState } from 'react';
import { useGoodRequest } from '../../context/GoodRequestContext';
import { products } from '../../Products';
import GoodRequestItem from './GoodRequestItem';

const GoodRequestTab = () => {
  const { requestItems, clearRequests, updateRequestQuantity } = useGoodRequest();
  const [showModal, setShowModal] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const totalItems = requestItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className="fixed top-0 right-0 bg-white shadow-2xl w-96 h-full flex flex-col z-40">
        <div className="bg-[#E3E6F6] shadow-sm">
          <h1 className="p-5 text-[#28245F] font-black text-2xl text-center h-16">
            GOOD REQUEST FORM
          </h1>
        </div>
        <div className="p-5 flex-grow overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
          {requestItems.map((item, key) => (
            <GoodRequestItem key={key} data={item} />
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
          <button
            className="w-full bg-[#FFC10C] text-white font-bold py-3 rounded-md shadow-md disabled:opacity-50"
            disabled={!confirmed}
            onClick={() => {
              clearRequests();
              setShowModal(false);
              setConfirmed(false);
            }}
          >
            Submit Request
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-4xl h-5/6 overflow-y-auto p-8 flex flex-col">
            <h2 className="text-2xl font-bold mb-6">Requested Items</h2>
            <div className="flex-1 overflow-y-auto space-y-4">
              {requestItems.map((i, idx) => {
                const p = products.find(prod => prod.id === i.productId)!;
                return (
                  <div key={idx} className="flex items-center gap-4">
                    <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <div className="font-semibold text-lg">{p.name}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="bg-gray-300 rounded-full w-6 h-6" onClick={() => updateRequestQuantity(p.id, i.quantity - 1)}>-</button>
                      <span>{i.quantity}</span>
                      <button className="bg-gray-300 rounded-full w-6 h-6" onClick={() => updateRequestQuantity(p.id, i.quantity + 1)}>+</button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <input
                type="checkbox"
                id="confirm-request"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="form-checkbox w-5 h-5"
              />
              <label htmlFor="confirm-request" className="font-medium">
                I confirm this request is accurate
              </label>
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <button className="px-6 py-2 bg-gray-300 rounded" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="px-6 py-2 bg-[#FFC10C] text-white rounded disabled:opacity-50" disabled={!confirmed} onClick={() => setShowModal(false)}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GoodRequestTab;
