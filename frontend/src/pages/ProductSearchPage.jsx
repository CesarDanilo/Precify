import React, { useState } from "react";
import FloatingNavbar from "../components/Floating-Navbar";
import Logo from "../assets/logo.png";
import fetchAmazon from "../util/fetchAmazonapi.util";

export default function ProductSearchPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { data } = await fetchAmazon(searchTerm);
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
    };

    const toggleFavorite = (productId) => {
        setFavorites((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId)
                : [...prev, productId]
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black px-4 text-gray-100 relative pt-32 font-sans">
            <FloatingNavbar />

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-60 bg-purple-700/10 blur-3xl rounded-full pointer-events-none"></div>

            <div className="max-w-3xl mx-auto w-full flex flex-col items-center">
                {/* Search Bar */}
                <form
                    onSubmit={handleSearch}
                    className="w-full flex items-center gap-2 mb-8 backdrop-blur-sm bg-gray-900/60 border border-gray-700/30 rounded-full px-4 py-2 shadow-lg focus-within:ring-2 focus-within:ring-purple-600 transition-all duration-300"
                >
                    <input
                        type="text"
                        placeholder="Pesquisar produtos (ex: Fone, Smartwatch)..."
                        className="flex-1 bg-transparent focus:outline-none text-gray-100 placeholder-gray-500 px-2 py-1"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-label="Campo de pesquisa de produtos"
                    />
                    <button
                        type="submit"
                        className="bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all text-white font-medium px-5 py-2 rounded-full text-sm"
                        aria-label="Botão buscar"
                    >
                        Buscar
                    </button>
                </form>

                {loading && (
                    <div className="flex items-center justify-center gap-2 text-purple-300 text-sm mb-4">
                        <svg
                            className="w-4 h-4 animate-spin text-purple-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                        </svg>
                        <p>Carregando...</p>
                    </div>

                )}

                {/* Product Cards */}
                <div className="w-full flex flex-col gap-4">
                    {!loading && products.length > 0 ? (
                        products.map((product) => (
                            <div
                                key={product.nome}
                                className="flex items-center gap-4 backdrop-blur-sm bg-gray-900/60 border border-gray-700/30 rounded-xl shadow-lg p-4 relative hover:border-purple-600 transition-all duration-200"
                            >
                                <img
                                    src={product.imagem}
                                    alt={`Imagem do produto ${product.nome}`}
                                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                                    loading="lazy"
                                />
                                <div className="flex flex-col justify-between flex-grow">
                                    <h2 className="text-lg font-semibold text-gray-50 mb-1">
                                        {product.nome}
                                    </h2>
                                    <p className="text-purple-400 font-bold text-xl mb-2">
                                        {product.preco
                                            ? `R$ ${product.preco.replace(/,+/g, ",").replace(/[^\d,]/g, "")}`
                                            : "Preço indisponível"}
                                    </p>
                                    <a
                                        href={product.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-purple-300 hover:underline hover:text-purple-200 transition-colors"
                                        aria-label={`Ver ${product.nome} no site externo`}
                                    >
                                        Ver no site &rarr;
                                    </a>
                                </div>

                                {/* Favorite Button */}
                                <button
                                    onClick={() => toggleFavorite(product.nome)}
                                    className="absolute top-3 right-3 text-2xl p-1 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
                                    aria-label={
                                        favorites.includes(product.nome)
                                            ? "Remover dos favoritos"
                                            : "Adicionar aos favoritos"
                                    }
                                >
                                    <span
                                        className={`transition-colors duration-200 ${favorites.includes(product.nome)
                                            ? "text-red-500"
                                            : "text-gray-500 hover:text-red-400"
                                            }`}
                                    >
                                        {favorites.includes(product.nome) ? "❤️" : "🤍"}
                                    </span>
                                </button>
                            </div>
                        ))
                    ) : (
                        !loading && (
                            <p className="text-center text-gray-400 text-lg mt-8">
                                Digite algo para encontrar produtos incríveis!
                            </p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
