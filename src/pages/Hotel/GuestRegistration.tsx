import React, { useState } from "react";

const PersonalInfoForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    homeAddress: "",
    homeTel: "",
    officeAddress: "",
    officeTel: "",
    bocAddress: "",
    bocTel: "",
    nationality: "",
    idNumber: "",
    stayDuration: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const goToNext = () => setStep(step + 1);
  const goToPrevious = () => setStep(step - 1);

  const fields = [
    { label: "Name in Full", name: "fullName", type: "input" },
    { label: "Address (Home)", name: "homeAddress", type: "input" },
    { label: "Tel (Home)", name: "homeTel", type: "input" },
    { label: "Address (Office)", name: "officeAddress", type: "textarea" },
    { label: "Tel (Office)", name: "officeTel", type: "textarea" },
    { label: "Bank of Ceylon Address (If Bank Employee)", name: "bocAddress", type: "textarea" },
    { label: "Tel (BOC)", name: "bocTel", type: "input" },
    { label: "Nationality", name: "nationality", type: "input" },
    { label: "National ID / Passport / P.F. No", name: "idNumber", type: "input" },
    { label: "Duration of Stay", name: "stayDuration", type: "input" },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white p-10 shadow-xl border border-gray-300 rounded-xl font-serif text-sm">
      <h2 className="text-2xl font-bold text-center mb-8 underline">Personal Information Form</h2>

      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="font-medium">{field.label}:</label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  rows={3}
                  className="border border-gray-400 rounded px-3 py-1 mt-1 w-full resize-none"
                ></textarea>
              ) : (
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="border border-gray-400 rounded px-3 py-1 mt-1 w-full"
                />
              )}
            </div>
          ))}
          <div className="col-span-2 text-right mt-6">
            <button
              onClick={goToNext}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Next Form Goes Here</h3>
          <p className="text-gray-600 mb-6">You can add the second part of the form here.</p>
          <div className="flex justify-between">
            <button
              onClick={goToPrevious}
              className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition"
            >
              Back
            </button>
            <button
              onClick={() => alert("Form submitted!")}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoForm;
