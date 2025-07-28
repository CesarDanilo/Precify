import React from "react";
import FloatingNavbar from "../components/Floating-Navbar";
import PlanUpgradePrompt from "../components/PlanUpgradePrompt";

// Simulação do plano do usuário
const userPlan = "pro"; // Altere para "pro", "premium", etc., se for o caso
const userHasFullAccess = userPlan !== "gratis";

export default function MostSearchedProductsPage() {
    const mostSearchedProducts = [
        {
            id: 1,
            name: "Smartphone XYZ",
            searches: 150,
            image: "https://via.placeholder.com/150",
            link: "https://example.com/smartphone",
        },
        {
            id: 2,
            name: "Fone de Ouvido ABC",
            searches: 120,
            image: "https://via.placeholder.com/150",
            link: "https://example.com/fone",
        },
        {
            id: 3,
            name: "Notebook Ultra",
            searches: 90,
            image: "https://via.placeholder.com/150",
            link: "https://example.com/notebook",
        },
        {
            id: 4,
            name: "Monitor Gamer",
            searches: 70,
            image: "https://via.placeholder.com/150",
            link: "https://example.com/monitor",
        },
        {
            id: 5,
            name: "Teclado Mecânico",
            searches: 50,
            image: "https://via.placeholder.com/150",
            link: "https://example.com/teclado",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black px-4 text-gray-100 relative pt-32">
            <FloatingNavbar />

            {/* Se não tiver acesso completo, mostrar o overlay de upgrade */}
            {!userHasFullAccess && <PlanUpgradePrompt />}

            {/* Efeito de fundo */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-60 bg-purple-700/10 blur-3xl rounded-full pointer-events-none"></div>

            <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
                <h1 className="text-3xl md:text-4xl font-bold text-purple-400 mb-6">
                    Produtos Mais Pesquisados
                </h1>

                {userHasFullAccess ? (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mostSearchedProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="flex gap-4 backdrop-blur bg-gray-900/60 border border-gray-700/30 rounded-xl shadow p-4 hover:shadow-purple-700/20 transition"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                <div className="flex flex-col justify-between">
                                    <h2 className="text-lg font-semibold">
                                        {index + 1}. {product.name}
                                    </h2>
                                    <p className="text-purple-400 text-sm">
                                        🔎 {product.searches} buscas
                                    </p>
                                    <a
                                        href={product.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-purple-400 hover:underline transition"
                                    >
                                        Ver Produto
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 text-sm mt-6">
                        Faça upgrade do seu plano para visualizar os produtos mais pesquisados.
                    </p>
                )}
            </div>
        </div>
    );
}
