import React, { useState } from "react";
import FloatingNavbar from "../components/Floating-Navbar";
import Logo from "../assets/logo.png";

export default function ProductSearchPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);

    // Simulando uma lista de produtos
    const mockProducts = [
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

    const handleSearch = (e) => {
        e.preventDefault();

        const filteredProducts = mockProducts
            .filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => a.price - b.price);

        setProducts(filteredProducts);
    };

    const toggleFavorite = (productId) => {
        setFavorites((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId)
                : [...prev, productId]
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black px-4 text-gray-100 relative pt-32">
            <FloatingNavbar />

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-60 bg-purple-700/10 blur-3xl rounded-full pointer-events-none"></div>

            <div className="max-w-3xl mx-auto w-full flex flex-col items-center">
                {/* Barra de pesquisa */}
                <form
                    onSubmit={handleSearch}
                    className="w-full flex items-center gap-2 mb-8 backdrop-blur bg-gray-900/60 border border-gray-700/30 rounded-full px-4 py-2 shadow-md"
                >
                    <input
                        type="text"
                        placeholder="Pesquisar produto..."
                        className="flex-1 bg-transparent focus:outline-none text-gray-100 placeholder-gray-500 px-2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-purple-700 hover:bg-purple-800 transition text-white font-semibold px-4 py-2 rounded-full"
                    >
                        Buscar
                    </button>
                </form>

                {/* Cards dos produtos */}
                <div className="w-full flex flex-col gap-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="flex gap-4 backdrop-blur bg-gray-900/60 border border-gray-700/30 rounded-xl shadow p-4 relative"
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

                            {/* Botão de Favoritar */}
                            <button
                                onClick={() => toggleFavorite(product.id)}
                                className="absolute top-2 right-2 text-xl"
                            >
                                <span
                                    className={`transition ${favorites.includes(product.id)
                                            ? "text-red-500"
                                            : "text-gray-500"
                                        }`}
                                >
                                    {favorites.includes(product.id) ? "❤️" : "🤍"}
                                </span>
                            </button>
                        </div>
                    ))}
                    {products.length === 0 && (
                        <p className="text-center text-gray-400">
                            Nenhum produto encontrado.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
