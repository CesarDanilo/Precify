import React, { useEffect, useState } from "react";
import axios from "axios";
import FloatingNavbar from "../components/Floating-Navbar";
import Logo from "../assets/logo.png";

export default function UserProfilePage() {
    const [refresh, setRefresh] = useState(false);
    const [user, setUser] = useState({
        id: null,
        nome: "",
        email: "",
        cpfCnpj: "",
        telefone: "",
        endereco: "",
        plano: null,
    });

    // Carrega usuário do localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Erro ao ler usuário do localStorage:", error);
            }
        }
    }, [refresh]);

    // Atualiza campos do formulário
    const handleChange = (e) => {
        const { id, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [id]: value,
        }));
    };

    // Envia dados atualizados ao servidor
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user.id) {
            alert("ID do usuário não encontrado. Recarregue a página.");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const dataToSend = {};
            ["nome", "email", "cpfCnpj", "telefone", "endereco"].forEach((key) => {
                if (user[key]) dataToSend[key] = user[key];
            });

            const { data } = await axios.put(
                `http://localhost:4444/api/usuarios/updateUsers/${user.id}`,
                dataToSend,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const updatedUser = data.usuarioAtualizado || data;
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
            // alert("Informações atualizadas com sucesso!");
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error("Erro ao atualizar:", error.response?.data || error.message);
            alert("Erro ao atualizar. Verifique os dados ou tente novamente.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black flex flex-col text-gray-100 relative">
            <FloatingNavbar />

            <div className="flex-grow flex items-center justify-center px-4 py-16 mt-16">
                {/* Efeito de fundo */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-60 bg-purple-700/10 blur-3xl rounded-full pointer-events-none" />

                <div className="w-full max-w-5xl p-8 rounded-xl backdrop-blur bg-gray-900/60 border border-gray-700/30 shadow-md flex flex-col md:flex-row gap-10">
                    {/* Lado esquerdo: Perfil */}
                    <div className="flex flex-col items-center md:w-1/3 text-center">
                        <img src={Logo} alt="Logo do Validador" className="h-20 w-auto mb-4" />
                        <h1 className="text-2xl font-bold text-purple-400 mb-2">Perfil do Usuário</h1>

                        {user.plano ? (
                            <div className="mt-4 flex flex-col items-center gap-2">
                                <h2 className="text-sm text-gray-400">Plano Atual</h2>
                                <p className="text-purple-400 font-semibold">
                                    {user.plano.nome || "Plano não informado"}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Contratado em: {user.plano.contratadoEm || "Data indisponível"}
                                </p>
                                <a href="/assinatura">
                                    <button className="px-3 py-1 text-xs text-purple-400 border border-purple-400 rounded-full hover:bg-purple-700/20 transition">
                                        Alterar Plano
                                    </button>
                                </a>
                            </div>
                        ) : (
                            <p className="mt-4 text-sm text-gray-500">Nenhum plano ativo</p>
                        )}
                    </div>

                    {/* Lado direito: Formulário */}
                    <div className="flex-1">
                        <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
                            {[
                                { id: "nome", label: "Nome Completo", type: "text", required: true },
                                { id: "email", label: "Email", type: "email", required: true },
                                { id: "cpfCnpj", label: "CPF ou CNPJ", type: "text" },
                                { id: "telefone", label: "Telefone", type: "tel" },
                                { id: "endereco", label: "Endereço", type: "text" },
                            ].map(({ id, label, type, required }) => (
                                <div key={id}>
                                    <label htmlFor={id} className="block text-sm text-gray-400 mb-1">
                                        {label}
                                    </label>
                                    <input
                                        id={id}
                                        type={type}
                                        value={user[id] || ""}
                                        onChange={handleChange}
                                        placeholder={`Digite seu ${label.toLowerCase()}`}
                                        required={required}
                                        className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-100 placeholder-gray-500"
                                    />
                                </div>
                            ))}

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
