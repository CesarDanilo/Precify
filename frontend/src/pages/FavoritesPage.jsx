import React from "react";
import FloatingNavbar from "../components/Floating-Navbar";
import useFavorites from "../hooks/useFavorites"; // Assuming this hook manages favorite IDs

export default function FavoritesPage() {
    const { favorites, toggleFavorite } = useFavorites(); // Assuming toggleFavorite is also exported from useFavorites

    // Simulando a base de dados de produtos (em um cenário real, viria de uma API)
    const allProducts = [
        {
            id: 1,
            name: "Fone de Ouvido Sem Fio",
            price: 50.0,
            link: "https://example.com/fone-ouvido-a",
            image: "https://via.placeholder.com/150/800080/FFFFFF?text=FoneA",
        },
        {
            id: 2,
            name: "Smartwatch Esportivo",
            price: 30.0,
            link: "https://example.com/smartwatch-b",
            image: "https://via.placeholder.com/150/FFD700/000000?text=WatchB",
        },
        {
            id: 3,
            name: "Câmera Compacta 4K",
            price: 70.0,
            link: "https://example.com/camera-c",
            image: "https://via.placeholder.com/150/4682B4/FFFFFF?text=CameraC",
        },
        {
            id: 4,
            name: "Teclado Mecânico RGB",
            price: 95.0,
            link: "https://example.com/teclado-d",
            image: "https://via.placeholder.com/150/228B22/FFFFFF?text=TecladoD",
        },
        {
            id: 5,
            name: "Mouse Gamer Ergonômico",
            price: 45.0,
            link: "https://example.com/mouse-e",
            image: "https://via.placeholder.com/150/DC143C/FFFFFF?text=MouseE",
        },
    ];

    // Filtra apenas os produtos que estão na lista de favoritos
    const favoriteProducts = allProducts.filter((p) => favorites.includes(p.id));

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black px-4 text-gray-100 relative pt-32 font-sans">
            {/* Minimalist Floating Navbar */}
            <FloatingNavbar />

            {/* Subtle Gradient Blur Effect (consistent with search page) */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-60 bg-purple-700/10 blur-3xl rounded-full pointer-events-none"></div>

            <div className="max-w-3xl mx-auto w-full flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-8 text-purple-400 text-center">
                    Meus Produtos Favoritos ❤️
                </h1>

                <div className="w-full flex flex-col gap-4">
                    {favoriteProducts.length > 0 ? (
                        favoriteProducts.map((product) => (
                            <div
                                key={product.id}
                                className="flex items-center gap-4 backdrop-blur-sm bg-gray-900/60 border border-gray-700/30 rounded-xl shadow-lg p-4 relative hover:border-purple-600 transition-all duration-200"
                            >
                                <img
                                    src={product.image}
                                    alt={`Imagem do produto ${product.name}`}
                                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                                    loading="lazy"
                                />
                                <div className="flex flex-col justify-between flex-grow">
                                    <h2 className="text-lg font-semibold text-gray-50 mb-1">
                                        {product.name}
                                    </h2>
                                    <p className="text-purple-400 font-bold text-xl mb-2">
                                        R$ {product.price.toFixed(2)}
                                    </p>
                                    <a
                                        href={product.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-purple-300 hover:underline hover:text-purple-200 transition-colors"
                                        aria-label={`Ver ${product.name} no site externo`}
                                    >
                                        Ver no site &rarr;
                                    </a>
                                </div>

                                {/* Botão de Remover Favorito */}
                                <button
                                    onClick={() => toggleFavorite(product.id)}
                                    className="absolute top-3 right-3 text-2xl p-1 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
                                    aria-label="Remover dos favoritos"
                                >
                                    <span className="text-red-500 transition-colors duration-200 hover:text-red-400">
                                        ❤️
                                    </span>
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-400 text-lg mt-8 flex flex-col items-center gap-4">
                            <span className="text-5xl">🥺</span>
                            <p>Parece que você ainda não adicionou nenhum favorito.</p>
                            <p className="text-base text-gray-500">
                                Volte para a página de busca e encontre produtos incríveis!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}