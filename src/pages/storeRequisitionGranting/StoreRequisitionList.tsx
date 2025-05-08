// // src/components/StoreRequisitionList.tsx

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// interface RequisitionSummary {
//   id: number;
//   storeRequisitionId: string | null;
//   date: string;
//   status: string | null;
// }

// const StoreRequisitionList: React.FC = () => {
//   const [requisitions, setRequisitions] = useState<RequisitionSummary[]>([]);
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get('http://localhost:8080/api/v1/store-requisitions/summaries')
//       .then((res) => setRequisitions(res.data))
//       .catch(() => setMessage('Failed to load requisitions.'));
//   }, []);

//   const handleEditStatus = (id: number) => {
//     alert(`Edit status functionality for ID ${id} not implemented yet.`);
//   };

//   const handleViewItems = (id: number) => {
//     navigate(`/requisition/grant/${id}`);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Store Requisitions</h1>
//       {message && <p className="text-red-600">{message}</p>}
//       <table className="table-auto w-full border shadow-md rounded-lg">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-3 border">ID</th>
//             <th className="p-3 border">Store Requisition ID</th>
//             <th className="p-3 border">Date</th>
//             <th className="p-3 border">Status</th>
//             <th className="p-3 border">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {requisitions.map((req) => (
//             <tr key={req.id} className="text-center hover:bg-gray-50">
//               <td className="p-2 border">{req.id}</td>
//               <td className="p-2 border">{req.storeRequisitionId ?? '-'}</td>
//               <td className="p-2 border">{req.date}</td>
//               <td className="p-2 border">{req.status ?? 'Pending'}</td>
//               <td className="p-2 border space-x-2">
//                 <button
//                   onClick={() => handleEditStatus(req.id)}
//                   className="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleViewItems(req.id)}
//                   className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-600"
//                 >
//                   View
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StoreRequisitionList;

// StoreRequisitionList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StoreRequisitionList = () => {
  const [requisitions, setRequisitions] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/store-requisitions/summaries')
      .then((res) => res.json())
      .then(setRequisitions)
      .catch(() => setMessage('Failed to load requisitions.'));
  }, []);

  const handleEditStatus = (id) => {
    alert(`Edit status functionality for ID ${id} not implemented yet.`);
  };

  const handleViewItems = (id) => {
    navigate(`/requisition/grant/${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Store Requisitions</h1>
      {message && <p className="text-red-600">{message}</p>}
      <table className="table-auto w-full border shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">ID</th>
            <th className="p-3 border">Store Requisition ID</th>
            <th className="p-3 border">Date</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {requisitions.map((req) => (
            <tr key={req.id} className="text-center hover:bg-gray-50">
              <td className="p-2 border">{req.id}</td>
              <td className="p-2 border">{req.storeRequisitionId ?? '-'}</td>
              <td className="p-2 border">{req.date}</td>
              <td className="p-2 border">{req.status ?? 'Pending'}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleEditStatus(req.id)}
                  className="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleViewItems(req.id)}
                  className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-600"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreRequisitionList;
