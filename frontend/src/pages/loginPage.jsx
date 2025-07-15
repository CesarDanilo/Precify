import React, { useEffect, useState } from "react";
import FloatingNavbar from "../components/Floating-Navbar";
import Logo from "../assets/logo.png";
import { createUserAccount } from "../services/UserAccount/functionUserCreateAccount";
import { fetchPlanos } from "../services/UserAccount/functionFetchPlanos";
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [isRegister, setIsRegister] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [planos, setPlanos] = useState([]);
    const [senha2, setSenha2] = useState("");
    const [userData, setUserData] = useState({
        nome: "",
        email: "",
        plano_id: "",
        status: true,
        senha: "",
        tentativas_gratis_restantes: 3,
    });

    useEffect(() => {
        // Buscar planos apenas se for registro
        if (isRegister) {
            const fetchPlanosData = async () => {
                try {
                    const data = await fetchPlanos();
                    setPlanos(data);
                    console.log("BUSQUEI NO BANCO OS PLANOS: ", data);

                    const planoGratis = data.find(
                        (plano) =>
                            plano.nome?.toLowerCase().includes("grátis") ||
                            plano.nome?.toLowerCase().includes("gratis") ||
                            plano.is_free === true // caso exista um campo is_free
                    );

                    if (planoGratis) {
                        setUserData((prev) => ({
                            ...prev,
                            plano_id: planoGratis.id,
                        }));
                        console.log("PLANO GRÁTIS ENCONTRADO:", planoGratis);
                    } else {
                        console.warn("⚠️ Nenhum plano grátis encontrado!");
                    }
                } catch (err) {
                    console.error("Erro ao buscar planos:", err);
                }
            };

            fetchPlanosData();
        }
    }, [isRegister]);

    function handleSubmit(event) {
        event.preventDefault();
        if (isRegister) {
            if (userData.senha !== senha2) {
                alert("As senhas não coincidem!");
                return;
            }

            if (!userData.plano_id) {
                alert("Plano gratuito não identificado. Tente novamente mais tarde.");
                return;
            }

            createUserAccount(userData)
                .then((response) => {
                    console.log("Conta criada com sucesso:", response);
                    // Redirecionar ou mostrar mensagem de sucesso
                    navigate('/');
                })

                .catch((error) => {
                    if (error.type === 'validation') {
                        setErrors(error.errors); // <- Aqui você define os erros por campo
                    } else {
                        console.error("Erro ao criar conta:", error);
                        alert(`Erro ao criar conta. ${error.message}`);
                    }
                });
        } else {
            console.log("Login com dados:", userData);
            // Implementar lógica de login
        }
    }

    const topPadding = isRegister ? "pt-40" : "pt-32";

    return (
        <div
            className={`min-h-screen bg-gradient-to-b from-black via-gray-950 to-black flex items-center justify-center px-4 text-gray-100 relative ${topPadding}`}
        >
            <FloatingNavbar />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-60 bg-purple-700/10 blur-3xl rounded-full pointer-events-none"></div>

            <div className="w-full max-w-md p-8 rounded-xl backdrop-blur bg-gray-900/60 border border-gray-700/30 shadow-md">
                <div className="flex justify-center mb-6">
                    <img src={Logo} alt="Logo do Validador" className="h-20 w-auto" />
                </div>

                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    {isRegister && (
                        <div>
                            <label htmlFor="name" className="block text-sm text-gray-400 mb-1">
                                Nome
                            </label>
                            <input
                                id="name"
                                onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
                                type="text"
                                placeholder="Digite seu nome"
                                className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-100 placeholder-gray-500"
                            />
                            {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm text-gray-400 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            type="email"
                            placeholder="Digite seu email"
                            className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-100 placeholder-gray-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm text-gray-400 mb-1">
                            Senha
                        </label>
                        <input
                            id="password"
                            onChange={(e) => setUserData({ ...userData, senha: e.target.value })}
                            type="password"
                            placeholder="Digite sua senha"
                            className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-100 placeholder-gray-500"
                        />
                        {errors.senha && <p className="text-red-500 text-sm mt-1">{errors.senha}</p>}
                    </div>

                    {isRegister && (
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm text-gray-400 mb-1">
                                Confirmar Senha
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                onChange={(e) => setSenha2(e.target.value)}
                                placeholder="Confirme sua senha"
                                className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-100 placeholder-gray-500"
                            />
                            {errors.senha && <p className="text-red-500 text-sm mt-1">{errors.senha}</p>}
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
