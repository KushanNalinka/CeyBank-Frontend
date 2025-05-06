// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
// import CreateInventoryItem from './CreateInventoryItem';
// import EditInventoryItem from './EditInventoryItem';

// export default function InventoryItemList() {
//   const [items, setItems] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const [showCreate, setShowCreate] = useState(false);
//   const [editItem, setEditItem] = useState<any>(null);

//   async function fetchItems() {
//     setLoading(true);
//     setMessage('');
//     try {
//       const res = await axios.get('http://localhost:8080/api/v1/InventoryItem/all');
//       setItems(res.data);
//     } catch {
//       setMessage('Could not load inventory items.');
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleDelete(id: number) {
//     setMessage('');
//     try {
//       await axios.delete(`http://localhost:8080/api/v1/InventoryItem/${id}`);
//       setMessage('Deleted item.');
//       fetchItems();
//     } catch {
//       setMessage('Delete failed.');
//     }
//   }

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-4xl mx-auto">
//         {message && (
//           <div className="mb-4 p-3 bg-blue-100 border border-blue-300 text-blue-800 rounded">
//             {message}
//           </div>
//         )}
//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-2xl font-semibold">Inventory Items</h1>
//             <button
//               className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
//               onClick={() => setShowCreate(true)}
//             >
//               <FaPlus />
//             </button>
//           </div>

//           {loading ? (
//             <p>Loading…</p>
//           ) : (
//             <ul>
//               {items.map(item => (
//                 <li
//                   key={item.id}
//                   className="grid grid-cols-8 gap-4 py-3 border-b items-center hover:bg-gray-50"
//                 >
//                   <span>{item.itemCode}</span>
//                   <span>{item.itemName}</span>
//                   <span>{item.category}</span>
//                   <span>{item.quantity}</span>
//                   <span>{item.unit}</span>
//                   <span>{item.reOrderLevel}</span>
//                   <span>{item.maximumReorderLevel}</span>
//                   <span className="flex justify-end space-x-2">
//                     <button
//                       className="p-1 text-blue-600 hover:text-blue-800"
//                       onClick={() => setEditItem(item)}
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       className="p-1 text-red-600 hover:text-red-800"
//                       onClick={() => handleDelete(item.id)}
//                     >
//                       <FaTrash />
//                     </button>
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>

//       <CreateInventoryItem
//         isOpen={showCreate}
//         onClose={() => {
//           setShowCreate(false);
//           fetchItems();
//         }}
//         onSuccess={msg => {
//           setMessage(msg);
//           fetchItems();
//         }}
//       />

//       {editItem && (
//         <EditInventoryItem
//           initial={editItem}
//           isOpen={true}
//           onClose={() => {
//             setEditItem(null);
//             fetchItems();
//           }}
//           onSuccess={msg => {
//             setMessage(msg);
//             fetchItems();
//           }}
//         />
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import CreateInventoryItem from './CreateInventoryItem';
import EditInventoryItem from './EditInventoryItem';

export default function InventoryItemList() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  async function fetchItems() {
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.get('http://localhost:8080/api/v1/InventoryItem/all');
      setItems(res.data);
    } catch {
      setMessage('Could not load inventory items.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    setMessage('');
    try {
      await axios.delete(`http://localhost:8080/api/v1/InventoryItem/${id}`);
      setMessage('Deleted item.');
      fetchItems();
    } catch {
      setMessage('Delete failed.');
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {message && (
          <div className="mb-4 p-3 bg-blue-100 border border-blue-300 text-blue-800 rounded">
            {message}
          </div>
        )}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Inventory Items</h1>
            <button
              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
              onClick={() => setShowCreate(true)}
            >
              <FaPlus />
            </button>
          </div>

          {loading ? (
            <p>Loading…</p>
          ) : (
            <>
              {/* Table Headings */}
              <div className="grid grid-cols-9 gap-4 py-2 border-b font-semibold text-gray-600">
                <span>Image</span>
                <span>Code</span>
                <span>Name</span>
                <span>Category</span>
                <span>Qty</span>
                <span>Unit</span>
                <span>Re-Order</span>
                <span>Max Reorder</span>
                <span className="text-right">Actions</span>
              </div>

              <ul>
                {items.map(item => (
                  <li
                    key={item.id}
                    className="grid grid-cols-9 gap-4 py-3 border-b items-center hover:bg-gray-50"
                  >
                    {/* Image */}
                    <span>
                      <img
                        src={item.imageUrl || 'https://via.placeholder.com/40'}
                        alt={item.itemName}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                    </span>

                    <span>{item.itemCode}</span>
                    <span>{item.itemName}</span>
                    <span>{item.category}</span>
                    <span>{item.quantity}</span>
                    <span>{item.unit}</span>
                    <span>{item.reOrderLevel}</span>
                    <span>{item.maximumReorderLevel}</span>

                    <span className="flex justify-end space-x-2">
                      <button
                        className="p-1 text-blue-600 hover:text-blue-800"
                        onClick={() => setEditItem(item)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="p-1 text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(item.id)}
                      >
                        <FaTrash />
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <CreateInventoryItem
        isOpen={showCreate}
        onClose={() => {
          setShowCreate(false);
          fetchItems();
        }}
        onSuccess={msg => {
          setMessage(msg);
          fetchItems();
        }}
      />

      {editItem && (
        <EditInventoryItem
          initial={editItem}
          isOpen={true}
          onClose={() => {
            setEditItem(null);
            fetchItems();
          }}
          onSuccess={msg => {
            setMessage(msg);
            fetchItems();
          }}
        />
      )}
    </div>
  );
}
