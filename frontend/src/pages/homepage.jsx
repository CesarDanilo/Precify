// src/pages/Homepage.jsx
import React from 'react';
import FloatingNavbar from '../components/Floating-Navbar';
import MainHomePage from '../components/Main-HomePage';
import Footer from '../components/Footer';
const Homepage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-gray-100 flex flex-col relative">
            {/* Navbar flutuante estilo vidro */}
            <FloatingNavbar />
            {/* Hero */}
            <MainHomePage />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-60 bg-purple-700/10 blur-3xl rounded-full pointer-events-none"></div>
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Homepage;
