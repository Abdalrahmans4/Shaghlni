import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import MapDisplay from './MapDisplay';

const UserProfileData = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);


    const mapRef = useRef(null);
    const markerRef = useRef(null);



    const initMap = () => {
        if (!mapRef.current) return;
        debugger
        const defaultLoc = { lat: 31.9522, lng: 35.9106 };
        const map = new window.google.maps.Map(mapRef.current, {
            center: defaultLoc,
            zoom: 5,
        });
        markerRef.current = new window.google.maps.Marker({
            position: defaultLoc,
            map,
            draggable: true,
        });
        markerRef.current.addListener("dragend", (event) => {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            setUserData((prev) => ({
                ...prev,
                location: `${lat},${lng}`,
            }));
        });
    };

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
        if (window.google && window.google.maps) {
            if (isEditing) initMap();
        } else {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDax8621aNYSLDSZbaE9jTfW3EKf-ZOObQ`;
            script.async = true;
            script.onload = () => {
                if (isEditing) initMap();
            };
            document.body.appendChild(script);
        }
    }, [isEditing]);

    if (!userData) return <div className="p-8">Loading...</div>;

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <button
                    onClick={() => navigate('/')}
                    className="mb-4 flex items-center px-4 py-2 text-white transition bg-blue-600 hover:bg-blue-700 rounded"
                    // bg-blue-600 hover:bg-blue-700
                    // px-4 py-2 text-white rounded
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 mr-2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    Back to Home
                </button>
                <h2 className="text-3xl font-bold text-center text-black mb-10">User Profile Data</h2>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { label: "Name", name: "name" },
                        { label: "Email", name: "email", type: "email" },
                        { label: "Phone", name: "phone" },
                        { label: "Job Title", name: "job_title" },
                        { label: "Skills", name: "skills" },
                        // { label: "Location", name: "location" },
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
                    <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">Location</label>
                        {isEditing ? (
                            <>
                                <div
                                    ref={mapRef}
                                    className="w-full h-64 rounded-lg"
                                ></div>
                                <input
                                    type="text"
                                    name="location"
                                    value={userData.location}
                                    readOnly
                                    className="w-full border px-3 py-2 rounded-md mt-2 bg-gray-100"
                                    placeholder="Pick your location on the map"
                                />
                            </>
                        ) : (
                            <>
                                <MapDisplay location={userData.location} />
                                <input
                                    type="text"
                                    name="location"
                                    value={userData.location}
                                    readOnly
                                    className="w-full border px-3 py-2 rounded-md mt-2 bg-gray-100"
                                    placeholder="Pick your location on the map"
                                />
                            </>
                        )}
                    </div>
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
