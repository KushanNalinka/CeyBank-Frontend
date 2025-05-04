import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import CreateRoom from './CreateRoom';
import EditRoom from './EditRoom';

export default function RoomList() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [editRoom, setEditRoom] = useState<any>(null);

  async function fetchRooms() {
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.get('http://localhost:8080/api/rooms');
      setRooms(res.data);
    } catch {
      setMessage('Could not load rooms.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(roomNo: string) {
    setMessage('');
    try {
      await axios.delete(`http://localhost:8080/api/rooms/${roomNo}`);
      setMessage('Deleted room.');
      fetchRooms();
    } catch {
      setMessage('Delete failed.');
    }
  }

  useEffect(() => {
    fetchRooms();
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
            <h1 className="text-2xl font-semibold">Rooms</h1>
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
              {rooms.map(r => (
                <li
                  key={r.roomNo}
                  className="grid grid-cols-4 gap-4 py-3 border-b items-center hover:bg-gray-50"
                >
                  {/* Room No */}
                  <span>{r.roomNo}</span>

                  {/* Room Type */}
                  <span>{r.roomType.name}</span>

                  {/* Status */}
                  <span className={r.status === 'available' ? 'text-green-600' : 'text-red-600'}>
                    {r.status}
                  </span>

                  {/* Actions */}
                  <span className="flex justify-end space-x-2">
                    <button
                      className="p-1 text-blue-600 hover:text-blue-800"
                      onClick={() => setEditRoom(r)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="p-1 text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(r.roomNo)}
                    >
                      <FaTrash />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <CreateRoom
        isOpen={showCreate}
        onClose={() => {
          setShowCreate(false);
          fetchRooms();
        }}
        onSuccess={msg => {
          setMessage(msg);
          fetchRooms();
        }}
      />

      {editRoom && (
        <EditRoom
          initial={editRoom}
          isOpen={true}
          onClose={() => {
            setEditRoom(null);
            fetchRooms();
          }}
          onSuccess={msg => {
            setMessage(msg);
            fetchRooms();
          }}
        />
      )}
    </div>
  );
}
