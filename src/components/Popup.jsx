import React, { useState } from "react";

const PopUp = ({ openPopUp, closePopUp }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    job_title: "",
    skills: "",
    projects: "",
    location: "",
    experience: "",
    bio: "",
    portfolio: "",
    availability: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const isFormValid = Object.values(formData).every((val) => val.trim() !== "");

  const handleSubmit = async (e) => {
    debugger
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/freelancers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        debugger
        const data = await response.json();
        alert("Freelancer added successfully!");
        closePopUp();
      } else {
        alert("Failed to submit freelancer data.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error submitting form.");
    }
  };

  const handleClosePopUp = (e) => {
    if (e.target.id === "ModelContainer") {
      closePopUp();
      setFormData("");
    }
  };

  if (!openPopUp) return null;

  return (
    <div
      id="ModelContainer"
      onClick={handleClosePopUp}
      className="fixed inset-0 z-50 bg-black  flex justify-center items-center"
    >
      <div className="bg-white w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-4">
          Add Your Project
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Job Title</label>
            <input
              type="text"
              name="job_title"
              onChange={handleChange}
              placeholder="Enter your job title"
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium mb-1">Skills</label>
            <input
              type="text"
              name="skills"
              onChange={handleChange}
              placeholder="e.g. React, Node.js, Tailwind"
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              onChange={handleChange}
              placeholder="Your city or country"
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium mb-1">Experience</label>
            <input
              type="text"
              name="experience"
              onChange={handleChange}
              placeholder="Years of experience or summary"
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Portfolio URL */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Portfolio URL
            </label>
            <input
              type="url"
              name="portfolio"
              onChange={handleChange}
              placeholder="https://yourportfolio.com"
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              placeholder="Short professional bio"
              name="bio"
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            ></textarea>
          </div>

          {/* Projects */}
          <div>
            <label className="block text-sm font-medium mb-1">Projects</label>
            <textarea
              placeholder="Describe your past projects"
              name="projects"
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            ></textarea>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Availability
            </label>
            <select
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              name="availability"
              onChange={handleChange}
            >
              <option value="">Select availability</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="freelance">Freelance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1"></label>
          </div>
        </form>
        {/* Submit Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={closePopUp}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-4 py-2 text-white rounded ${
              isFormValid
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
        <button
          onClick={closePopUp}
          className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default PopUp;
