

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { addDays, differenceInCalendarDays, formatISO } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { usePopup } from "../../context/PopupContext";
import RoomChart, { Room, StatusMap } from "./RoomChart";
import GuestRegistrationNextForm from "./GuestRegistrationNextForm";

// Constants
const GUEST_TYPES = ["staff", "nonstaff", "pensioners", "clergy", "vip", "foreigners", "others"] as const;
const PAGE_SIZE = 10;

interface RoomType {
  roomTypeId: number;
  name: string;
  currentRate: number;
}

const GuestRegistration: React.FC = () => {
  const today = new Date();

  // Guest info states
  const [guestType, setGuestType] = useState<typeof GUEST_TYPES[number]>(GUEST_TYPES[0]);
  const [pif, setPif] = useState(""); // PIF / NIC / Passport
  const [roomTypeId, setRoomTypeId] = useState<number | null>(null); // selected room type
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]); // dropdown room types

  // Date pickers
  const [inDate, setInDate] = useState<Date>(today);
  const [outDate, setOutDate] = useState<Date>(addDays(today, 1));

  // Room & pagination data
  const [rooms, setRooms] = useState<Room[]>([]);
  const [statusMap, setStatusMap] = useState<StatusMap>({});
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isPopupOpen, openPopup, closePopup } = usePopup();

  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  const nights = Math.max(1, differenceInCalendarDays(outDate, inDate) + 1);
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

  // Fetch room types from API on first load
  useEffect(() => {
    const loadRoomTypes = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/room-types");
        const data = await res.json();
        setRoomTypes(data);
        if (data.length > 0) setRoomTypeId(data[0].roomTypeId); // select first by default
      } catch (e) {
        console.error("Error fetching room types", e);
      }
    };
    loadRoomTypes();
  }, []);

  // Fetch rooms when popup opens or dates / type / page changes
  useEffect(() => {
    if (!isPopupOpen || roomTypeId === null) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const startISO = formatISO(inDate, { representation: "date" });

        // Call API to get available rooms by roomTypeId and date
        const res = await fetch(
          `http://localhost:8080/api/rooms/available-on-date-by-type?date=${startISO}&roomTypeId=${roomTypeId}`
        );
        const apiRooms = await res.json();

        // Convert API rooms to local Room structure
        const convertedRooms: Room[] = apiRooms.map((room: any, idx: number) => ({
          id: idx + 1,
          name: `Room ${room.roomNo}`,
        }));

        setRooms(convertedRooms);
        setHasNext(false); // no pagination from API yet
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isPopupOpen, page, inDate, outDate, roomTypeId]);

  // Page nav
  const nextPage = () => hasNext && setPage((prev) => prev + 1);
  const prevPage = () => page > 0 && setPage((prev) => prev - 1);

  // Toggle room selection
  const toggleRoomSelection = (roomName: string) => {
    setSelectedRooms((prev) =>
      prev.includes(roomName) ? prev.filter((r) => r !== roomName) : [...prev, roomName]
    );
  };

  return (
    <>
      {/* STEP 1 */}
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

            {/* PIF / NIC / Passport */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">PIF / NIC / Passport</label>
              <input
                type="text"
                value={pif}
                onChange={(e) => setPif(e.target.value)}
                className="border rounded-lg p-2 outline-none focus:ring focus:ring-indigo-300"
              />
            </div>

            {/* Room Type Dropdown */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Room Type</label>
              <select
                value={roomTypeId ?? ""}
                onChange={(e) => setRoomTypeId(Number(e.target.value))}
                className="border rounded-lg p-2 outline-none focus:ring focus:ring-indigo-300"
              >
                {roomTypes.map((t) => (
                  <option key={t.roomTypeId} value={t.roomTypeId}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {/* Arrival */}
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

            {/* Departure */}
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

          {/* Select Room */}
          <button
            onClick={() => {
              setPage(0);
              openPopup();
            }}
            className="px-6 py-2 mt-6 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Select Room
          </button>

          {/* Selected Rooms */}
          {selectedRooms.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Selected Rooms:</h2>
              <div className="flex flex-wrap gap-2">
                {selectedRooms.map((room) => (
                  <div
                    key={room}
                    className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full"
                  >
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

{step === 2 && (
  <GuestRegistrationNextForm
    inDate={inDate}
    outDate={outDate}
    selectedRooms={selectedRooms}
    nicPassportPf={pif}
    durationOfStay={`${nights} ${nights === 1 ? "day" : "days"}`}
    onBack={() => setStep(1)}
  />
)} 
      {/* POPUP */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg w-[90%] max-w-7xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                Room chart ({formatISO(inDate, { representation: "date" })} ➔{" "}
                {formatISO(outDate, { representation: "date" })})
              </h2>
              <button onClick={closePopup} className="text-gray-500 hover:text-gray-700 text-xl">
                ✕
              </button>
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
              <button
                onClick={prevPage}
                disabled={page === 0}
                className={`px-4 py-1 rounded ${
                  page === 0 ? "bg-gray-200 text-gray-400" : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                Previous
              </button>

              <button
                onClick={closePopup}
                className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Confirm Selection
              </button>

              <button
                onClick={nextPage}
                disabled={!hasNext}
                className={`px-4 py-1 rounded ${
                  !hasNext ? "bg-gray-200 text-gray-400" : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
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
