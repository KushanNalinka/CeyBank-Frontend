import React from "react";

const GuestRegistrationNextForm: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Guest Details Form</h2>

      <p>Here you can add Name, NIC, Mobile No etc after room selection.</p>

      <input
        type="text"
        placeholder="Guest Name"
        className="w-full p-2 mt-4 border rounded"
      />

      {/* more fields as needed */}
    </div>
  );
};

export default GuestRegistrationNextForm;
