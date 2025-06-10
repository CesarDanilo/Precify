// src/pages/UserProfilePage.jsx
import React from "react";
import FloatingNavbar from "../components/Floating-Navbar";
import Logo from "../assets/logo.png";

export default function UserProfilePage() {
    // Exemplo de dados do usuário (mock)
    const user = {
        name: "João da Silva",
        email: "joao@email.com",
        cpfCnpj: "123.456.789-00",
        phone: "(11) 98765-4321",
        address: "Rua das Flores, 123 - São Paulo, SP",
        plano: {
            nome: "Premium",
            contratadoEm: "15/04/2024",
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black flex flex-col text-gray-100 relative">
            <FloatingNavbar />

            <div className="flex-grow flex items-center justify-center px-4 py-16 mt-16">
                {/* Efeito de fundo */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-60 bg-purple-700/10 blur-3xl rounded-full pointer-events-none"></div>

                <div className="w-full max-w-5xl p-8 rounded-xl backdrop-blur bg-gray-900/60 border border-gray-700/30 shadow-md flex flex-col md:flex-row gap-10">
                    {/* Lado esquerdo: informações básicas e logo */}
                    <div className="flex flex-col items-center md:w-1/3 text-center">
                        <img
                            src={Logo}
                            alt="Logo do Validador"
                            className="h-20 w-auto mb-4"
                        />
                        <h1 className="text-2xl font-bold text-purple-400 mb-2">
                            Perfil do Usuário
                        </h1>

                        {user.plano ? (
                            <div className="mt-4 flex flex-col items-center gap-2">
                                <div>
                                    <h2 className="text-sm text-gray-400">Plano Atual</h2>
                                    <p className="text-purple-400 font-semibold">
                                        {user.plano.nome}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Contratado em {user.plano.contratadoEm}
                                    </p>
                                </div>
                                <a href="/assinatura">
                                    <button
                                        type="button"
                                        className="px-3 py-1 text-xs text-purple-400 border border-purple-400 rounded-full hover:bg-purple-700/20 transition"
                                    >
                                        Alterar Plano
                                    </button>
                                </a>
                            </div>
                        ) : (
                            <p className="mt-4 text-sm text-gray-500">Nenhum plano ativo</p>
                        )}
                    </div>

                    {/* Lado direito: formulário de informações */}
                    <div className="flex-1">
                        <form className="flex flex-col space-y-5">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm text-gray-400 mb-1"
                                >
                                    Nome Completo
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    defaultValue={user.name}
                                    placeholder="Digite seu nome completo"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-100 placeholder-gray-500"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm text-gray-400 mb-1"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    defaultValue={user.email}
                                    placeholder="Digite seu email"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-100 placeholder-gray-500"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="cpfCnpj"
                                    className="block text-sm text-gray-400 mb-1"
                                >
                                    CPF ou CNPJ
                                </label>
                                <input
                                    id="cpfCnpj"
                                    type="text"
                                    defaultValue={user.cpfCnpj}
                                    placeholder="Digite seu CPF ou CNPJ"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-100 placeholder-gray-500"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm text-gray-400 mb-1"
                                >
                                    Telefone
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    defaultValue={user.phone}
                                    placeholder="Digite seu telefone"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-100 placeholder-gray-500"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="address"
                                    className="block text-sm text-gray-400 mb-1"
                                >
                                    Endereço
                                </label>
                                <input
                                    id="address"
                                    type="text"
                                    defaultValue={user.address}
                                    placeholder="Digite seu endereço"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-100 placeholder-gray-500"
                                />
                            </div>

                            <button
                                type="submit"
                                className="px-6 py-3 bg-purple-700 rounded-full shadow hover:bg-purple-800 transition font-semibold text-white"
                            >
                                Salvar Alterações
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
