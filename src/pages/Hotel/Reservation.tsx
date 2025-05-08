// src/components/ReservationTable.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';

/** ────────────  Type definitions ──────────── */
interface BillSummary {
  billId: number;
  mealType: string;
  date: string;          // YYYY‑MM‑DD
  grandTotal: number;
}

interface RoomInfo {
  roomNo: string;
  roomType: string;
  currentRate: number;
  foodBills: BillSummary[];
  beverageBills: BillSummary[];
}

interface Reservation {
  reservationId: number;
  customerName: string;
  nicPassportPf: string;
  inDate: string;
  outDate: string;
  days: number;
  total: number;
  advance: number;
  noOfGuests: number;
  adults: number;
  children: number;
  modeOfPayment: string;
  vehicleNos: string;
  billNos: string;
  rooms: RoomInfo[];
}

/** ────────────  Component ──────────── */
const ReservationTable: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null); // reservationId that is open
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<Reservation[]>(
          'http://localhost:8080/api/reservations/full-details'
        );
        setReservations(data);
      } catch (err) {
        setError('Failed to load reservations.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="p-4">Loading…</p>;
  if (error)   return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-[1200px] w-full text-sm border-collapse">
        <thead className="bg-[#E3E6F6] text-[#28245F]">
          <tr>
            <th></th>
            <th className="py-2 px-3 text-left">Reservation ID</th>
            <th className="py-2 px-3 text-left">Customer</th>
            <th className="py-2 px-3">NIC / Passport</th>
            <th className="py-2 px-3">In Date</th>
            <th className="py-2 px-3">Out Date</th>
            <th className="py-2 px-3">Days</th>
            <th className="py-2 px-3">Guests</th>
            <th className="py-2 px-3">Adults</th>
            <th className="py-2 px-3">Kids</th>
            <th className="py-2 px-3">Total (LKR)</th>
            <th className="py-2 px-3">Advance</th>
            <th className="py-2 px-3">Payment</th>
            <th className="py-2 px-3">Vehicle Nos</th>
            <th className="py-2 px-3">Bill Nos</th>
          </tr>
        </thead>

        <tbody>
          {reservations.map((r) => (
            <React.Fragment key={r.reservationId}>
              {/* ───── Main reservation row ───── */}
              <tr className="hover:bg-gray-50 border-b">
                <td className="pl-2 pr-1">
                  <button
                    onClick={() => setExpanded(expanded === r.reservationId ? null : r.reservationId)}
                    title="Show / hide room details"
                    className="focus:outline-none"
                  >
                    {expanded === r.reservationId ? <FaChevronDown /> : <FaChevronRight />}
                  </button>
                </td>
                <td className="py-2 px-3 font-medium">{r.reservationId}</td>
                <td className="py-2 px-3">{r.customerName}</td>
                <td className="py-2 px-3">{r.nicPassportPf}</td>
                <td className="py-2 px-3">{r.inDate}</td>
                <td className="py-2 px-3">{r.outDate}</td>
                <td className="py-2 px-3 text-center">{r.days}</td>
                <td className="py-2 px-3 text-center">{r.noOfGuests}</td>
                <td className="py-2 px-3 text-center">{r.adults}</td>
                <td className="py-2 px-3 text-center">{r.children}</td>
                <td className="py-2 px-3 text-right">{r.total.toLocaleString()}</td>
                <td className="py-2 px-3 text-right">{r.advance.toLocaleString()}</td>
                <td className="py-2 px-3">{r.modeOfPayment}</td>
                <td className="py-2 px-3">{r.vehicleNos || '—'}</td>
                <td className="py-2 px-3">{r.billNos   || '—'}</td>
              </tr>

              {/* ───── Expanded room section ───── */}
              {expanded === r.reservationId && (
                <tr>
                  <td colSpan={15} className="bg-gray-50">
                    {r.rooms.length === 0 ? (
                      <p className="p-3 text-gray-500 italic">No rooms listed.</p>
                    ) : (
                      <table className="w-full text-xs border-t">
                        <thead className="bg-gray-200">
                          <tr>
                            <th className="py-1 px-2">Room No</th>
                            <th className="py-1 px-2">Type</th>
                            <th className="py-1 px-2">Rate (LKR)</th>
                            <th className="py-1 px-2">Food Bills</th>
                            <th className="py-1 px-2">Beverage Bills</th>
                          </tr>
                        </thead>
                        <tbody>
                          {r.rooms.map((room, idx) => (
                            <tr key={idx} className="border-b last:border-none">
                              <td className="py-1 px-2 text-center">{room.roomNo}</td>
                              <td className="py-1 px-2">{room.roomType}</td>
                              <td className="py-1 px-2 text-right">{room.currentRate.toLocaleString()}</td>
                              <td className="py-1 px-2">
                                {room.foodBills.length === 0
                                  ? '—'
                                  : room.foodBills
                                      .map(
                                        (b) =>
                                          `#${b.billId} • ${b.mealType} • ${b.date} • ${b.grandTotal}`
                                      )
                                      .join(', ')}
                              </td>
                              <td className="py-1 px-2">
                                {room.beverageBills.length === 0
                                  ? '—'
                                  : room.beverageBills
                                      .map(
                                        (b) =>
                                          `#${b.billId} • ${b.mealType} • ${b.date} • ${b.grandTotal}`
                                      )
                                      .join(', ')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationTable;
