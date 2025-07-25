import React, { useEffect, useState } from "react";
import FloatingNavbar from "../components/Floating-Navbar";
import Logo from "../assets/logo.png";
import { createUserAccount } from "../services/UserAccount/functionUserCreateAccount";
import { fetchPlanos } from "../services/UserAccount/functionFetchPlanos";
import { useNavigate } from 'react-router-dom';
import { Popup } from "../components/popup";
import { loginUser } from '../services/UserAccount/funcitonUserValidationAccount';

export default function LoginPage() {
    const [isRegister, setIsRegister] = useState(false);
    const [errors, setErrors] = useState({});
    const [planos, setPlanos] = useState([]);
    const [senha2, setSenha2] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        nome: "",
        email: "",
        plano_id: "",
        status: true,
        senha: "",
        tentativas_gratis_restantes: 3,
    });

    useEffect(() => {
        if (isRegister) {
            const fetchPlanosData = async () => {
                try {
                    const data = await fetchPlanos();
                    setPlanos(data);

                    const planoGratis = data.find((plano) =>
                        plano.nome?.toLowerCase().includes("grátis") ||
                        plano.nome?.toLowerCase().includes("gratis") ||
                        plano.is_free === true
                    );

                    if (planoGratis) {
                        setUserData((prev) => ({ ...prev, plano_id: planoGratis.id }));
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

    function handleChange(field, value) {
        setUserData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: null }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setErrors({});

        if (isRegister) {
            const requiredFields = ["nome", "email", "senha"];
            const missingFields = requiredFields.filter(field => !userData[field]);

            if (missingFields.length > 0) {
                const fieldErrors = {};
                missingFields.forEach(field => {
                    fieldErrors[field] = "Campo obrigatório";
                });
                setErrors(fieldErrors);
                return;
            }

            if (userData.senha !== senha2) {
                setErrors({ confirmSenha: "As senhas não coincidem!" });
                return;
            }

            if (!userData.plano_id) {
                alert("Plano gratuito não identificado. Tente novamente mais tarde.");
                return;
            }

            try {
                await createUserAccount(userData);
                setShowPopup(true);
                setUserData({
                    nome: "",
                    email: "",
                    plano_id: "",
                    status: true,
                    senha: "",
                    tentativas_gratis_restantes: 3,
                });
                setSenha2("");

                setTimeout(() => {
                    setShowPopup(false);
                    navigate('/');
                }, 2500);
            } catch (error) {
                if (error.type === 'validation') {
                    setErrors(error.errors);
                } else {
                    console.error("Erro ao criar conta:", error);
                    alert(`Erro ao criar conta. ${error.message}`);
                }
            }
        } else {
            try {
                const res = await loginUser({
                    email: userData.email,
                    senha: userData.senha,
                });

                const { token, dados } = res;

                if (!token || !dados) {
                    setErrors({ login: "Credenciais inválidas." });
                    return;
                }

                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(dados));

                setShowPopup(true);

                setTimeout(() => {
                    setShowPopup(false);
                    navigate('/');
                }, 1500);
            } catch (error) {
                console.error("Erro ao fazer login:", error);
                setErrors({ login: "Email ou senha incorretos." });
            }
        }
    }

    const topPadding = isRegister ? "pt-40" : "pt-32";

    return (
        <div className={`min-h-screen bg-gradient-to-b from-black via-gray-950 to-black flex items-center justify-center px-4 text-gray-100 relative ${topPadding}`}>
            <FloatingNavbar />
            {showPopup && <Popup message="Conta criada com sucesso!" />}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-60 bg-purple-700/10 blur-3xl rounded-full pointer-events-none" />

            <div className="w-full max-w-md p-8 rounded-xl backdrop-blur bg-gray-900/60 border border-gray-700/30 shadow-md">
                <div className="flex justify-center mb-6">
                    <img src={Logo} alt="Logo do Validador" className="h-20 w-auto" />
                </div>

                <form className="flex flex-col space-y-4" onSubmit={handleSubmit} noValidate>
                    {isRegister && (
                        <InputField
                            id="name"
                            label="Nome"
                            type="text"
                            value={userData.nome}
                            onChange={(e) => handleChange("nome", e.target.value)}
                            error={errors.nome}
                        />
                    )}

                    <InputField
                        id="email"
                        label="Email"
                        type="email"
                        value={userData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        error={errors.email}
                    />

                    <InputField
                        id="password"
                        label="Senha"
                        type="password"
                        value={userData.senha}
                        onChange={(e) => handleChange("senha", e.target.value)}
                        error={errors.senha}
                    />

                    {isRegister && (
                        <InputField
                            id="confirmPassword"
                            label="Confirmar Senha"
                            type="password"
                            value={senha2}
                            onChange={(e) => setSenha2(e.target.value)}
                            error={errors.confirmSenha}
                        />
                    )}

                    {errors.login && (
                        <p className="text-red-500 text-sm mt-1 text-center">{errors.login}</p>
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
                        onClick={() => {
                            setIsRegister(!isRegister);
                            setErrors({});
                            setUserData({
                                nome: "",
                                email: "",
                                plano_id: "",
                                status: true,
                                senha: "",
                                tentativas_gratis_restantes: 3,
                            });
                            setSenha2("");
                        }}
                        className="text-purple-400 font-semibold hover:underline transition"
                    >
                        {isRegister ? "Faça Login" : "Cadastre-se"}
                    </button>
                </p>
            </div>
        </div>
    );
}

// Componente reutilizável de input
function InputField({ id, label, type, value, onChange, error }) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm text-gray-400 mb-1">{label}</label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={`Digite seu ${label.toLowerCase()}`}
                className={`w-full px-4 py-2 rounded-lg bg-gray-800/50 border ${error ? "border-red-500" : "border-gray-700/30"
                    } focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-100 placeholder-gray-500`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
