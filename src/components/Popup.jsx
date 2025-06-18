import React, { useState, useEffect, useRef } from "react";

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

    ////////////newmap///////////////
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    // Load Google Maps script dynamically
    useEffect(() => {
        if (!openPopUp) return;
        if (window.google) {
            initMap();
            return;
        }
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDax8621aNYSLDSZbaE9jTfW3EKf-ZOObQ`;
        script.async = true;
        script.onload = initMap;
        document.body.appendChild(script);
        // eslint-disable-next-line
    }, [openPopUp]);

    const initMap = () => {
        if (!mapRef.current) return;
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
        // Update formData when marker is moved
        markerRef.current.addListener("dragend", (event) => {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            setFormData((prev) => ({
                ...prev,
                location: `${lat},${lng}`,
            }));
        });
    };
    //////////////////
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
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-2"
        >
            <div className="bg-white w-full max-w-3xl rounded-lg p-4 sm:p-6 shadow-lg relative max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4">
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

                    {/* Location Picker */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">Location</label>
                        <div
                            ref={mapRef}
                            className="w-full h-64 rounded-lg" 
                        ></div>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            readOnly
                            className="w-full border px-3 py-2 rounded-md mt-2 bg-gray-100"
                            placeholder="Pick your location on the map"
                        />
                    </div>


                    {/* Experience */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Experience</label>
                        <input
                            type="number"
                            name="experience"
                            onChange={handleChange}
                            placeholder="Years of experience "
                            required
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
                        className={`px-4 py-2 text-white rounded ${isFormValid
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-gray-400 cursor-not-allowed"
                            }`}
                        disabled={!isFormValid}
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
