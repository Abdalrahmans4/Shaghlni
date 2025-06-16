import React, { Profiler } from "react";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "../src/pages/Home";
import UserProfileData from "./components/UserProfileData";

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<UserProfileData />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
