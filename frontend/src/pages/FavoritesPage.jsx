import React from "react";
import FloatingNavbar from "../components/Floating-Navbar";
import useFavorites from "../hooks/useFavorites";

export default function FavoritesPage() {
    const { favorites } = useFavorites();

    // Simulando a base de dados de produtos (pode ser substituído por API)
    const allProducts = [
        {
            id: 1,
            name: "Produto A",
            price: 50.0,
            link: "https://example.com/produtoA",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 2,
            name: "Produto B",
            price: 30.0,
            link: "https://example.com/produtoB",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 3,
            name: "Produto C",
            price: 70.0,
            link: "https://example.com/produtoC",
            image: "https://via.placeholder.com/150",
        },
    ];

    const favoriteProducts = allProducts.filter((p) => favorites.includes(p.id));

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black px-4 text-gray-100 pt-32">
            <FloatingNavbar />

            <div className="max-w-3xl mx-auto w-full flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-6 text-purple-400">
                    Meus Favoritos ❤️
                </h1>

                <div className="w-full flex flex-col gap-4">
                    {favoriteProducts.length > 0 ? (
                        favoriteProducts.map((product) => (
                            <div
                                key={product.id}
                                className="flex gap-4 backdrop-blur bg-gray-900/60 border border-gray-700/30 rounded-xl shadow p-4"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                <div className="flex flex-col justify-between">
                                    <h2 className="text-lg font-semibold">{product.name}</h2>
                                    <p className="text-purple-400 font-bold">
                                        R$ {product.price.toFixed(2)}
                                    </p>
                                    <a
                                        href={product.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-purple-400 hover:underline transition"
                                    >
                                        Ver no site
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-400">Nenhum favorito ainda.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
