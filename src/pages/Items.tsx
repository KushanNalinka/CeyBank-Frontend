import React, { useState } from "react";

const CreateItemPage = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    itemCode: "",
    slug: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Item Created Successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-yellow-100 p-6 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Create New Item</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium">Item Name</label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter item name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Item Code</label>
            <input
              type="text"
              name="itemCode"
              value={formData.itemCode}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter item code"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter slug"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter item description"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg transition duration-300"
          >
            Create Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateItemPage;
