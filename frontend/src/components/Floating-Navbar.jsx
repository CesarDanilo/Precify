import React, { useEffect, useState } from 'react';
import Logo from '../assets/logo.png';
import { FaFire, FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi'; // Ícone de sair

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
                const tentativasRestantes = parsedUser.tentativas || 0;
                setTentativas(tentativasRestantes);
            } catch (error) {
                console.error("Erro ao ler dados do usuário:", error);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload(); // Atualiza a página após logout
    };

    return (
        <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-6xl flex justify-between items-center px-6 py-3 rounded-full backdrop-blur bg-gray-900/70 border border-gray-700/30 shadow-lg z-50">
            {/* Logo */}
            <a href="/">
                <img src={Logo} alt="Logo do Validador" className="h-10 w-auto" />
            </a>

            {/* Navegação */}
            <nav className="space-x-4 hidden md:flex">
                <a href="/" className="hover:text-purple-400 transition">Plataforma</a>
                <a href="/produtos" className="hover:text-purple-400 transition">Buscar Produtos</a>
                <a href="/mais-pesquisados" className="hover:text-purple-400 transition">+Pesquisados</a>
                <a href="/favoritos" className="hover:text-purple-400 transition">Favoritos</a>
                <a href="/perfil" className="hover:text-purple-400 transition">Perfil</a>
            </nav>



            {/* Área da direita */}
            <div className="flex items-center space-x-3">
                {/* Fogo com tentativas */}
                <div className="relative">
                    <FaFire className="h-6 w-6 text-orange-400" />
                    {isLoggedIn && tentativas > 0 && (
                        <span className="absolute -top-1 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full border-2 border-gray-900">
                            {tentativas}
                        </span>
                    )}
                </div>
                
                {/* Botão Assine Agora */}
                <a href="/assinatura">
                    <button className="px-4 py-1 rounded-full border border-purple-700 text-purple-400 hover:bg-purple-700 hover:text-white transition">
                        Assine Agora
                    </button>
                </a>

                {/* Mostrar Login ou Perfil + Logout */}
                {!isLoggedIn ? (
                    <a href="/acessar">
                        <button className="px-4 py-1 rounded-full bg-purple-700 hover:bg-purple-800 transition shadow text-white">
                            Login
                        </button>
                    </a>
                ) : (
                    <div className="flex items-center space-x-2 gap-2">
                        <a href="/perfil" title="Perfil">
                            <FaUserCircle className="h-7 w-7 text-white hover:text-purple-400 transition" />
                        </a>
                        <button
                            title="Sair"
                            onClick={handleLogout}
                            className="text-white hover:text-red-400 transition"
                        >
                            <FiLogOut className="h-6 w-6" />
                        </button>
                    </div>
                )}


            </div>
        </header>
    );
}
