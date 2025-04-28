// import React from 'react';
// import {
//   addDays,
//   differenceInCalendarDays,
//   format,
//   isSameDay,
// } from 'date-fns';


// /* ── types exposed so the parent can import them ── */
// export interface Room {
//   id: number;
//   name: string;
// }

// export type RoomStatus = 'available' | 'booked' | 'maintenance';

// export interface StatusEntry {
//   date: string;    // ISO yyyy-MM-dd
//   status: RoomStatus;
// }

// export type StatusMap = Record<string, StatusEntry[]>;

// /* ───────────────────────────────────────── helpers ── */
// const enumerateDates = (start: Date, end: Date) => {
//   const list: Date[] = [];
//   for (let d = new Date(start); d <= end; d = addDays(d, 1))
//     list.push(new Date(d));
//   return list;
// };

// const StatusBadge: React.FC<{ status: RoomStatus }> = ({ status }) => {
//   const base = 'px-4 py-1 rounded-full text-xs font-semibold';
//   const colour =
//     status === 'booked'
//       ? 'bg-red-500 text-white'
//       : status === 'maintenance'
//       ? 'bg-amber-400 text-white'
//       : 'bg-green-600 text-white';

//   return (
//     <span className={`${base} ${colour}`}>
//       {status[0].toUpperCase() + status.slice(1)}
//     </span>
//   );
// };

// /* ───────────────────────────────────────── component ── */
// interface Props {
//   start: Date;
//   end: Date;
//   rooms: Room[];
//   statusMap: StatusMap;
// }

// const RoomChart: React.FC<Props> = ({ start, end, rooms, statusMap }) => {
//   const days   = enumerateDates(start, end);
//   const nights = Math.max(1, differenceInCalendarDays(end, start) + 1);

//   const getStatus = (roomName: string, date: Date) => {
//     const entry = statusMap[roomName]?.find((s) =>
//       isSameDay(date, new Date(s.date)),
//     );
//     return entry?.status ?? 'available';
//   };

//   const gridCols = `150px repeat(${days.length}, 120px)`; // sticky 1st + day-cols

//   return (
//     <div className="h-full overflow-x-auto">
//       <div
//         className="inline-grid min-w-max"
//         style={{ gridTemplateColumns: gridCols }}
//       >
//         {/* header row */}
//         <div className="border font-semibold flex items-center justify-center bg-gray-100 sticky left-0 z-10">
//           Room / Date
//         </div>
//         {days.map((d) => (
//           <div
//             key={`h-${d}`}
//             className="border font-semibold text-center bg-gray-100"
//           >
//             {format(d, 'd MMM')}
//           </div>
//         ))}

//         {/* room rows */}
//         {rooms.flatMap(({ name }) => [
//           /* sticky room label */
//           <div
//             key={`label-${name}`}
//             className="border font-medium flex items-center justify-center bg-white sticky left-0 z-10"
//           >
//             {name}
//           </div>,
//           /* status cells */
//           ...days.map((d) => {
//             const s = getStatus(name, d);
//             return (
//               <div
//                 key={`${name}-${d.toISOString()}`}
//                 className="border w-[120px] h-16 flex items-center justify-center"
//               >
//                 <StatusBadge status={s} />
//               </div>
//             );
//           }),
//         ])}
//       </div>

//       <p className="text-xs text-gray-500 mt-2">
//         Showing {rooms.length} rooms × {nights} night{nights > 1 && 's'}.
//       </p>
//     </div>
//   );
// };

// export default RoomChart;

import React from "react";
import { addDays, differenceInCalendarDays, format, isSameDay } from "date-fns";

export interface Room {
  id: number;
  name: string;
}

export type RoomStatus = "available" | "booked" | "maintenance";

export interface StatusEntry {
  date: string;
  status: RoomStatus;
}

export type StatusMap = Record<string, StatusEntry[]>;

interface Props {
  start: Date;
  end: Date;
  rooms: Room[];
  statusMap: StatusMap;
  selectedRooms: string[];
  onToggleRoom: (roomName: string) => void;
}

/* ── helpers ── */
const enumerateDates = (start: Date, end: Date) => {
  const list: Date[] = [];
  for (let d = new Date(start); d <= end; d = addDays(d, 1)) list.push(new Date(d));
  return list;
};

const StatusBadge: React.FC<{ status: RoomStatus }> = ({ status }) => {
  const base = "px-4 py-1 rounded-full text-xs font-semibold";
  const colour =
    status === "booked"
      ? "bg-red-500 text-white"
      : status === "maintenance"
      ? "bg-amber-400 text-white"
      : "bg-green-600 text-white";

  return (
    <span className={`${base} ${colour}`}>
      {status[0].toUpperCase() + status.slice(1)}
    </span>
  );
};

const RoomChart: React.FC<Props> = ({ start, end, rooms, statusMap, selectedRooms, onToggleRoom }) => {
  const days = enumerateDates(start, end);
  const nights = Math.max(1, differenceInCalendarDays(end, start) + 1);
  const gridCols = `150px repeat(${days.length}, 120px)`;

  const getStatus = (roomName: string, date: Date) => {
    const entry = statusMap[roomName]?.find((s) => isSameDay(date, new Date(s.date)));
    return entry?.status ?? "available";
  };

  return (
    <div className="h-full w-full overflow-x-auto overflow-y-auto">
      <div className="inline-grid min-w-max" style={{ gridTemplateColumns: gridCols }}>
        {/* header */}
        <div className="border font-semibold flex items-center justify-center bg-gray-100 sticky left-0 z-10">
          Room / Date
        </div>
        {days.map((d) => (
          <div key={`h-${d}`} className="border font-semibold text-center bg-gray-100">
            {format(d, "d MMM")}
          </div>
        ))}

        {/* rooms */}
        {rooms.flatMap(({ name }) => [
          <div
            key={`label-${name}`}
            onClick={() => onToggleRoom(name)}
            className={`border font-medium flex items-center justify-center sticky left-0 z-10 cursor-pointer ${
              selectedRooms.includes(name) ? "bg-indigo-100" : "bg-white"
            }`}
          >
            {name}
          </div>,
          ...days.map((d) => (
            <div key={`${name}-${d.toISOString()}`} className="border w-[120px] h-16 flex items-center justify-center">
              <StatusBadge status={getStatus(name, d)} />
            </div>
          )),
        ])}
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Showing {rooms.length} rooms × {nights} night{nights > 1 && "s"}.
      </p>
    </div>
  );
};

export default RoomChart;
