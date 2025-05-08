
// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';

// /* ────────────────── types */
// interface ReqItem {
//   id: number;
//   itemCode: string;
//   itemName: string;
//   unit: string;
//   requiredQuantity: number;
//   approvedQuantity: number;
//   receivedQuantity: number;
//   rate: number;
//   total: number;
//   receivedDate: string;
//   grnNo: string;
//   transactionId: number | null;
// }
// interface GRN { grnNo: string; name?: string }

// /* ────────────────── constants */
// const PAGE_SIZE = 8;
// const API = 'http://localhost:8080/api/v1';

// /* ────────────────── helpers */
// const genRandomGrn = () =>
//   'GRN' +
//   Math.floor(Math.random() * 1_000_000_0000)
//     .toString()
//     .padStart(10, '0');

// const normaliseGrnList = (d: unknown): GRN[] =>
//   Array.isArray(d)
//     ? typeof d[0] === 'string'
//       ? (d as string[]).map((g) => ({ grnNo: g }))
//       : (d as any[]).map((o) => ({
//           grnNo: o.grnNo ?? o.grn_no ?? o.grnNumber ?? '',
//           name: o.name ?? o.grnName ?? undefined,
//         }))
//     : [];

// /* ────────────────── component */
// const StoreRequisitionItems: React.FC = () => {
//   const { id } = useParams<{ id: string }>();

//   /* requisition items */
//   const [items, setItems] = useState<ReqItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');

//   /* pagination */
//   const [page, setPage] = useState(1);
//   const pageItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
//   const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));

//   /* selection */
//   const [selected, setSelected] = useState<ReqItem[]>([]);
//   const toggleSelect = (it: ReqItem) =>
//     setSelected((p) =>
//       p.find((i) => i.id === it.id) ? p.filter((i) => i.id !== it.id) : [...p, it]
//     );

//   /* GRN list */
//   const [grns, setGrns] = useState<GRN[]>([]);
//   const loadGrns = async () => {
//     try {
//       const res = await axios.get(`${API}/store-requisitions/grn/list/${id}`);
//       setGrns(normaliseGrnList(res.data));
//     } catch { setGrns([]); }
//   };

//   /* view / edit GRN */
//   const [view, setView] = useState<string | null>(null);
//   const [viewItems, setViewItems] = useState<ReqItem[]>([]);
//   const openViewer = async (grnNo: string) => {
//     try {
//       const res = await axios.get<ReqItem[]>(
//         `${API}/store-requisitions/grn/items/${grnNo}`
//       );
//       setViewItems(res.data);
//       setView(grnNo);
//     } catch { setMessage('Failed to load GRN items'); }
//   };

//   /* --- modification: allow TOTAL editable & close‑then‑msg logic --- */
//   const changeViewItem = (
//     idx: number,
//     field: 'receivedQuantity' | 'rate' | 'total',
//     value: number
//   ) => {
//     setViewItems((prev) => {
//       const copy = [...prev];
//       const upd = { ...copy[idx], [field]: value };
//       if (field !== 'total') {
//         upd.total =
//           field === 'receivedQuantity'
//             ? value * upd.rate
//             : upd.receivedQuantity * value;
//       }
//       copy[idx] = upd;
//       return copy;
//     });
//   };

//   const saveViewChanges = async () => {
//     try {
//       await axios.put(`${API}/store-requisitions/grn/update-items`, {
//         grnNo: view,
//         items: viewItems.map((i) => ({
//           itemId: i.id,
//           receivedQuantity: i.receivedQuantity,
//           rate: i.rate,
//           total: i.total,
//         })),
//       });
//       setView(null);
//       setMessage('GRN updated successfully.');
//       loadGrns();
//     } catch { setMessage('Update failed.'); }
//   };

//   /* add‑to‑GRN modal */
//   const [showModal, setShowModal] = useState(false);
//   const [grnInput, setGrnInput] = useState('');
//   const [recvDate, setRecvDate] = useState(
//     new Date().toISOString().split('T')[0]
//   );
//   const [confirm, setConfirm] = useState(false);
//   const [modalErr, setModalErr] = useState('');

//   const openAddModal = () => {
//     setGrnInput(genRandomGrn());
//     setRecvDate(new Date().toISOString().split('T')[0]);
//     setConfirm(false);
//     setModalErr('');
//     setShowModal(true);
//   };

//   const addToGrn = async () => {
//     if (!grnInput.trim())           return setModalErr('GRN number is required.');
//     if (selected.length === 0)      return setModalErr('Select at least one item.');
//     if (!confirm)                   return setModalErr('Please confirm this GRN.');
//     try {
//       await axios.post(`${API}/store-requisitions/grn/add-batch`, {
//         grnNo: grnInput.trim(),
//         receivedDate: recvDate,
//         itemIds: selected.map((i) => i.id),
//       });
//       setShowModal(false);           /* close FIRST */
//       setSelected([]);
//       setMessage('Items added to GRN successfully.');
//       loadGrns();
//     } catch { setModalErr('Failed to add items.'); }
//   };

//   /* initial fetch */
//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await axios.get<ReqItem[]>(
//           `${API}/store-requisitions/${id}/items`
//         );
//         setItems(res.data);
//         await loadGrns();
//       } catch { setMessage('Failed to load data.'); }
//       finally { setLoading(false); }
//     })();
//   }, [id]);

//   /* render */
//   if (loading) return <p className="p-6">Loading…</p>;

//   return (
//     <div className="p-6 flex gap-6">
//       <div className="flex-1">
//         <h2 className="text-2xl font-bold mb-4">Items for Requisition {id}</h2>
//         <Link to="/" className="text-blue-600 underline mb-4 inline-block">← Back</Link>
//         {message && <p className="mb-4 text-sm text-green-700">{message}</p>}

//         <table className="table-auto w-full border shadow rounded-lg">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-2 border" />
//               <th className="p-2 border">Item Code</th>
//               <th className="p-2 border">Name</th>
//               <th className="p-2 border">Unit</th>
//               <th className="p-2 border">Required</th>
//               <th className="p-2 border">Approved</th>
//               <th className="p-2 border">GRN</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pageItems.map((it) => (
//               <tr key={`it-${it.id}`} className="text-center hover:bg-gray-50">
//                 <td className="p-2 border">
//                   <input
//                     type="checkbox"
//                     checked={!!selected.find((s) => s.id === it.id)}
//                     onChange={() => toggleSelect(it)}
//                   />
//                 </td>
//                 <td className="p-2 border">{it.itemCode}</td>
//                 <td className="p-2 border">{it.itemName}</td>
//                 <td className="p-2 border">{it.unit}</td>
//                 <td className="p-2 border">{it.requiredQuantity}</td>
//                 <td className="p-2 border">{it.approvedQuantity}</td>
//                 <td className="p-2 border">{it.grnNo}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* pagination */}
//         {pageCount > 1 && (
//           <div className="mt-4 flex justify-center gap-2">
//             <button disabled={page===1}
//                     onClick={() => setPage(page-1)}
//                     className="px-3 py-1 border rounded disabled:opacity-40">Prev</button>
//             {Array.from({length:pageCount},(_,i)=>(
//               <button key={`pg-${i}`}
//                       onClick={()=>setPage(i+1)}
//                       className={`px-3 py-1 border rounded ${page===i+1?'bg-gray-300':''}`}>
//                 {i+1}
//               </button>
//             ))}
//             <button disabled={page===pageCount}
//                     onClick={()=>setPage(page+1)}
//                     className="px-3 py-1 border rounded disabled:opacity-40">Next</button>
//           </div>
//         )}

//         {selected.length>0 && (
//           <button onClick={openAddModal}
//                   className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
//             Add to GRN ({selected.length})
//           </button>
//         )}
//       </div>

//       {/* right list */}
//       <div className="w-72 border-l pl-4">
//         <h3 className="font-semibold mb-2">Existing GRNs</h3>
//         {grns.length===0?
//           <p className="text-sm text-gray-500">None yet.</p>:
//           <ul className="space-y-1">
//             {grns.map(g=>(
//               <li key={`grn-${g.grnNo}`}>
//                 <button onClick={()=>openViewer(g.grnNo)}
//                         className="text-blue-700 underline text-sm">
//                   {g.grnNo}{g.name?` — ${g.name}`:''}
//                 </button>
//               </li>
//             ))}
//           </ul>}
//       </div>

//       {/* modal add */}
//       {showModal&&(
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-12 z-50">
//           <div className="bg-white p-6 rounded shadow-xl w-11/12 max-w-3xl">
//             <div className="flex justify-between items-center mb-4">
//               <h4 className="text-lg font-bold">Add Items to GRN</h4>
//               <button onClick={()=>setShowModal(false)}
//                       className="text-xl text-gray-600 hover:text-black">×</button>
//             </div>

//             <label className="block text-sm font-medium mb-1">GRN Number</label>
//             <input value={grnInput} onChange={e=>setGrnInput(e.target.value)}
//                    className="border rounded w-full px-3 py-2 mb-3"
//                    placeholder="GRNXXXXXXXXXX"/>

//             <label className="block text-sm font-medium mb-1">Received Date</label>
//             <input type="date" value={recvDate}
//                    onChange={e=>setRecvDate(e.target.value)}
//                    className="border rounded w-full px-3 py-2 mb-4"/>

//             <h5 className="font-semibold mb-2">Selected Items</h5>
//             {selected.length===0?
//               <p className="text-sm text-gray-500 mb-4">No items selected.</p>:
//               <table className="table-auto w-full border shadow rounded mb-4">
//                 <thead><tr className="bg-gray-100 text-sm">
//                   <th className="p-2 border">Code</th><th className="p-2 border">Name</th>
//                   <th className="p-2 border">Remove</th>
//                 </tr></thead>
//                 <tbody>
//                   {selected.map(it=>(
//                     <tr key={`sel-${it.id}`} className="text-center">
//                       <td className="p-2 border">{it.itemCode}</td>
//                       <td className="p-2 border">{it.itemName}</td>
//                       <td className="p-2 border">
//                         <button onClick={()=>toggleSelect(it)}
//                                 className="text-red-600 underline text-sm">×</button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>}

//             <label className="inline-flex items-center mb-4">
//               <input type="checkbox" checked={confirm}
//                      onChange={e=>setConfirm(e.target.checked)} className="mr-2"/>
//               <span className="text-sm">I confirm this GRN</span>
//             </label>

//             {modalErr&&<p className="text-sm text-red-600 mb-3">{modalErr}</p>}

//             <div className="flex justify-end gap-2">
//               <button onClick={()=>setShowModal(false)}
//                       className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
//               {confirm&&(
//                 <button onClick={addToGrn}
//                         className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">
//                   Add to GRN
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* popup view/edit */}
//       {view&&(
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-10 z-50">
//           <div className="bg-white p-6 rounded shadow-xl w-11/12 max-w-4xl overflow-y-auto max-h-[85vh]">
//             <div className="flex justify-between items-center mb-4">
//               <h4 className="text-lg font-bold">GRN {view}</h4>
//               <button onClick={()=>setView(null)}
//                       className="text-xl text-gray-600 hover:text-black">×</button>
//             </div>

//             {viewItems.length===0?
//               <p className="text-sm text-gray-500">No items for this GRN.</p>:
//               <>
//                 <table className="table-auto w-full border shadow rounded mb-4">
//                   <thead><tr className="bg-gray-100 text-sm">
//                     <th className="p-2 border">Code</th>
//                     <th className="p-2 border">Name</th>
//                     <th className="p-2 border">Received Qty</th>
//                     <th className="p-2 border">Rate</th>
//                     <th className="p-2 border">Total</th>
//                     <th className="p-2 border">Received Date</th>
//                   </tr></thead>
//                   <tbody>
//                     {viewItems.map((it,idx)=>(
//                       <tr key={`view-${it.id}`} className="text-center hover:bg-gray-50">
//                         <td className="p-2 border">{it.itemCode}</td>
//                         <td className="p-2 border">{it.itemName}</td>
//                         <td className="p-2 border">
//                           <input type="number" value={it.receivedQuantity} min={0}
//                                  onChange={e=>changeViewItem(idx,'receivedQuantity',Number(e.target.value))}
//                                  className="border rounded px-2 py-1 w-24"/>
//                         </td>
//                         <td className="p-2 border">
//                           <input type="number" value={it.rate} min={0}
//                                  onChange={e=>changeViewItem(idx,'rate',Number(e.target.value))}
//                                  className="border rounded px-2 py-1 w-24"/>
//                         </td>
//                         {/* MODIFICATION: total editable */}
//                         <td className="p-2 border">
//                           <input type="number" value={it.total} min={0}
//                                  onChange={e=>changeViewItem(idx,'total',Number(e.target.value))}
//                                  className="border rounded px-2 py-1 w-24"/>
//                         </td>
//                         <td className="p-2 border">{it.receivedDate}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>

//                 <div className="flex justify-end">
//                   <button onClick={saveViewChanges}
//                           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//                     Save Changes
//                   </button>
//                 </div>
//               </>}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StoreRequisitionItems;

// StoreRequisitionItems.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

/* ────────────────── constants */
const PAGE_SIZE = 8;
const API = 'http://localhost:8080/api/v1';

/* ────────────────── helpers */
const genRandomGrn = () =>
  'GRN' +
  Math.floor(Math.random() * 1_000_000_0000)
    .toString()
    .padStart(10, '0');

const normaliseGrnList = (data) => {
  if (!Array.isArray(data)) return [];
  if (typeof data[0] === 'string') {
    return data.map((g) => ({ grnNo: g }));
  }
  return data.map((o) => ({
    grnNo: o.grnNo ?? o.grn_no ?? o.grnNumber ?? '',
    name: o.name ?? o.grnName ?? undefined,
  }));
};

/* ────────────────── component */
const StoreRequisitionItems = () => {
  const { id } = useParams();

  /* requisition items */
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  /* pagination */
  const [page, setPage] = useState(1);
  const pageItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));

  /* selection */
  const [selected, setSelected] = useState([]);
  const toggleSelect = (it) =>
    setSelected((prev) =>
      prev.find((i) => i.id === it.id)
        ? prev.filter((i) => i.id !== it.id)
        : [...prev, it]
    );

  /* GRN list */
  const [grns, setGrns] = useState([]);
  const loadGrns = async () => {
    try {
      const res = await axios.get(`${API}/store-requisitions/grn/list/${id}`);
      setGrns(normaliseGrnList(res.data));
    } catch {
      setGrns([]);
    }
  };

  /* view / edit GRN */
  const [view, setView] = useState(null);
  const [viewItems, setViewItems] = useState([]);
  const openViewer = async (grnNo) => {
    try {
      const res = await axios.get(
        `${API}/store-requisitions/grn/items/${grnNo}`
      );
      setViewItems(res.data);
      setView(grnNo);
    } catch {
      setMessage('Failed to load GRN items');
    }
  };

  // allow TOTAL editable & keep calculations in sync
  const changeViewItem = (idx, field, value) => {
    setViewItems((prev) => {
      const copy = [...prev];
      const upd = { ...copy[idx], [field]: value };
      if (field !== 'total') {
        upd.total =
          field === 'receivedQuantity'
            ? value * upd.rate
            : upd.receivedQuantity * value;
      }
      copy[idx] = upd;
      return copy;
    });
  };

  const saveViewChanges = async () => {
    try {
      await axios.put(`${API}/store-requisitions/grn/update-items`, {
        grnNo: view,
        items: viewItems.map((i) => ({
          itemId: i.id,
          receivedQuantity: i.receivedQuantity,
          rate: i.rate,
          total: i.total,
        })),
      });
      setView(null);
      setMessage('GRN updated successfully.');
      loadGrns();
    } catch {
      setMessage('Update failed.');
    }
  };

  /* add‑to‑GRN modal */
  const [showModal, setShowModal] = useState(false);
  const [grnInput, setGrnInput] = useState('');
  const [recvDate, setRecvDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [confirm, setConfirm] = useState(false);
  const [modalErr, setModalErr] = useState('');

  const openAddModal = () => {
    setGrnInput(genRandomGrn());
    setRecvDate(new Date().toISOString().split('T')[0]);
    setConfirm(false);
    setModalErr('');
    setShowModal(true);
  };

  const addToGrn = async () => {
    if (!grnInput.trim()) return setModalErr('GRN number is required.');
    if (selected.length === 0) return setModalErr('Select at least one item.');
    if (!confirm) return setModalErr('Please confirm this GRN.');
    try {
      await axios.post(`${API}/store-requisitions/grn/add-batch`, {
        grnNo: grnInput.trim(),
        receivedDate: recvDate,
        itemIds: selected.map((i) => i.id),
      });
      setShowModal(false); // close FIRST
      setSelected([]);
      setMessage('Items added to GRN successfully.');
      loadGrns();
    } catch {
      setModalErr('Failed to add items.');
    }
  };

  /* initial fetch */
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${API}/store-requisitions/${id}/items`
        );
        setItems(res.data);
        await loadGrns();
      } catch {
        setMessage('Failed to load data.');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  /* render */
  if (loading) return <p className="p-6">Loading…</p>;

  return (
    <div className="p-6 flex gap-6">
      {/* ───────── left panel */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">Items for Requisition {id}</h2>
        <Link to="/" className="text-blue-600 underline mb-4 inline-block">
          ← Back
        </Link>
        {message && <p className="mb-4 text-sm text-green-700">{message}</p>}

        <table className="table-auto w-full border shadow rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border" />
              <th className="p-2 border">Item Code</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Unit</th>
              <th className="p-2 border">Required</th>
              <th className="p-2 border">Approved</th>
              <th className="p-2 border">GRN</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((it) => (
              <tr key={`it-${it.id}`} className="text-center hover:bg-gray-50">
                <td className="p-2 border">
                  <input
                    type="checkbox"
                    checked={!!selected.find((s) => s.id === it.id)}
                    onChange={() => toggleSelect(it)}
                  />
                </td>
                <td className="p-2 border">{it.itemCode}</td>
                <td className="p-2 border">{it.itemName}</td>
                <td className="p-2 border">{it.unit}</td>
                <td className="p-2 border">{it.requiredQuantity}</td>
                <td className="p-2 border">{it.approvedQuantity}</td>
                <td className="p-2 border">{it.grnNo}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* pagination */}
        {pageCount > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Prev
            </button>
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={`pg-${i}`}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  page === i + 1 ? 'bg-gray-300' : ''
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={page === pageCount}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}

        {selected.length > 0 && (
          <button
            onClick={openAddModal}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Add to GRN ({selected.length})
          </button>
        )}
      </div>

      {/* ───────── right panel */}
      <div className="w-72 border-l pl-4">
        <h3 className="font-semibold mb-2">Existing GRNs</h3>
        {grns.length === 0 ? (
          <p className="text-sm text-gray-500">None yet.</p>
        ) : (
          <ul className="space-y-1">
            {grns.map((g) => (
              <li key={`grn-${g.grnNo}`}>
                <button
                  onClick={() => openViewer(g.grnNo)}
                  className="text-blue-700 underline text-sm"
                >
                  {g.grnNo}
                  {g.name ? ` — ${g.name}` : ''}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ───────── modal: add to GRN */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-12 z-50">
          <div className="bg-white p-6 rounded shadow-xl w-11/12 max-w-3xl">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold">Add Items to GRN</h4>
              <button
                onClick={() => setShowModal(false)}
                className="text-xl text-gray-600 hover:text-black"
              >
                ×
              </button>
            </div>

            <label className="block text-sm font-medium mb-1">
              GRN Number
            </label>
            <input
              value={grnInput}
              onChange={(e) => setGrnInput(e.target.value)}
              className="border rounded w-full px-3 py-2 mb-3"
              placeholder="GRNXXXXXXXXXX"
            />

            <label className="block text-sm font-medium mb-1">
              Received Date
            </label>
            <input
              type="date"
              value={recvDate}
              onChange={(e) => setRecvDate(e.target.value)}
              className="border rounded w-full px-3 py-2 mb-4"
            />

            <h5 className="font-semibold mb-2">Selected Items</h5>
            {selected.length === 0 ? (
              <p className="text-sm text-gray-500 mb-4">No items selected.</p>
            ) : (
              <table className="table-auto w-full border shadow rounded mb-4">
                <thead>
                  <tr className="bg-gray-100 text-sm">
                    <th className="p-2 border">Code</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {selected.map((it) => (
                    <tr key={`sel-${it.id}`} className="text-center">
                      <td className="p-2 border">{it.itemCode}</td>
                      <td className="p-2 border">{it.itemName}</td>
                      <td className="p-2 border">
                        <button
                          onClick={() => toggleSelect(it)}
                          className="text-red-600 underline text-sm"
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <label className="inline-flex items-center mb-4">
              <input
                type="checkbox"
                checked={confirm}
                onChange={(e) => setConfirm(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">I confirm this GRN</span>
            </label>

            {modalErr && (
              <p className="text-sm text-red-600 mb-3">{modalErr}</p>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              {confirm && (
                <button
                  onClick={addToGrn}
                  className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Add to GRN
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ───────── popup: view / edit GRN */}
      {view && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-10 z-50">
          <div className="bg-white p-6 rounded shadow-xl w-11/12 max-w-4xl overflow-y-auto max-h-[85vh]">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold">GRN {view}</h4>
              <button
                onClick={() => setView(null)}
                className="text-xl text-gray-600 hover:text-black"
              >
                ×
              </button>
            </div>

            {viewItems.length === 0 ? (
              <p className="text-sm text-gray-500">No items for this GRN.</p>
            ) : (
              <>
                <table className="table-auto w-full border shadow rounded mb-4">
                  <thead>
                    <tr className="bg-gray-100 text-sm">
                      <th className="p-2 border">Code</th>
                      <th className="p-2 border">Name</th>
                      <th className="p-2 border">Received Qty</th>
                      <th className="p-2 border">Rate</th>
                      <th className="p-2 border">Total</th>
                      <th className="p-2 border">Received Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewItems.map((it, idx) => (
                      <tr
                        key={`view-${it.id}`}
                        className="text-center hover:bg-gray-50"
                      >
                        <td className="p-2 border">{it.itemCode}</td>
                        <td className="p-2 border">{it.itemName}</td>
                        <td className="p-2 border">
                          <input
                            type="number"
                            value={it.receivedQuantity}
                            min={0}
                            onChange={(e) =>
                              changeViewItem(
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
                              changeViewItem(
                                idx,
                                'rate',
                                Number(e.target.value)
                              )
                            }
                            className="border rounded px-2 py-1 w-24"
                          />
                        </td>
                        {/* total editable */}
                        <td className="p-2 border">
                          <input
                            type="number"
                            value={it.total}
                            min={0}
                            onChange={(e) =>
                              changeViewItem(
                                idx,
                                'total',
                                Number(e.target.value)
                              )
                            }
                            className="border rounded px-2 py-1 w-24"
                          />
                        </td>
                        <td className="p-2 border">{it.receivedDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-end">
                  <button
                    onClick={saveViewChanges}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreRequisitionItems;
