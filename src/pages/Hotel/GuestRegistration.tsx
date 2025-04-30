


// import React, { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
// import { addDays, formatISO } from "date-fns";
// import "react-datepicker/dist/react-datepicker.css";
// import { usePopup } from "../../context/PopupContext";
// import RoomChart, { Room, StatusMap } from "./RoomChart";
// import GuestRegistrationNextForm from "./GuestRegistrationNextForm";

// /* ───── constants ───── */
// const GUEST_TYPES = ["staff", "nonstaff", "pensioners", "clergy", "vip", "foreigners", "others"] as const;
// const PAGE_SIZE = 10;

// /* ───── component ───── */
// const GuestRegistration: React.FC = () => {
//   const today = new Date();

//   const [guestType, setGuestType] = useState<typeof GUEST_TYPES[number]>(GUEST_TYPES[0]);
//   const [inDate, setInDate] = useState<Date>(today);
//   const [outDate, setOutDate] = useState<Date>(addDays(today, 1));
//   const [rooms, setRooms] = useState<Room[]>([]);
//   const [statusMap, setStatusMap] = useState<StatusMap>({});
//   const [page, setPage] = useState(0);
//   const [hasNext, setHasNext] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const { isPopupOpen, openPopup, closePopup } = usePopup();

//   const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
//   const [step, setStep] = useState(1); // Step 1 = select room, Step 2 = next form

//   useEffect(() => {
//     if (!isPopupOpen) return;

//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const dummyRooms: Room[] = Array.from({ length: PAGE_SIZE }, (_, i) => ({
//           id: page * PAGE_SIZE + i + 1,
//           name: `Room ${page * PAGE_SIZE + i + 101}`,
//         }));

//         const dummyStatus: StatusMap = {
//           "Room 101": [
//             { date: "2025-04-28", status: "booked" },
//             { date: "2025-04-29", status: "booked" },
//             { date: "2025-04-30", status: "booked" },
//           ],
//           "Room 104": [{ date: "2025-04-28", status: "maintenance" }],
//         };

//         setRooms(dummyRooms);
//         setStatusMap(dummyStatus);
//         setHasNext(dummyRooms.length === PAGE_SIZE);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [isPopupOpen, page, inDate, outDate]);

//   const nextPage = () => hasNext && setPage((prev) => prev + 1);
//   const prevPage = () => page > 0 && setPage((prev) => prev - 1);

//   const toggleRoomSelection = (roomName: string) => {
//     setSelectedRooms((prev) =>
//       prev.includes(roomName) ? prev.filter((r) => r !== roomName) : [...prev, roomName]
//     );
//   };

//   return (
//     <>
//       {/* Step 1 or Step 2 */}
//       {step === 1 && (
//         <div className="w-full max-w-6xl space-y-6 bg-white shadow-xl rounded-2xl p-8">
//           <h1 className="text-2xl font-semibold mb-4">Guest Registration</h1>

//           <div className="grid md:grid-cols-3 gap-6">
//             {/* Guest type */}
//             <div className="flex flex-col">
//               <label className="mb-1 font-medium">Guest Type</label>
//               <select
//                 value={guestType}
//                 onChange={(e) => setGuestType(e.target.value as any)}
//                 className="border rounded-lg p-2 outline-none focus:ring focus:ring-indigo-300"
//               >
//                 {GUEST_TYPES.map((t) => (
//                   <option key={t} value={t}>
//                     {t.charAt(0).toUpperCase() + t.slice(1)}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Arrival date */}
//             <div className="flex flex-col">
//               <label className="mb-1 font-medium">Arrival (Check-in)</label>
//               <DatePicker
//                 selected={inDate}
//                 onChange={(date) => date && setInDate(date)}
//                 selectsStart
//                 startDate={inDate}
//                 endDate={outDate}
//                 className="border rounded-lg p-2 w-full outline-none focus:ring focus:ring-indigo-300"
//                 dateFormat="dd/MM/yyyy"
//               />
//             </div>

//             {/* Departure date */}
//             <div className="flex flex-col">
//               <label className="mb-1 font-medium">Departure (Check-out)</label>
//               <DatePicker
//                 selected={outDate}
//                 onChange={(date) => date && setOutDate(date)}
//                 selectsEnd
//                 startDate={inDate}
//                 endDate={outDate}
//                 minDate={inDate}
//                 className="border rounded-lg p-2 w-full outline-none focus:ring focus:ring-indigo-300"
//                 dateFormat="dd/MM/yyyy"
//               />
//             </div>
//           </div>

//           <button
//             onClick={() => {
//               setPage(0);
//               openPopup();
//             }}
//             className="px-6 py-2 mt-4 rounded bg-indigo-600 text-white hover:bg-indigo-700"
//           >
//             Select Room
//           </button>

//           {/* Selected rooms */}
//           {selectedRooms.length > 0 && (
//             <div className="mt-6">
//               <h2 className="text-lg font-semibold mb-2">Selected Rooms:</h2>
//               <div className="flex flex-wrap gap-2">
//                 {selectedRooms.map((room) => (
//                   <span key={room} className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
//                     {room}
//                   </span>
//                 ))}
//               </div>

//               <button
//                 onClick={() => setStep(2)}
//                 className="mt-6 px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       {step === 2 && <GuestRegistrationNextForm />}

//       {/* Modal popup */}
//       {isPopupOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//           <div className="bg-white rounded-lg w-[90%] max-w-7xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
//             {/* header */}
//             <div className="px-6 py-4 border-b flex justify-between items-center">
//               <h2 className="text-lg font-semibold">
//                 Room chart ({formatISO(inDate, { representation: "date" })} ➔ {formatISO(outDate, { representation: "date" })})
//               </h2>
//               <button onClick={closePopup} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
//             </div>

//             {/* body */}
//             <div className="flex-1 overflow-x-auto overflow-y-auto">
//               {loading ? (
//                 <div className="h-full flex items-center justify-center">
//                   <span className="animate-pulse text-gray-500">Loading…</span>
//                 </div>
//               ) : (
//                 <RoomChart
//                   start={inDate}
//                   end={outDate}
//                   rooms={rooms}
//                   statusMap={statusMap}
//                   selectedRooms={selectedRooms}
//                   onToggleRoom={toggleRoomSelection}
//                 />
//               )}
//             </div>

//             {/* footer */}
//             <div className="px-6 py-4 border-t flex items-center justify-between">
//               <button
//                 onClick={prevPage}
//                 disabled={page === 0}
//                 className={`px-4 py-1 rounded ${page === 0 ? "bg-gray-200 text-gray-400" : "bg-indigo-600 text-white"}`}
//               >
//                 Previous
//               </button>

//               <span className="text-sm text-gray-600">Page {page + 1}</span>

//               <button
//                 onClick={nextPage}
//                 disabled={!hasNext}
//                 className={`px-4 py-1 rounded ${!hasNext ? "bg-gray-200 text-gray-400" : "bg-indigo-600 text-white"}`}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default GuestRegistration;

// [Your existing imports]
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { addDays, differenceInCalendarDays, formatISO } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { usePopup } from "../../context/PopupContext";
import RoomChart, { Room, StatusMap } from "./RoomChart";
import GuestRegistrationNextForm from "./GuestRegistrationNextForm";

/* ───── constants ───── */
const GUEST_TYPES = ["staff", "nonstaff", "pensioners", "clergy", "vip", "foreigners", "others"] as const;
const PAGE_SIZE = 10;

/* ───── component ───── */
const GuestRegistration: React.FC = () => {
  const today = new Date();
  const [guestType, setGuestType] = useState<typeof GUEST_TYPES[number]>(GUEST_TYPES[0]);
  const [inDate, setInDate] = useState<Date>(today);
  const [outDate, setOutDate] = useState<Date>(addDays(today, 1));
  const [rooms, setRooms] = useState<Room[]>([]);
  const [statusMap, setStatusMap] = useState<StatusMap>({});
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isPopupOpen, openPopup, closePopup } = usePopup();
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  const nights = Math.max(1, differenceInCalendarDays(outDate, inDate) + 1);

  useEffect(() => {
    if (!isPopupOpen) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const dummyRooms: Room[] = Array.from({ length: PAGE_SIZE }, (_, i) => ({
          id: page * PAGE_SIZE + i + 1,
          name: `Room ${page * PAGE_SIZE + i + 101}`,
        }));

        const dummyStatus: StatusMap = {
          "Room 101": [
            { date: "2025-04-28", status: "booked" },
            { date: "2025-04-29", status: "booked" },
            { date: "2025-04-30", status: "booked" },
          ],
          "Room 104": [{ date: "2025-04-28", status: "maintenance" }],
        };

        setRooms(dummyRooms);
        setStatusMap(dummyStatus);
        setHasNext(dummyRooms.length === PAGE_SIZE);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isPopupOpen, page, inDate, outDate]);

  const nextPage = () => hasNext && setPage((prev) => prev + 1);
  const prevPage = () => page > 0 && setPage((prev) => prev - 1);

  const toggleRoomSelection = (roomName: string) => {
    setSelectedRooms((prev) =>
      prev.includes(roomName) ? prev.filter((r) => r !== roomName) : [...prev, roomName]
    );
  };

  return (
    <>
      {step === 1 && (
        <div className="w-full max-w-6xl space-y-6 bg-white shadow-xl rounded-2xl p-8">
          <h1 className="text-2xl font-semibold mb-4">Guest Registration</h1>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Guest Type */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Guest Type</label>
              <select
                value={guestType}
                onChange={(e) => setGuestType(e.target.value as any)}
                className="border rounded-lg p-2 outline-none focus:ring focus:ring-indigo-300"
              >
                {GUEST_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Check-In */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Arrival (Check-in)</label>
              <DatePicker
                selected={inDate}
                onChange={(date) => date && setInDate(date)}
                selectsStart
                startDate={inDate}
                endDate={outDate}
                className="border rounded-lg p-2 w-full outline-none focus:ring focus:ring-indigo-300"
                dateFormat="dd/MM/yyyy"
              />
            </div>

            {/* Check-Out */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Departure (Check-out)</label>
              <DatePicker
                selected={outDate}
                onChange={(date) => date && setOutDate(date)}
                selectsEnd
                startDate={inDate}
                endDate={outDate}
                minDate={inDate}
                className="border rounded-lg p-2 w-full outline-none focus:ring focus:ring-indigo-300"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>

          {/* Select Room Button */}
          <button
            onClick={() => {
              setPage(0);
              openPopup();
            }}
            className="px-6 py-2 mt-4 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Select Room
          </button>

          {/* Selected Rooms */}
          {selectedRooms.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Selected Rooms:</h2>
              <div className="flex flex-wrap gap-2">
                {selectedRooms.map((room) => (
                  <div key={room} className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    <span>{room}</span>
                    <button
                      onClick={() => toggleRoomSelection(room)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <p className="mt-2 text-gray-600 text-sm">
                Selected for {nights} {nights === 1 ? "night" : "nights"}
              </p>

              <button
                onClick={() => setStep(2)}
                className="mt-6 px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && <GuestRegistrationNextForm />}

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg w-[90%] max-w-7xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                Room chart ({formatISO(inDate, { representation: "date" })} ➔ {formatISO(outDate, { representation: "date" })})
              </h2>
              <button onClick={closePopup} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-x-auto overflow-y-auto">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <span className="animate-pulse text-gray-500">Loading…</span>
                </div>
              ) : (
                <RoomChart
                  start={inDate}
                  end={outDate}
                  rooms={rooms}
                  statusMap={statusMap}
                  selectedRooms={selectedRooms}
                  onToggleRoom={toggleRoomSelection}
                />
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t flex items-center justify-between">
              {/* Previous */}
              <button
                onClick={prevPage}
                disabled={page === 0}
                className={`px-4 py-1 rounded ${page === 0 ? "bg-gray-200 text-gray-400" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
              >
                Previous
              </button>

              {/* Confirm */}
              <button
                onClick={closePopup}
                className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Confirm Selection
              </button>

              {/* Next */}
              <button
                onClick={nextPage}
                disabled={!hasNext}
                className={`px-4 py-1 rounded ${!hasNext ? "bg-gray-200 text-gray-400" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GuestRegistration;
