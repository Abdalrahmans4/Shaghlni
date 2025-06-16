import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

const UserProfileData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const getUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/freelancers/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        alert("Failed to fetch freelancer data.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error fetching data.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/freelancers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert("Freelancer updated successfully.");
        setIsEditing(false);
      } else {
        alert("Failed to update freelancer.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error updating data.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this profile?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/freelancers/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        alert("Freelancer deleted.");
        navigate("/");
      } else {
        alert("Failed to delete freelancer.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error deleting profile.");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (!userData) return <div className="p-8">Loading...</div>;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-black mb-10">User Profile Data</h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Name", name: "name" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone", name: "phone" },
            { label: "Job Title", name: "job_title" },
            { label: "Skills", name: "skills" },
            { label: "Location", name: "location" },
            { label: "Experience", name: "experience" },
            { label: "Portfolio URL", name: "portfolio", type: "url" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={userData[name]}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border-[1px] border-[#292429] px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          ))}

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              value={userData.bio}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border-[1px] border-[#292429] px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Projects */}
          <div>
            <label className="block text-sm font-medium mb-1">Projects</label>
            <textarea
              name="projects"
              value={userData.projects}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border-[1px] border-[#292429] px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium mb-1">Availability</label>
            <select
              name="availability"
              value={userData.availability}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border-[1px] border-[#292429] px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="freelance">Freelance</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
        </form>

        {/* Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Save
            </button>
          )}
          <button
            onClick={handleDelete}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserProfileData;
