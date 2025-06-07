// src/pages/LoginPage.jsx
import React, { useState } from "react";
import FloatingNavbar from "../components/Floating-Navbar";
import Logo from "../assets/logo.png";

export default function LoginPage() {
    const [isRegister, setIsRegister] = useState(false);

    // Ajuste: padding-top diferente se for registro
    const topPadding = isRegister ? "pt-40" : "pt-32";

    return (
        <div
            className={`min-h-screen bg-gradient-to-b from-black via-gray-950 to-black flex items-center justify-center px-4 text-gray-100 relative ${topPadding}`}
        >
            <FloatingNavbar />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-60 bg-purple-700/10 blur-3xl rounded-full pointer-events-none"></div>

            <div className="w-full max-w-md p-8 rounded-xl backdrop-blur bg-gray-900/60 border border-gray-700/30 shadow-md">
                {/* Logo centralizada */}
                <div className="flex justify-center mb-6">
                    <img src={Logo} alt="Logo do Validador" className="h-20 w-auto" />
                </div>

                <form className="flex flex-col space-y-4">
                    {isRegister && (
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm text-gray-400 mb-1"
                            >
                                Nome
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Digite seu nome"
                                className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-100 placeholder-gray-500"
                            />
                        </div>
                    )}

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
                            placeholder="Digite seu email"
                            className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-100 placeholder-gray-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm text-gray-400 mb-1"
                        >
                            Senha
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Digite sua senha"
                            className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-100 placeholder-gray-500"
                        />
                    </div>

                    {isRegister && (
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm text-gray-400 mb-1"
                            >
                                Confirmar Senha
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirme sua senha"
                                className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-100 placeholder-gray-500"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="px-6 py-3 bg-purple-700 rounded-full shadow hover:bg-purple-800 transition font-semibold text-white"
                    >
                        {isRegister ? "Criar Conta" : "Entrar"}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-400 mt-4">
                    {isRegister ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
                    <button
                        type="button"
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-purple-400 font-semibold hover:underline transition"
                    >
                        {isRegister ? "Faça Login" : "Cadastre-se"}
                    </button>
                </p>
            </div>
        </div>
    );
}
