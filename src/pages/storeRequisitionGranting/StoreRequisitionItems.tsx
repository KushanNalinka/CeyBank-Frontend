// src/components/StoreRequisitionItems.tsx

// src/components/StoreRequisitionItems.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { usePopup } from '../../context/PopupContext';

/** ───────────────────────────────────────────────────────── types */
interface RequisitionItem {
  id: number;
  itemCode: string;
  itemName: string;
  unit: string;
  requiredQuantity: number;
  approvedQuantity: number;
  receivedQuantity: number;
  rate: number;
  total: number;
  receivedDate: string;
  grnNo: string;
  transactionId: number;
}

interface GRNItem extends RequisitionItem {} // identical, but editable in popup

interface GRN {
  grnNumber: string; // e.g. GRN1234567890
  name: string;      // user‑given
  items: GRNItem[];
}

/** ───────────────────────────────────────────────────────── helpers */
const generateGrnNumber = () =>
  'GRN' + Math.floor(1_000_000_000 + Math.random() * 9_000_000_000).toString();

/** ───────────────────────────────────────────────────────── component */
const StoreRequisitionItems: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [items, setItems] = useState<RequisitionItem[]>([]);
  const [message, setMessage] = useState('');

  /* GRN state */
  const [grns, setGrns] = useState<GRN[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGrnName, setNewGrnName] = useState('');
  const [activeGrnNumber, setActiveGrnNumber] = useState<string | null>(null);
  const { openPopup, closePopup } = usePopup();

  

  /** ───────── fetch items once */
  useEffect(() => {
    axios
      .get<RequisitionItem[]>(
        `http://localhost:8080/api/v1/store-requisitions/${id}/items`
      )
      .then((res) => setItems(res.data))
      .catch(() => setMessage('Failed to load requisition items.'));
  }, [id]);

  /** ───────── handlers */
  const openCreateModal = () => {
    setNewGrnName('');
    setShowCreateModal(true);
  };

  const createGrn = () => {
    if (!newGrnName.trim()) {
      alert('GRN Name is required');
      return;
    }
    const newGrn: GRN = {
      grnNumber: generateGrnNumber(),
      name: newGrnName.trim(),
      items: [],
    };
    setGrns((prev) => [...prev, newGrn]);
    setShowCreateModal(false);
  };

  const handleReceiveUpdate = (item: RequisitionItem) => {
    if (grns.length === 0) {
      alert('Please create a GRN first.');
      return;
    }
    const grnName = window.prompt(
      `Enter the GRN Name to add item ${item.itemCode} →`
    );
    if (!grnName) return;
    const grnIdx = grns.findIndex((g) => g.name === grnName);
    if (grnIdx === -1) {
      alert('GRN not found.');
      return;
    }
    setGrns((prev) => {
      const copy = [...prev];
      copy[grnIdx] = { ...copy[grnIdx], items: [...copy[grnIdx].items, item] };
      return copy;
    });
    setActiveGrnNumber(grns[grnIdx].grnNumber); // open it
  };

  const activeGrn = grns.find((g) => g.grnNumber === activeGrnNumber) || null;

  const handleGrnItemChange = (
    row: number,
    field: keyof GRNItem,
    value: string | number
  ) => {
    setGrns((prev) =>
      prev.map((g) => {
        if (g.grnNumber !== activeGrnNumber) return g;
        const items = [...g.items];
        const updated = { ...items[row], [field]: value };
        if (field === 'receivedQuantity' || field === 'rate') {
          const recQty =
            field === 'receivedQuantity'
              ? Number(value)
              : Number(updated.receivedQuantity);
          const rate =
            field === 'rate' ? Number(value) : Number(updated.rate);
          updated.total = recQty * rate;
        }
        items[row] = updated;
        return { ...g, items };
      })
    );
  };

  /** ───────────────────────────────────────────────────────── JSX */
  return (
    <div className="p-6 flex gap-6">
      {/* ───────── left : main table */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">
          Items for Requisition ID&nbsp;{id}
        </h2>
        <Link
          to="/"
          className="text-blue-600 underline mb-4 inline-block"
        >
          ← Back to List
        </Link>
        {message && <p className="text-red-600">{message}</p>}

        {/* create GRN */}
        <button
          onClick={openCreateModal}
          className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create GRN
        </button>

        <table className="table-auto w-full border shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Item Code</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Unit</th>
              <th className="p-2 border">Required</th>
              <th className="p-2 border">Approved</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="text-center hover:bg-gray-50"
              >
                <td className="p-2 border">{item.itemCode}</td>
                <td className="p-2 border">{item.itemName}</td>
                <td className="p-2 border">{item.unit}</td>
                <td className="p-2 border">{item.requiredQuantity}</td>
                <td className="p-2 border">{item.approvedQuantity}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleReceiveUpdate(item)}
                    className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                  >
                    Receive Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ───────── right : GRN list */}
      <div className="w-64 border-l pl-4">
        <h3 className="font-semibold mb-2">Generated GRNs</h3>
        {grns.length === 0 ? (
          <p className="text-sm text-gray-500">
            No GRNs yet – create one →
          </p>
        ) : (
          <ul className="space-y-2">
            {grns.map((g) => (
              <li key={g.grnNumber}>
                <button
                  className="text-blue-700 underline"
                  onClick={() =>
                    setActiveGrnNumber(
                      activeGrnNumber === g.grnNumber ? null : g.grnNumber
                    )
                  }
                >
                  {g.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ───────── modal : Create GRN */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-20 z-50">
          <div className="bg-white p-6 rounded shadow w-96">
            <h4 className="text-lg font-bold mb-4">Create GRN</h4>
            <label className="block mb-2 text-sm font-medium">
              GRN Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={newGrnName}
              onChange={(e) => setNewGrnName(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
              placeholder="e.g. Kitchen Supplies April"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={createGrn}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────── modal : GRN detail */}
      {activeGrn && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-10 z-50">
          <div className="bg-white p-6 rounded shadow w-11/12 max-w-4xl overflow-y-auto max-h-[85vh]">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold">
                {activeGrn.name} ({activeGrn.grnNumber})
              </h4>
              <button
                onClick={() => setActiveGrnNumber(null)}
                className="text-gray-600 hover:text-black text-xl"
              >
                ×
              </button>
            </div>

            {activeGrn.items.length === 0 ? (
              <p className="text-sm text-gray-500">
                No items added yet – use “Receive Update” in the main
                table.
              </p>
            ) : (
              <table className="table-auto w-full border shadow rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-sm">
                    <th className="p-2 border">Code</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Received Qty</th>
                    <th className="p-2 border">Rate</th>
                    <th className="p-2 border">Total</th>
                    <th className="p-2 border">Received Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activeGrn.items.map((it, idx) => (
                    <tr key={idx} className="text-center hover:bg-gray-50">
                      <td className="p-2 border">{it.itemCode}</td>
                      <td className="p-2 border">{it.itemName}</td>
                      <td className="p-2 border">
                        <input
                          type="number"
                          value={it.receivedQuantity}
                          min={0}
                          onChange={(e) =>
                            handleGrnItemChange(
                              idx,
                              'receivedQuantity',
                              Number(e.target.value)
                            )
                          }
                          className="border rounded px-2 py-1 w-24"
                        />
                      </td>
                      <td className="p-2 border">
                        <input
                          type="number"
                          value={it.rate}
                          min={0}
                          onChange={(e) =>
                            handleGrnItemChange(
                              idx,
                              'rate',
                              Number(e.target.value)
                            )
                          }
                          className="border rounded px-2 py-1 w-24"
                        />
                      </td>
                      <td className="p-2 border">{it.total.toFixed(2)}</td>
                      <td className="p-2 border">
                        <input
                          type="date"
                          value={it.receivedDate || ''}
                          onChange={(e) =>
                            handleGrnItemChange(
                              idx,
                              'receivedDate',
                              e.target.value
                            )
                          }
                          className="border rounded px-2 py-1"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreRequisitionItems;
