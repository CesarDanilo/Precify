import Logo from '../assets/logo.png';
import { FaFire } from 'react-icons/fa';

export default function FloatingNavbar({ chances = 3 }) {
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
                <a href="/perfil" className="hover:text-purple-400 transition">Perfil</a>
                <a href="/favoritos" className="hover:text-purple-400 transition">Favoritos</a>
            </nav>

            {/* Área de botões com ícone e contador */}
            <div className="flex items-center space-x-3">
                {/* Ícone de fogo com badge */}
                <div className="relative">
                    <FaFire className="h-6 w-6 text-orange-400" />
                    {chances > 0 && (
                        <span className="absolute -top-1 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full border-2 border-gray-900">
                            {chances}
                        </span>
                    )}
                </div>

                {/* Botão Login */}
                <a href="/acessar">
                    <button className="px-4 py-1 rounded-full bg-purple-700 hover:bg-purple-800 transition shadow text-white">
                        Login
                    </button>
                </a>

                {/* Botão Assine Agora */}
                <a href="/assinatura">
                    <button className="px-4 py-1 rounded-full border border-purple-700 text-purple-400 hover:bg-purple-700 hover:text-white transition">
                        Assine Agora
                    </button>
                </a>
            </div>
        </header>
    );
}
