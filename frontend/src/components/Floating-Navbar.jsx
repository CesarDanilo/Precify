import Logo from '../assets/logo.png'

export default function FloatingNavbar() {
    return (
        <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-6xl flex justify-between items-center px-6 py-3 rounded-full backdrop-blur bg-gray-900/70 border border-gray-700/30 shadow-lg z-50">
            <a href='/'>
                <img src={Logo} alt="Logo do Validador" className="h-10 w-auto" />
            </a>
            <nav className="space-x-4 hidden md:flex">
                <a href="#" className="hover:text-purple-400 transition">Plataforma</a>
                <a href="#" className="hover:text-purple-400 transition">Recursos</a>
                <a href="#" className="hover:text-purple-400 transition">Perfil</a>
                {/* <a href="#" className="hover:text-purple-400 transition">Preços</a> */}
                {/* <a href="#" className="hover:text-purple-400 transition">Assinatura</a> */}
            </nav>
            <div className="space-x-2 flex items-center">
                <a href='/acessar'>
                    <button className="px-4 py-1 rounded-full bg-purple-700 hover:bg-purple-800 transition shadow text-white">
                        Login
                    </button>
                </a>
                {/* <button className="px-4 py-1 rounded-full border border-purple-700 text-purple-400 hover:bg-purple-700 hover:text-white transition">
                    Criar Conta
                </button> */}
                <a href='/assinatura'>
                    <button className="px-4 py-1 rounded-full border border-purple-700 text-purple-400 hover:bg-purple-700 hover:text-white transition">
                        Assine Agora
                    </button>
                </a>
            </div>
        </header>
    )
}
