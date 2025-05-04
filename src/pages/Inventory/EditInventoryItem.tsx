import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

export default function EditInventoryItem(props: any) {
  const { initial, isOpen, onClose, onSuccess } = props;
  const [itemCode, setItemCode] = useState(initial.itemCode);
  const [itemName, setItemName] = useState(initial.itemName);
  const [description, setDescription] = useState(initial.description);
  const [slug, setSlug] = useState(initial.slug);
  const [quantity, setQuantity] = useState(initial.quantity);
  const [category, setCategory] = useState(initial.category);
  const [reOrderLevel, setReOrderLevel] = useState(initial.reOrderLevel);
  const [maximumReorderLevel, setMaximumReorderLevel] = useState(initial.maximumReorderLevel);
  const [error, setError] = useState('');

  useEffect(() => {
    setItemCode(initial.itemCode);
    setItemName(initial.itemName);
    setDescription(initial.description);
    setSlug(initial.slug);
    setQuantity(initial.quantity);
    setCategory(initial.category);
    setReOrderLevel(initial.reOrderLevel);
    setMaximumReorderLevel(initial.maximumReorderLevel);
  }, [initial]);

  async function handleUpdate() {
    setError('');
    try {
      await axios.put(
        `http://localhost:8080/api/v1/InventoryItem/update/${initial.id}`,
        {
          itemCode,
          itemName,
          description,
          slug,
          quantity,
          category,
          reOrderLevel,
          maximumReorderLevel,
        }
      );
      onSuccess('Item updated.');
      onClose();
    } catch {
      setError('Update failed.');
    }
  }

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-xl p-6 w-96 shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <h2 className="text-xl font-medium mb-4">Edit Inventory Item</h2>
        {error && <p className="mb-2 text-red-600">{error}</p>}
        <div className="space-y-3">
          <input
            placeholder="Item Code"
            className="w-full border rounded p-2"
            value={itemCode}
            onChange={e => setItemCode(e.target.value)}
          />
          <input
            placeholder="Item Name"
            className="w-full border rounded p-2"
            value={itemName}
            onChange={e => setItemName(e.target.value)}
          />
          <input
            placeholder="Description"
            className="w-full border rounded p-2"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Slug"
            className="w-full border rounded p-2"
            value={slug}
            onChange={e => setSlug(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            className="w-full border rounded p-2"
            value={quantity}
            onChange={e => setQuantity(+e.target.value)}
          />
          <input
            placeholder="Category"
            className="w-full border rounded p-2"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
          <input
            type="number"
            placeholder="Re-order Level"
            className="w-full border rounded p-2"
            value={reOrderLevel}
            onChange={e => setReOrderLevel(+e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Re-order Level"
            className="w-full border rounded p-2"
            value={maximumReorderLevel}
            onChange={e => setMaximumReorderLevel(+e.target.value)}
          />
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-500 text-white"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
