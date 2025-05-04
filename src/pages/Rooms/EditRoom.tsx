import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

export default function EditRoom(props: any) {
  const { initial, isOpen, onClose, onSuccess } = props;
  const [roomNo] = useState(initial.roomNo);
  const [status, setStatus] = useState(initial.status);
  const [types, setTypes] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState(initial.roomType.roomTypeId);
  const [error, setError] = useState('');

  async function fetchTypes() {
    try {
      const res = await axios.get('http://localhost:8080/api/room-types');
      setTypes(res.data);
    } catch {
      setError('Could not load room types.');
    }
  }

  useEffect(() => {
    if (isOpen) fetchTypes();
  }, [isOpen]);

  async function handleUpdate() {
    setError('');
    try {
      await axios.put(`http://localhost:8080/api/rooms/${roomNo}`, {
        roomNo,
        status,
        roomType: { roomTypeId: selectedType },
      });
      onSuccess('Room updated.');
      onClose();
    } catch {
      setError('Update failed.');
    }
  }

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-xl p-6 w-80 shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <h2 className="text-xl font-medium mb-4">Edit Room {roomNo}</h2>
        {error && <p className="mb-2 text-red-600">{error}</p>}
        <div className="space-y-4">
          <select
            className="w-full border rounded p-2"
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
          >
            {types.map(t => (
              <option key={t.roomTypeId} value={t.roomTypeId}>
                {t.name}
              </option>
            ))}
          </select>
          <select
            className="w-full border rounded p-2"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="available">available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
        <div className="mt-5 flex justify-end space-x-2">
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
