import React, { useState } from 'react';
import { useGoodRequest } from '../../context/GoodRequestContext';
import { products } from '../../Store';
import GoodRequestItem from './GoodRequestItem';

interface RequisitionItem {
  itemCode: string;
  itemName: string;
  unit: string;
  requiredQuantity: number;
}

interface RequisitionPayload {
  goodRequisitionId: string;
  date: string; // YYYY-MM-DD
  items: RequisitionItem[];
}

const GoodRequestTab = () => {
  const { requestItems, clearRequests, updateRequestQuantity } = useGoodRequest();
  const [showModal, setShowModal] = useState(false);
  //const [confirmed, setConfirmed] = useState(false);
  const [modalConfirmed, setModalConfirmed] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Helpers to generate ID and dates
  const generateId = () => {
    const num = Math.floor(1e7 + Math.random() * 9e7);
    return `GR${num}`;
  };
  const generateDatePayload = () => new Date().toISOString().split('T')[0];
  const generateDateDisplay = () => new Date().toLocaleString();

  // State for current requisition
    const [storeReqId, setStoreReqId] = useState(generateId);
    const [datePayload, setDatePayload] = useState(generateDatePayload);
    const [dateDisplay, setDateDisplay] = useState(generateDateDisplay);


  const totalItems = requestItems.reduce((sum, item) => sum + item.quantity, 0);

  const handlePlaceOrder = async () => {
      // Build the JSON payload
      const payload: RequisitionPayload = {
        goodRequisitionId: storeReqId,
        date: datePayload,
        items: requestItems.map(i => {
          const p = products.find((prod) => prod.id === i.productId)!;
          return {
            itemCode: p.itemCode,
            itemName: p.name,
            unit: p.unit,
            requiredQuantity: i.quantity,
          };
        }),
      };
  
      console.log('POST to http://localhost:8080/api/v1/good-requisitions/add', payload);
  
      try {
        const response = await fetch(
          'http://localhost:8080/api/v1/good-requisitions/add',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }
        );
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API Error: ${response.status} ${errorText}`);
        }
  
        // Success: reset UI
        clearRequests();
        setModalConfirmed(false);
        setOrderConfirmed(false);
        setShowModal(false);
  
        // Generate fresh ID & timestamps
        setStoreReqId(generateId());
        setDatePayload(generateDatePayload());
        setDateDisplay(generateDateDisplay());
      } catch (err) {
        console.error('Failed to place order:', err);
        alert('There was an error submitting the requisition. Please try again.');
      }
    };
  

  return (
    <>
      <div className="fixed top-0 right-0 bg-white shadow-2xl w-96 h-full flex flex-col z-40">
        <div className="bg-[#E3E6F6] shadow-sm">
          <h1 className="p-5 text-[#28245F] font-black text-2xl text-center h-16">
            GOOD REQUEST FORM
          </h1>
          <div className="mt-2 text-sm">
            <span className="font-semibold">Req. ID:</span> {storeReqId}
          </div>
          <div className="text-sm">
            <span className="font-semibold">Date:</span> {dateDisplay}
          </div>
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
          {orderConfirmed && (
            <label className="flex items-center gap-2 mt-2">
              <input type="checkbox" checked readOnly className="form-checkbox" />
              I confirm this order is true
            </label>
          )}
          <button
            className="w-full bg-[#FFC10C] text-white font-bold py-3 rounded-md shadow-md disabled:opacity-50"
            onClick={handlePlaceOrder}
            disabled={!orderConfirmed}
          >
            Place Order
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

export default GoodRequestTab;
