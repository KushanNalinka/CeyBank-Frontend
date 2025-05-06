// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
// import CreateFood from './CreateFood';
// import EditFood from './EditFood';

// export default function FoodList() {
//   const [foods, setFoods] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const [showCreate, setShowCreate] = useState(false);
//   const [editItem, setEditItem] = useState<any>(null);

//   async function fetchFoods() {
//     setLoading(true);
//     setMessage('');
//     try {
//       const res = await axios.get('http://localhost:8080/api/foods');
//       setFoods(res.data);
//     } catch {
//       setMessage('Could not load food items.');
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleDelete(id: number) {
//     setMessage('');
//     try {
//       await axios.delete(`http://localhost:8080/api/foods/${id}`);
//       setMessage('Deleted food item.');
//       fetchFoods();
//     } catch {
//       setMessage('Delete failed.');
//     }
//   }

//   useEffect(() => {
//     fetchFoods();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-5xl mx-auto">
//         {message && (
//           <div className="mb-4 p-3 bg-blue-100 border border-blue-300 text-blue-800 rounded">
//             {message}
//           </div>
//         )}
//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-2xl font-semibold">Food Items</h1>
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
//               {foods.map(f => (
//                 <li
//                   key={f.foodId}
//                   className="grid grid-cols-6 gap-4 py-3 border-b items-center hover:bg-gray-50"
//                 >
//                   <span>{f.code}</span>
//                   <span>{f.name}</span>
//                   <span>₹{f.price.toFixed(2)}</span>
//                   <span>{f.itemCategory}</span>
//                   <span>{f.portionType}</span>
//                   <span className="flex justify-end space-x-2">
//                     <button
//                       className="p-1 text-blue-600 hover:text-blue-800"
//                       onClick={() => setEditItem(f)}
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       className="p-1 text-red-600 hover:text-red-800"
//                       onClick={() => handleDelete(f.foodId)}
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

//       <CreateFood
//         isOpen={showCreate}
//         onClose={() => {
//           setShowCreate(false);
//           fetchFoods();
//         }}
//         onSuccess={msg => {
//           setMessage(msg);
//           fetchFoods();
//         }}
//       />

//       {editItem && (
//         <EditFood
//           initial={editItem}
//           isOpen={true}
//           onClose={() => {
//             setEditItem(null);
//             fetchFoods();
//           }}
//           onSuccess={msg => {
//             setMessage(msg);
//             fetchFoods();
//           }}
//         />
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import CreateFood from './CreateFood';
import EditFood from './EditFood';

export default function FoodList() {
  const [foods, setFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  async function fetchFoods() {
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.get('http://localhost:8080/api/foods');
      setFoods(res.data);
    } catch {
      setMessage('Could not load food items.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    setMessage('');
    try {
      await axios.delete(`http://localhost:8080/api/foods/${id}`);
      setMessage('Deleted food item.');
      fetchFoods();
    } catch {
      setMessage('Delete failed.');
    }
  }

  useEffect(() => {
    fetchFoods();
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
            <h1 className="text-2xl font-semibold">Food Items</h1>
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
              <div className="grid grid-cols-7 gap-4 py-2 border-b font-semibold text-gray-600">
                <span>Image</span>
                <span>Code</span>
                <span>Name</span>
                <span>Price</span>
                <span>Category</span>
                <span>Portion</span>
                <span className="text-right">Actions</span>
              </div>

              <ul>
                {foods.map(f => (
                  <li
                    key={f.foodId}
                    className="grid grid-cols-7 gap-4 py-3 border-b items-center hover:bg-gray-50"
                  >
                    <span>
                      <img
                        src={f.image || 'https://via.placeholder.com/40'}
                        alt={f.name}
                        className="w-10 h-10 object-cover rounded-full border"
                      />
                    </span>
                    <span>{f.code}</span>
                    <span>{f.name}</span>
                    <span>₹{f.price.toFixed(2)}</span>
                    <span>{f.itemCategory}</span>
                    <span>{f.portionType}</span>
                    <span className="flex justify-end space-x-2">
                      <button
                        className="p-1 text-blue-600 hover:text-blue-800"
                        onClick={() => setEditItem(f)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="p-1 text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(f.foodId)}
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

      <CreateFood
        isOpen={showCreate}
        onClose={() => {
          setShowCreate(false);
          fetchFoods();
        }}
        onSuccess={msg => {
          setMessage(msg);
          fetchFoods();
        }}
      />

      {editItem && (
        <EditFood
          initial={editItem}
          isOpen={true}
          onClose={() => {
            setEditItem(null);
            fetchFoods();
          }}
          onSuccess={msg => {
            setMessage(msg);
            fetchFoods();
          }}
        />
      )}
    </div>
  );
}
