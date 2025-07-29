// src/pages/Homepage.jsx
import React from 'react';
import FloatingNavbar from '../components/Floating-Navbar';
import MainHomePage from '../components/Main-HomePage';
import Footer from '../components/Footer';
import PaymentFlags from '../components/PaymentFlags';

const Homepage = () => {
    return (
        // O container principal define o fundo limpo e a fonte para toda a página
        // `min-h-screen` garante que o gradiente cubra toda a altura da viewport
        // `overflow-hidden` é adicionado para evitar scrollbar caso o blur "escape" da tela
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-gray-100 flex flex-col relative font-inter overflow-hidden">
            {/* Navbar flutuante. Assumimos que ela já tem os estilos glassmorphism (blur, transparência). */}
            <FloatingNavbar />

            {/* Componente principal da página inicial (Hero section, etc.). */}
            {/* Certifique-se de que os elementos internos aqui também usam glassmorphism quando apropriado. */}
            <MainHomePage />

            {/* Glow de fundo: uma área com blur para intensificar o efeito glassmorphism nos elementos acima dela. */}
            {/* Posicionado absolutamente para flutuar sobre o fundo principal. */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-60 bg-purple-700/10 blur-3xl rounded-full pointer-events-none z-0"></div>

            {/* Footer da página. */}
            {/* Considere aplicar estilos glassmorphism também para manter a consistência. */}
            <Footer />

            {/* Componente de bandeiras de pagamento. */}
            {/* Idealmente, este componente também deve seguir a estética glassmorphism ou ser bem clean. */}
            <PaymentFlags />
        </div>
    );
};

export default Homepage;