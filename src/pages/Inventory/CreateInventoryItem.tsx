// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaTimes } from 'react-icons/fa';
// import { usePopup } from '../../context/PopupContext';

// export default function CreateInventoryItem(props: any) {
//   const { isOpen, onClose, onSuccess } = props;
//   const [itemCode, setItemCode] = useState('');
//   const [itemName, setItemName] = useState('');
//   const [description, setDescription] = useState('');
//   const [slug, setSlug] = useState('');
//   const [quantity, setQuantity] = useState(0);
//   const [category, setCategory] = useState('');
//   const [reOrderLevel, setReOrderLevel] = useState(0);
//   const [maximumReorderLevel, setMaximumReorderLevel] = useState(0);
//   const [error, setError] = useState('');
//   const { openPopup, closePopup } = usePopup();
//   const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

//   useEffect(() => {
//     if (isOpen) {
//       openPopup();
//     } else {
//       closePopup();
//     }
//     return () => closePopup();
//   }, [isOpen]);

//   async function handleCreate() {
//     setError('');
//     try {
//       await axios.post('http://localhost:8080/api/v1/InventoryItem/add', {
//         itemCode,
//         itemName,
//         description,
//         slug,
//         quantity,
//         category,
//         reOrderLevel,
//         maximumReorderLevel,
//       });
//       onSuccess('Item created.');
//       onClose();
//     } catch {
//       setError('Create failed.');
//     }
//   }

//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       <div className="absolute inset-0 bg-black/30" onClick={onClose} />
//       <div className="relative bg-white rounded-xl p-6 w-96 shadow-lg">
//         <button
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//           onClick={onClose}
//         >
//           <FaTimes />
//         </button>
//         <h2 className="text-xl font-medium mb-4">Create Inventory Item</h2>
//         {error && <p className="mb-2 text-red-600">{error}</p>}
//         <div className="space-y-3">
//           <input
//             placeholder="Item Code"
//             className="w-full border rounded p-2"
//             value={itemCode}
//             onChange={e => setItemCode(e.target.value)}
//           />
//           <input
//             placeholder="Item Name"
//             className="w-full border rounded p-2"
//             value={itemName}
//             onChange={e => setItemName(e.target.value)}
//           />
//           <input
//             placeholder="Description"
//             className="w-full border rounded p-2"
//             value={description}
//             onChange={e => setDescription(e.target.value)}
//           />
//           <input
//             placeholder="Slug"
//             className="w-full border rounded p-2"
//             value={slug}
//             onChange={e => setSlug(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Quantity"
//             className="w-full border rounded p-2"
//             value={quantity}
//             onChange={e => setQuantity(+e.target.value)}
//           />
//           <input
//             placeholder="Category"
//             className="w-full border rounded p-2"
//             value={category}
//             onChange={e => setCategory(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Re-order Level"
//             className="w-full border rounded p-2"
//             value={reOrderLevel}
//             onChange={e => setReOrderLevel(+e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Max Re-order Level"
//             className="w-full border rounded p-2"
//             value={maximumReorderLevel}
//             onChange={e => setMaximumReorderLevel(+e.target.value)}
//           />
//         </div>
//         <div className="mt-4 flex justify-end space-x-2">
//           <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 rounded bg-green-500 text-white"
//             onClick={handleCreate}
//           >
//             Create
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaTimes } from 'react-icons/fa';
// import { usePopup } from '../../context/PopupContext';

// export default function CreateInventoryItem(props: any) {
//   const { isOpen, onClose, onSuccess } = props;
//   const [itemCode, setItemCode] = useState('');
//   const [itemName, setItemName] = useState('');
//   const [description, setDescription] = useState('');
//   const [slug, setSlug] = useState('');
//   const [quantity, setQuantity] = useState(0);
//   const [category, setCategory] = useState('');
//   const [reOrderLevel, setReOrderLevel] = useState(0);
//   const [maximumReorderLevel, setMaximumReorderLevel] = useState(0);
//   const [error, setError] = useState('');
//   const { openPopup, closePopup } = usePopup();
//   const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

//   useEffect(() => {
//     if (isOpen) openPopup(); else closePopup();
//     return () => closePopup();
//   }, [isOpen]);

//   async function handleCreate() {
//     setError('');
//     try {
//       await axios.post('http://localhost:8080/api/v1/InventoryItem/add', {
//         itemCode,
//         itemName,
//         description,
//         slug,
//         quantity,
//         category,
//         reOrderLevel,
//         maximumReorderLevel,
//       });
//       onSuccess('Item created.');
//       onClose();
//     } catch {
//       setError('Create failed.');
//     }
//   }

//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto">
//       <div className="absolute inset-0 bg-black/30" onClick={onClose} />
//       <div className="relative bg-white rounded-xl p-6 w-[90vw] h-[80vh] shadow-lg overflow-auto">
//         <button
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//           onClick={onClose}
//         >
//           <FaTimes />
//         </button>
//         <h2 className="text-xl font-medium mb-4">Create Inventory Item</h2>
//         {error && <p className="mb-2 text-red-600">{error}</p>}

//         <div className="grid grid-cols-2 gap-4 whitespace-nowrap">
//           <div>
//             <label htmlFor="itemCode" className="block mb-1 text-sm font-medium">
//               Item Code
//             </label>
//             <input
//               id="itemCode"
//               placeholder="Item Code"
//               className="w-full border rounded p-2"
//               value={itemCode}
//               onChange={e => setItemCode(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="itemName" className="block mb-1 text-sm font-medium">
//               Item Name
//             </label>
//             <input
//               id="itemName"
//               placeholder="Item Name"
//               className="w-full border rounded p-2"
//               value={itemName}
//               onChange={e => setItemName(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="description" className="block mb-1 text-sm font-medium">
//               Description
//             </label>
//             <input
//               id="description"
//               placeholder="Description"
//               className="w-full border rounded p-2"
//               value={description}
//               onChange={e => setDescription(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="slug" className="block mb-1 text-sm font-medium">
//               Slug
//             </label>
//             <input
//               id="slug"
//               placeholder="Slug"
//               className="w-full border rounded p-2"
//               value={slug}
//               onChange={e => setSlug(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="quantity" className="block mb-1 text-sm font-medium">
//               Quantity
//             </label>
//             <input
//               id="quantity"
//               type="number"
//               placeholder="Quantity"
//               className="w-full border rounded p-2"
//               value={quantity}
//               onChange={e => setQuantity(+e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="category" className="block mb-1 text-sm font-medium">
//               Category
//             </label>
//             <input
//               id="category"
//               placeholder="Category"
//               className="w-full border rounded p-2"
//               value={category}
//               onChange={e => setCategory(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="reOrderLevel" className="block mb-1 text-sm font-medium">
//               Re-order Level
//             </label>
//             <input
//               id="reOrderLevel"
//               type="number"
//               placeholder="Re-order Level"
//               className="w-full border rounded p-2"
//               value={reOrderLevel}
//               onChange={e => setReOrderLevel(+e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="maximumReorderLevel" className="block mb-1 text-sm font-medium">
//               Max Re-order Level
//             </label>
//             <input
//               id="maximumReorderLevel"
//               type="number"
//               placeholder="Max Re-order Level"
//               className="w-full border rounded p-2"
//               value={maximumReorderLevel}
//               onChange={e => setMaximumReorderLevel(+e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="mt-4 flex justify-end space-x-2">
//           <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 rounded bg-green-500 text-white"
//             onClick={handleCreate}
//           >
//             Create
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { usePopup } from '../../context/PopupContext';

export default function CreateInventoryItem({ isOpen, onClose, onSuccess }) {
  const [itemCode, setItemCode] = useState('');
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('');
  const [category, setCategory] = useState('');
  const [reOrderLevel, setReOrderLevel] = useState(0);
  const [maximumReorderLevel, setMaximumReorderLevel] = useState(0);
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  const { openPopup, closePopup } = usePopup();
  const API = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    if (isOpen) openPopup();
    else closePopup();
    return () => closePopup();
  }, [isOpen]);

  async function handleCreate() {
    try {
      setError('');
      await axios.post(`${API}/v1/InventoryItem/add`, {
        itemCode,
        itemName,
        description,
        slug,
        quantity,
        unit,
        category,
        reOrderLevel,
        maximumReorderLevel,
        image,
      });
      onSuccess('Item created.');
      onClose();
    } catch {
      setError('Create failed.');
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-xl p-6 w-[90vw] h-[80vh] shadow-lg overflow-auto">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <FaTimes />
        </button>

        <h2 className="text-xl font-medium mb-4">Create Inventory Item</h2>
        {error && <p className="mb-2 text-red-600">{error}</p>}

        <div className="grid grid-cols-2 gap-4 whitespace-nowrap">
          <div><label className="block mb-1 text-sm font-medium">Item Code</label><input className="w-full border rounded p-2" value={itemCode} onChange={(e) => setItemCode(e.target.value)} /></div>
          <div><label className="block mb-1 text-sm font-medium">Item Name</label><input className="w-full border rounded p-2" value={itemName} onChange={(e) => setItemName(e.target.value)} /></div>
          <div><label className="block mb-1 text-sm font-medium">Description</label><input className="w-full border rounded p-2" value={description} onChange={(e) => setDescription(e.target.value)} /></div>
          <div><label className="block mb-1 text-sm font-medium">Slug</label><input className="w-full border rounded p-2" value={slug} onChange={(e) => setSlug(e.target.value)} /></div>
          <div><label className="block mb-1 text-sm font-medium">Quantity</label><input type="number" className="w-full border rounded p-2" value={quantity} onChange={(e) => setQuantity(+e.target.value)} /></div>
          <div><label className="block mb-1 text-sm font-medium">Unit</label><input className="w-full border rounded p-2" value={unit} onChange={(e) => setUnit(e.target.value)} /></div>
          <div><label className="block mb-1 text-sm font-medium">Category</label><input className="w-full border rounded p-2" value={category} onChange={(e) => setCategory(e.target.value)} /></div>
          <div><label className="block mb-1 text-sm font-medium">Re-order Level</label><input type="number" className="w-full border rounded p-2" value={reOrderLevel} onChange={(e) => setReOrderLevel(+e.target.value)} /></div>
          <div><label className="block mb-1 text-sm font-medium">Max Re-order Level</label><input type="number" className="w-full border rounded p-2" value={maximumReorderLevel} onChange={(e) => setMaximumReorderLevel(+e.target.value)} /></div>
          <div className="col-span-2"><label className="block mb-1 text-sm font-medium">Image URL</label><input className="w-full border rounded p-2" value={image} onChange={(e) => setImage(e.target.value)} /></div>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 rounded bg-green-500 text-white" onClick={handleCreate}>Create</button>
        </div>
      </div>
    </div>
  );
}
