import React, { useState } from "react";

interface Props {
  inDate: Date;
  outDate: Date;
  selectedRooms: string[];
  nicPassportPf: string;
  durationOfStay: string;
  onBack: () => void;
}

const GuestRegistrationNextForm: React.FC<Props> = ({
  inDate,
  outDate,
  selectedRooms,
  nicPassportPf,
  durationOfStay,
  onBack,
}) => {
  const [form, setForm] = useState({
    title: "Mr",
    nameWithInitials: "",
    nameInFull: "",
    nationality: "",
    telNo: "",
    officeTel: "",
    homeAddress: "",
    officeAddress: "",
    advance: 0,
    noOfGuests: 1,
    adults: 1,
    children: 0,
    modeOfPayment: "Cash",
    vehicleNos: "",
    billNos: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    const payload = {
      ...form,
      nicPassportPf: nicPassportPf,
      durationOfStay: durationOfStay,
      inDate: inDate.toISOString().split("T")[0],
      outDate: outDate.toISOString().split("T")[0],
      roomNos: selectedRooms.map((r) => r.replace("Room ", "")),
    };

    try {
      const res = await fetch("http://localhost:8080/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage("Reservation created successfully.");
      } else {
        setMessage("Failed to create reservation.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error occurred during reservation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto mt-10 space-y-5">
      <h2 className="text-2xl font-semibold">Guest Details</h2>

      {/* Basic info */}
      <div>
        <label className="block font-medium mb-1">Title & Name with Initials</label>
        <div className="flex gap-4">
          <select name="title" value={form.title} onChange={handleChange} className="p-2 border rounded">
            <option>Mr</option>
            <option>Mrs</option>
            <option>Miss</option>
          </select>
          <input
            name="nameWithInitials"
            value={form.nameWithInitials}
            onChange={handleChange}
            className="flex-1 p-2 border rounded"
            placeholder="Name with Initials"
          />
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Full Name</label>
        <input
          name="nameInFull"
          value={form.nameInFull}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Full Name"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">NIC / Passport / PIF</label>
        <input
          value={nicPassportPf}
          disabled
          className="w-full p-2 border rounded bg-gray-100 text-gray-700"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Nationality</label>
        <input
          name="nationality"
          value={form.nationality}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Nationality"
        />
      </div>

      {/* Contact info */}
      <div>
        <label className="block font-medium mb-1">Contact Numbers</label>
        <input
          name="telNo"
          value={form.telNo}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          placeholder="Mobile / Personal"
        />
        <input
          name="officeTel"
          value={form.officeTel}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Office Telephone"
        />
      </div>

      {/* Address info */}
      <div>
        <label className="block font-medium mb-1">Addresses</label>
        <input
          name="homeAddress"
          value={form.homeAddress}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          placeholder="Home Address"
        />
        <input
          name="officeAddress"
          value={form.officeAddress}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Office Address"
        />
      </div>

      {/* Stay and people */}
      <div>
        <label className="block font-medium mb-1">Duration of Stay</label>
        <input
          value={durationOfStay}
          disabled
          className="w-full p-2 border rounded bg-gray-100 text-gray-700"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Guests</label>
        <div className="grid grid-cols-3 gap-4">
          <input
            name="noOfGuests"
            type="number"
            value={form.noOfGuests}
            onChange={handleChange}
            className="p-2 border rounded"
            placeholder="Total Guests"
          />
          <input
            name="adults"
            type="number"
            value={form.adults}
            onChange={handleChange}
            className="p-2 border rounded"
            placeholder="Adults"
          />
          <input
            name="children"
            type="number"
            value={form.children}
            onChange={handleChange}
            className="p-2 border rounded"
            placeholder="Children"
          />
        </div>
      </div>

      {/* Billing */}
      <div>
        <label className="block font-medium mb-1">Billing Info</label>
        <input
          name="advance"
          type="number"
          value={form.advance}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          placeholder="Advance Payment"
        />
        <input
          name="billNos"
          value={form.billNos}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Bill No(s)"
        />
      </div>

      {/* Payment & Vehicle */}
      <div>
        <label className="block font-medium mb-1">Payment & Vehicle</label>
        <select
          name="modeOfPayment"
          value={form.modeOfPayment}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        >
          <option>Cash</option>
          <option>Card</option>
          <option>Online</option>
        </select>
        <input
          name="vehicleNos"
          value={form.vehicleNos}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Vehicle No(s)"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button onClick={onBack} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Back</button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
        >
          {loading ? "Submitting..." : "Submit Reservation"}
        </button>
      </div>

      {message && <p className="text-center mt-2 text-sm text-blue-600">{message}</p>}
    </div>
  );
};

export default GuestRegistrationNextForm;
