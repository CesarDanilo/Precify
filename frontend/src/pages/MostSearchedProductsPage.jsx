import React, { useMemo } from "react";
import FloatingNavbar from "../components/Floating-Navbar";
// Removed direct import of PlanUpgradePrompt as its content will be integrated here
// import PlanUpgradePrompt from "../components/PlanUpgradePrompt";

export default function MostSearchedProductsPage() {
    // Recupera o plano do localStorage
    const userPlan = useMemo(() => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            // Ensure the plan name is converted to lowercase for consistent comparison
            return user?.plano?.nome?.toLowerCase() || "gratis";
        } catch {
            return "gratis";
        }
    }, []);

    // Define a list of free plan names (in lowercase)
    const freePlans = ["gratis", "free"];

    // Verifica se o usuário tem acesso total
    // User has full access if their plan is NOT in the list of free plans
    const userHasFullAccess = !freePlans.includes(userPlan);

    const mostSearchedProducts = [
        {
            id: 1,
            name: "Smartphone XYZ",
            searches: 150,
            // Updated placeholder for better consistency/visuals
            image: "https://placehold.co/150x150/6d28d9/ffffff?text=Smartphone",
            link: "https://example.com/smartphone",
        },
        {
            id: 2,
            name: "Fone de Ouvido ABC",
            searches: 120,
            image: "https://placehold.co/150x150/6d28d9/ffffff?text=Headphones",
            link: "https://example.com/fone",
        },
        {
            id: 3,
            name: "Notebook Ultra",
            searches: 90,
            image: "https://placehold.co/150x150/6d28d9/ffffff?text=Notebook",
            link: "https://example.com/notebook",
        },
        {
            id: 4,
            name: "Monitor Gamer",
            searches: 70,
            image: "https://placehold.co/150x150/6d28d9/ffffff?text=Monitor",
            link: "https://example.com/monitor",
        },
        {
            id: 5,
            name: "Teclado Mecânico",
            searches: 50,
            image: "https://placehold.co/150x150/6d28d9/ffffff?text=Keyboard",
            link: "https://example.com/teclado",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black px-4 text-gray-100 relative pt-24 pb-16 overflow-hidden">
            <FloatingNavbar />

            {/* Global background glow for visual interest */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-700/10 blur-3xl rounded-full pointer-events-none animate-pulse-slow z-0"></div>

            <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10 py-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-10">
                    Descubra os Produtos em Alta
                </h1>

                {userHasFullAccess ? (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mostSearchedProducts.map((product, index) => (
                            <a
                                key={product.id}
                                href={product.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex gap-4 backdrop-blur-md bg-gray-900/50 border border-gray-700/30 rounded-xl shadow-lg p-4 hover:shadow-purple-700/20 transition transform hover:scale-[1.02] duration-300 group"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    // Added object-contain for better placeholder image fit
                                    className="w-28 h-28 object-contain rounded-lg border border-gray-700/40 p-1"
                                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/333333/ffffff?text=Imagem+N%C3%A3o+Dispon%C3%ADvel" }}
                                />
                                <div className="flex flex-col justify-between flex-1">
                                    <h2 className="text-xl font-semibold text-purple-300 group-hover:text-purple-400 transition-colors">
                                        {index + 1}. {product.name}
                                    </h2>
                                    <p className="text-gray-400 text-sm mt-1">
                                        🔎 <span className="font-bold text-purple-400">{product.searches}</span> buscas
                                    </p>
                                    <span className="text-sm text-purple-400 hover:underline transition font-medium mt-2 block">
                                        Ver Detalhes do Produto &rarr;
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>
                ) : (
                    // Restricted access message and call to action
                    <div className="relative z-10 w-full max-w-xl p-8 rounded-xl backdrop-blur-md bg-gray-900/60 border border-gray-700/30 shadow-2xl text-center mx-auto transition-all duration-500 ease-in-out">
                        <h2 className="text-2xl md:text-3xl font-bold text-purple-400 mb-4">
                            Desbloqueie Informações Valiosas!
                        </h2>
                        <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                            Seu plano atual oferece acesso limitado. Faça um upgrade para visualizar todos os **produtos mais pesquisados** e insights de mercado exclusivos.
                        </p>
                        <a href="/assinatura">
                            <button className="px-8 py-3 bg-purple-700 rounded-full shadow-lg hover:bg-purple-800 transition transform hover:scale-105 active:scale-95 font-semibold text-white text-lg">
                                Assine Precify Agora!
                            </button>
                        </a>
                        <p className="text-gray-500 text-xs mt-4">
                            Leve seu negócio para o próximo nível com a análise completa de mercado.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}