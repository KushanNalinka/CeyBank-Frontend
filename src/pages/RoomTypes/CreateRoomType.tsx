// src/components/CreateRoomType.tsx
import { useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

export default function CreateRoomType(props: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}) {
  const { isOpen, onClose, onSuccess } = props;
  const [name, setName] = useState<string>('');
  const [rate, setRate] = useState<number>(0);
  const [error, setError] = useState<string>('');

  async function handleCreate() {
    setError('');
    try {
      await axios.post('http://localhost:8080/api/room-types', {
        name,
        currentRate: rate,
      });
      onSuccess('Created successfully.');
      onClose();
    } catch {
      setError('Create failed.');
    }
  }

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-xl p-6 w-80 shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <h2 className="text-xl font-medium mb-4">Create Room Type</h2>
        {error && (
          <p className="mb-2 text-red-600">{error}</p>
        )}
        <div className="space-y-4">
          <input
            placeholder="Name"
            className="w-full border rounded p-2"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Rate"
            className="w-full border rounded p-2"
            value={rate}
            onChange={e => setRate(+e.target.value)}
          />
        </div>
        <div className="mt-5 flex justify-end space-x-2">
          <button
            className="px-4 py-2 rounded bg-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-green-500 text-white"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
