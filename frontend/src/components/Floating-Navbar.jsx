export default function FloatingNavbar() {
    return (
        <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-6xl flex justify-between items-center px-6 py-3 rounded-full backdrop-blur bg-gray-900/70 border border-gray-700/30 shadow-lg z-50">
            <div className="text-xl font-bold text-purple-400">Validador Inteligente</div>
            <nav className="space-x-4 hidden md:flex">
                <a href="#" className="hover:text-purple-400 transition">Plataforma</a>
                <a href="#" className="hover:text-purple-400 transition">Times</a>
                <a href="#" className="hover:text-purple-400 transition">Recursos</a>
                <a href="#" className="hover:text-purple-400 transition">Preços</a>
            </nav>
            <div className="space-x-2 flex items-center">
                <button className="px-4 py-1 rounded-full bg-purple-700 hover:bg-purple-800 transition shadow">Login</button>
                <button className="px-4 py-1 rounded-full border border-purple-700 hover:bg-purple-700 hover:text-white transition">Criar Conta</button>
            </div>
        </header>
    )
}
