// src/components/RoomTypeList.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import CreateRoomType from './CreateRoomType';
import EditRoomType from './EditRoomType';

export default function RoomTypeList() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<any>(null);

  async function fetchAll() {
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.get('http://localhost:8080/api/room-types');
      setList(res.data);
    } catch {
      setMessage('Could not load room types.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    setMessage('');
    try {
      await axios.delete(`http://localhost:8080/api/room-types/${id}`);
      setMessage('Deleted successfully.');
      fetchAll();
    } catch {
      setMessage('Delete failed.');
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        {message && (
          <div className="mb-4 p-3 bg-blue-100 border border-blue-300 text-blue-800 rounded">
            {message}
          </div>
        )}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Room Types</h1>
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
            <ul>
              {list.map(item => (
                <li
                  key={item.roomTypeId}
                  className="grid grid-cols-4 gap-4 py-3 border-b items-center hover:bg-gray-50"
                >
                  <span>#{item.roomTypeId}</span>
                  <span>{item.name}</span>
                  <span>₹{item.currentRate.toLocaleString()}</span>
                  <div className="flex space-x-2 justify-end">
                    <button
                      className="p-1 text-blue-600 hover:text-blue-800"
                      onClick={() => setEditItem(item)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="p-1 text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(item.roomTypeId)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <CreateRoomType
        isOpen={showCreate}
        onClose={() => {
          setShowCreate(false);
          fetchAll();
        }}
        onSuccess={msg => {
          setMessage(msg);
          fetchAll();
        }}
      />

      {editItem && (
        <EditRoomType
          initial={editItem}
          isOpen={true}
          onClose={() => {
            setEditItem(null);
            fetchAll();
          }}
          onSuccess={msg => {
            setMessage(msg);
            fetchAll();
          }}
        />
      )}
    </div>
  );
}
