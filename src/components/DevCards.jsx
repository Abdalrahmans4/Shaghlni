import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
const DevCards = () => {

    const [freelancers, setFreelancers] = useState([]);
    const navigate = useNavigate();
    const staticImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvhaD6JD5qPnYdxrrIysCDsjC2CUQW6oupxbdIZWE0zs3YfvMe7W2TNBzeXhX7hJJhcFM&usqp=CAU";



    const getFreelancersData = async (e) => {
        try {
            const response = await fetch("http://localhost:5000/api/freelancers", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                const data = await response.json();
                setFreelancers(data);
            } else {
                alert("Failed to fetch freelancer data.");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Error submitting form.");
        }
    };

    useEffect(() => {
        getFreelancersData();
    }, [getFreelancersData]);

    return (
        <section className="py-12 bg-[#0b3763]">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-white mb-10">Freelancers Cards</h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {freelancers.map((freelancer) => (
                        <div
                            key={freelancer._id}
                            className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            <img
                                src={staticImage}
                                alt="Freelancer"
                                className="w-full h-56 object-cover"
                            />
                            <div className="p-6 bg-gray-50">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{freelancer.name}</h3>
                                <p className="text-gray-700"><strong>Job Title:</strong> {freelancer.job_title}</p>
                                <p className="text-gray-700"><strong>Skills:</strong> {freelancer.skills}</p>
                                <p className="text-gray-700"><strong>Description:</strong> {freelancer.bio}</p>
                                <p className="text-gray-700"><strong>Availability:</strong> {freelancer.availability}</p>
                            </div>
                            <div className="bg-gray-100 px-6 py-4 text-center">
                                <a
                                    onClick={() => navigate(`/profile/${freelancer.id}`)}
                                    className="inline-block px-5 py-2 bg-[#0b3763] text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    View Profile
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>


    );
}

export default DevCards;
