import React, { useState } from "react";
import FloatingNavbar from "../components/Floating-Navbar";
import Logo from "../assets/logo.png"; // Assuming you might use this elsewhere, or for accessibility (alt text)

export default function ProductSearchPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);

    // Simulando uma lista de produtos
    // In a real application, this data would come from an API
    const mockProducts = [
        {
            id: 1,
            name: "Fone de Ouvido Sem Fio",
            price: 50.0,
            link: "https://example.com/fone-ouvido-a",
            image: "https://via.placeholder.com/150/800080/FFFFFF?text=FoneA", // Changed placeholder for better contrast
        },
        {
            id: 2,
            name: "Smartwatch Esportivo",
            price: 30.0,
            link: "https://example.com/smartwatch-b",
            image: "https://via.placeholder.com/150/FFD700/000000?text=WatchB", // Changed placeholder
        },
        {
            id: 3,
            name: "Câmera Compacta 4K",
            price: 70.0,
            link: "https://example.com/camera-c",
            image: "https://via.placeholder.com/150/4682B4/FFFFFF?text=CameraC", // Changed placeholder
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

    const handleSearch = (e) => {
        e.preventDefault();

        const filteredProducts = mockProducts
            .filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => a.price - b.price); // Sort by price ascending

        setProducts(filteredProducts);
    };

    const toggleFavorite = (productId) => {
        setFavorites((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId) // Remove if already in favorites
                : [...prev, productId] // Add if not in favorites
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black px-4 text-gray-100 relative pt-32 font-sans">
            {/* Minimalist Floating Navbar */}
            <FloatingNavbar />

            {/* Subtle Gradient Blur Effect */}
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

                {/* Product Cards */}
                <div className="w-full flex flex-col gap-4">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div
                                key={product.id}
                                className="flex items-center gap-4 backdrop-blur-sm bg-gray-900/60 border border-gray-700/30 rounded-xl shadow-lg p-4 relative hover:border-purple-600 transition-all duration-200"
                            >
                                <img
                                    src={product.image}
                                    alt={`Imagem do produto ${product.name}`}
                                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                                    loading="lazy" // Improve performance for images
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

                                {/* Favorite Button */}
                                <button
                                    onClick={() => toggleFavorite(product.id)}
                                    className="absolute top-3 right-3 text-2xl p-1 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
                                    aria-label={favorites.includes(product.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                                >
                                    <span
                                        className={`transition-colors duration-200 ${favorites.includes(product.id)
                                                ? "text-red-500"
                                                : "text-gray-500 hover:text-red-400"
                                            }`}
                                    >
                                        {favorites.includes(product.id) ? "❤️" : "🤍"}
                                    </span>
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-400 text-lg mt-8">
                            Digite algo para encontrar produtos incríveis!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}