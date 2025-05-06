// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaTimes } from 'react-icons/fa';
// import { usePopup } from '../../context/PopupContext';

// export default function EditBeverage(props: any) {
//   const { initial, isOpen, onClose, onSuccess } = props;
//   const [code, setCode] = useState(initial.code);
//   const [name, setName] = useState(initial.name);
//   const [image, setImage] = useState(initial.image);
//   const [description, setDescription] = useState(initial.description);
//   const [slug, setSlug] = useState(initial.slug);
//   const [price, setPrice] = useState(initial.price);
//   const [portionType, setPortionType] = useState(initial.portionType);
//   const [itemCategory, setItemCategory] = useState(initial.itemCategory);
//   const [availableForMeals, setAvailableForMeals] = useState<string[]>(initial.availableForMeals);
//   const [error, setError] = useState('');

//   const meals = ['BREAKFAST', 'LUNCH', 'DINNER'];
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

//   function toggleMeal(meal: string) {
//     setAvailableForMeals(prev =>
//       prev.includes(meal) ? prev.filter(m => m !== meal) : [...prev, meal]
//     );
//   }

//   useEffect(() => {
//     setCode(initial.code);
//     setName(initial.name);
//     setImage(initial.image);
//     setDescription(initial.description);
//     setSlug(initial.slug);
//     setPrice(initial.price);
//     setPortionType(initial.portionType);
//     setItemCategory(initial.itemCategory);
//     setAvailableForMeals(initial.availableForMeals);
//   }, [initial]);

//   async function handleUpdate() {
//     setError('');
//     try {
//       await axios.put(`http://localhost:8080/api/beverages/${initial.beverageId}`, {
//         code,
//         name,
//         image,
//         description,
//         slug,
//         price,
//         portionType,
//         itemCategory,
//         availableForMeals,
//       });
//       onSuccess('Beverage updated.');
//       onClose();
//     } catch {
//       setError('Update failed.');
//     }
//   }

//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
//       <div className="absolute inset-0 bg-black/30" onClick={onClose} />
//       <div className="relative bg-white rounded-xl p-6 w-96 shadow-lg">
//         <button
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//           onClick={onClose}
//         >
//           <FaTimes />
//         </button>
//         <h2 className="text-xl font-medium mb-4">Edit Beverage</h2>
//         {error && <p className="mb-2 text-red-600">{error}</p>}

//         <div className="space-y-3">
//           <input
//             placeholder="Code"
//             className="w-full border rounded p-2"
//             value={code}
//             onChange={e => setCode(e.target.value)}
//           />
//           <input
//             placeholder="Name"
//             className="w-full border rounded p-2"
//             value={name}
//             onChange={e => setName(e.target.value)}
//           />
//           <input
//             placeholder="Image URL"
//             className="w-full border rounded p-2"
//             value={image}
//             onChange={e => setImage(e.target.value)}
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
//             placeholder="Price"
//             className="w-full border rounded p-2"
//             value={price}
//             onChange={e => setPrice(+e.target.value)}
//           />
//           <input
//             placeholder="Portion Type"
//             className="w-full border rounded p-2"
//             value={portionType}
//             onChange={e => setPortionType(e.target.value)}
//           />
//           <input
//             placeholder="Category"
//             className="w-full border rounded p-2"
//             value={itemCategory}
//             onChange={e => setItemCategory(e.target.value)}
//           />

//           <div>
//             <span className="block mb-1">Available For Meals:</span>
//             <div className="flex space-x-2">
//               {meals.map(meal => (
//                 <label key={meal} className="inline-flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={availableForMeals.includes(meal)}
//                     onChange={() => toggleMeal(meal)}
//                     className="form-checkbox"
//                   />
//                   <span className="ml-1">{meal}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="mt-5 flex justify-end space-x-2">
//           <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 rounded bg-blue-500 text-white"
//             onClick={handleUpdate}
//           >
//             Update
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

export default function EditBeverage(props: any) {
  const { initial, isOpen, onClose, onSuccess } = props;
  const [code, setCode] = useState(initial.code);
  const [name, setName] = useState(initial.name);
  const [image, setImage] = useState(initial.image);
  const [description, setDescription] = useState(initial.description);
  const [slug, setSlug] = useState(initial.slug);
  const [price, setPrice] = useState(initial.price);
  const [portionType, setPortionType] = useState(initial.portionType);
  const [itemCategory, setItemCategory] = useState(initial.itemCategory);
  const [availableForMeals, setAvailableForMeals] = useState<string[]>(initial.availableForMeals);
  const [error, setError] = useState('');

  const meals = ['BREAKFAST', 'LUNCH', 'DINNER'];
  const { openPopup, closePopup } = usePopup();
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    if (isOpen) openPopup(); else closePopup();
    return () => closePopup();
  }, [isOpen]);

  function toggleMeal(meal: string) {
    setAvailableForMeals(prev =>
      prev.includes(meal) ? prev.filter(m => m !== meal) : [...prev, meal]
    );
  }

  useEffect(() => {
    setCode(initial.code);
    setName(initial.name);
    setImage(initial.image);
    setDescription(initial.description);
    setSlug(initial.slug);
    setPrice(initial.price);
    setPortionType(initial.portionType);
    setItemCategory(initial.itemCategory);
    setAvailableForMeals(initial.availableForMeals);
  }, [initial]);

  async function handleUpdate() {
    setError('');
    try {
      await axios.put(`${API_URL}/beverages/${initial.beverageId}`, {
        code,
        name,
        image,
        description,
        slug,
        price,
        portionType,
        itemCategory,
        availableForMeals,
      });
      onSuccess('Beverage updated.');
      onClose();
    } catch {
      setError('Update failed.');
    }
  }

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 overflow-auto">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-xl p-6 w-[90vw] h-[80vh] shadow-lg overflow-auto">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <h2 className="text-xl font-medium mb-4">Edit Beverage</h2>
        {error && <p className="mb-2 text-red-600">{error}</p>}

        <div className="grid grid-cols-2 gap-4 whitespace-nowrap">
          <div>
            <label htmlFor="code" className="block mb-1 text-sm font-medium">Code</label>
            <input
              id="code"
              placeholder="Code"
              className="w-full border rounded p-2"
              value={code}
              onChange={e => setCode(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium">Name</label>
            <input
              id="name"
              placeholder="Name"
              className="w-full border rounded p-2"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="image" className="block mb-1 text-sm font-medium">Image URL</label>
            <input
              id="image"
              placeholder="Image URL"
              className="w-full border rounded p-2"
              value={image}
              onChange={e => setImage(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1 text-sm font-medium">Description</label>
            <input
              id="description"
              placeholder="Description"
              className="w-full border rounded p-2"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="slug" className="block mb-1 text-sm font-medium">Slug</label>
            <input
              id="slug"
              placeholder="Slug"
              className="w-full border rounded p-2"
              value={slug}
              onChange={e => setSlug(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="price" className="block mb-1 text-sm font-medium">Price</label>
            <input
              id="price"
              type="number"
              placeholder="Price"
              className="w-full border rounded p-2"
              value={price}
              onChange={e => setPrice(+e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="portionType" className="block mb-1 text-sm font-medium">Portion Type</label>
            <input
              id="portionType"
              placeholder="Portion Type"
              className="w-full border rounded p-2"
              value={portionType}
              onChange={e => setPortionType(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="itemCategory" className="block mb-1 text-sm font-medium">Category</label>
            <input
              id="itemCategory"
              placeholder="Category"
              className="w-full border rounded p-2"
              value={itemCategory}
              onChange={e => setItemCategory(e.target.value)}
            />
          </div>

          <div className="col-span-2">
            <span className="block mb-1 text-sm font-medium">Available For Meals:</span>
            <div className="flex flex-wrap gap-4">
              {meals.map(meal => (
                <label key={meal} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={availableForMeals.includes(meal)}
                    onChange={() => toggleMeal(meal)}
                    className="form-checkbox"
                  />
                  <span className="ml-1">{meal}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end space-x-2">
          <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 rounded bg-blue-500 text-white" onClick={handleUpdate}>Update</button>
        </div>
      </div>
    </div>
  );
}
