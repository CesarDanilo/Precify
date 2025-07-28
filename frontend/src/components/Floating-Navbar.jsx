import React, { useEffect, useState } from 'react';
import Logo from '../assets/logo.png'; // Assuming this is your Precify logo
import { FaFire, FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

export default function FloatingNavbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [tentativas, setTentativas] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (token && user) {
            setIsLoggedIn(true);
            try {
                const parsedUser = JSON.parse(user);
                // Ensure 'tentativas' is a number, default to 0 if null/undefined
                const tentativasRestantes = Number(parsedUser.tentativas) || 0;
                setTentativas(tentativasRestantes);
            } catch (error) {
                console.error("Erro ao ler dados do usuário:", error);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        // Use window.location.href to navigate to the home page after logout,
        // which will also trigger a full page reload.
        window.location.href = '/';
    };

    return (
        <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-6xl flex justify-between items-center px-6 py-3 rounded-full backdrop-blur-lg bg-gray-900/70 border border-gray-700/30 shadow-xl z-50 transition-all duration-300 ease-in-out">
            {/* Logo and Brand Name */}
            <a href="/" className="flex items-center space-x-2 group">
                <img src={Logo} alt="Logo Precify" className="h-9 w-auto filter grayscale group-hover:grayscale-0 transition-all duration-300" />
                <span className="text-white text-2xl font-bold tracking-tight group-hover:text-purple-400 transition-colors duration-300">Precify</span>
            </a>

            {/* Navigation - More concise links */}
            <nav className="space-x-6 hidden md:flex text-lg font-medium">
                <a href="/" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">Início</a>
                <a href="/produtos" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">Buscar</a>
                <a href="/mais-pesquisados" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">Top Produtos</a>
                <a href="/favoritos" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">Meus Favoritos</a>
            </nav>

            {/* Right-hand side - Consolidated and clear */}
            <div className="flex items-center space-x-4">
                {/* Free Plan "Tentativas" Indicator */}
                {isLoggedIn && tentativas > 0 && ( // Only show if logged in AND has attempts
                    <div className="relative flex items-center bg-gray-800/50 rounded-full px-3 py-1 text-sm text-orange-300 border border-orange-600/50 shadow-inner group cursor-default">
                        <FaFire className="h-4 w-4 text-orange-400 mr-1 animate-pulse" />
                        <span className="font-semibold">{tentativas}</span>
                        <span className="ml-1 text-gray-400">Tentativas</span>
                        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-700 text-xs text-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                            Pesquisas gratuitas restantes
                        </div>
                    </div>
                )}

                {/* "Assine Agora" or "Minha Assinatura" Button - Smart Contextualization */}
                {isLoggedIn ? (
                    <a href="/assinatura" className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-md hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
                        Minha Assinatura
                    </a>
                ) : (
                    <a href="/assinatura" className="px-5 py-2 rounded-full border border-purple-600 text-purple-400 font-semibold hover:bg-purple-700 hover:text-white transition-all duration-300 transform hover:scale-105">
                        Assine Agora
                    </a>
                )}

                {/* User/Auth Actions */}
                {!isLoggedIn ? (
                    <a href="/acessar" className="hidden md:block px-5 py-2 rounded-full bg-purple-700 hover:bg-purple-800 transition shadow text-white font-semibold transform hover:scale-105">
                        Entrar
                    </a>
                ) : (
                    <div className="flex items-center space-x-2 md:space-x-3">
                        <a href="/perfil" title="Ir para o Perfil" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
                            <FaUserCircle className="h-7 w-7" />
                        </a>
                        <button
                            title="Sair da conta"
                            onClick={handleLogout}
                            className="text-gray-300 hover:text-red-500 transition-colors duration-300"
                        >
                            <FiLogOut className="h-6 w-6" />
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}