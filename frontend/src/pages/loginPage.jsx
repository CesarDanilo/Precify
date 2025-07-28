import React, { useEffect, useState } from "react";
import FloatingNavbar from "../components/Floating-Navbar";
import Logo from "../assets/logo.png";
import { createUserAccount } from "../services/UserAccount/functionUserCreateAccount";
import { fetchPlanos } from "../services/UserAccount/functionFetchPlanos";
import { useNavigate } from 'react-router-dom';
import { Popup } from "../components/popup";
import { loginUser } from '../services/UserAccount/funcitonUserValidationAccount';
import { AnimatePresence, motion } from "framer-motion"; // For smooth animations

export default function LoginPage() {
    const [isRegister, setIsRegister] = useState(false);
    const [errors, setErrors] = useState({});
    const [planos, setPlanos] = useState([]);
    const [confirmPassword, setConfirmPassword] = useState(""); // Renamed senha2 for clarity
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState(""); // Message for the popup
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        nome: "",
        email: "",
        plano_id: "", // Will be set to the free plan's ID for registration
        status: true,
        senha: "",
        tentativas_gratis_restantes: 3, // Default for new free users
    });

    useEffect(() => {
        // Only fetch planos if in register mode and planos haven't been fetched yet
        if (isRegister && planos.length === 0) {
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
                        console.warn("⚠️ Nenhum plano grátis encontrado! Verifique a API de planos.");
                        // Potentially set an error here to prevent registration if no free plan
                    }
                } catch (err) {
                    console.error("Erro ao buscar planos:", err);
                    setErrors((prev) => ({ ...prev, fetchPlanos: "Não foi possível carregar os planos. Tente novamente mais tarde." }));
                }
            };

            fetchPlanosData();
        }
    }, [isRegister, planos.length]); // Added planos.length to dependency array

    function handleChange(field, value) {
        setUserData((prev) => ({ ...prev, [field]: value }));
        // Clear specific field error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: null }));
        }
        // Clear general login error if present
        if (errors.login) {
            setErrors((prev) => ({ ...prev, login: null }));
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setErrors({}); // Clear all errors at the start of submission

        if (isRegister) {
            const newErrors = {};
            // Basic validation for register form
            if (!userData.nome) newErrors.nome = "Seu nome é obrigatório.";
            if (!userData.email) {
                newErrors.email = "Email é obrigatório.";
            } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
                newErrors.email = "Email inválido.";
            }
            if (!userData.senha) {
                newErrors.senha = "Crie uma senha.";
            } else if (userData.senha.length < 6) {
                newErrors.senha = "A senha deve ter pelo menos 6 caracteres.";
            }
            if (userData.senha !== confirmPassword) {
                newErrors.confirmPassword = "As senhas não coincidem!";
            }
            if (!userData.plano_id) {
                newErrors.plano_id = "Não foi possível atribuir um plano gratuito. Tente novamente.";
            }

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }

            try {
                await createUserAccount(userData);
                setPopupMessage("Conta criada com sucesso! Redirecionando...");
                setShowPopup(true);
                // Clear form after successful registration
                setUserData({
                    nome: "",
                    email: "",
                    plano_id: "", // Reset plano_id as it will be fetched again on next register attempt
                    status: true,
                    senha: "",
                    tentativas_gratis_restantes: 3,
                });
                setConfirmPassword("");

                setTimeout(() => {
                    setShowPopup(false);
                    navigate('/'); // Navigate to home or dashboard after successful registration
                }, 2000); // Shorter timeout for better UX
            } catch (error) {
                console.error("Erro ao criar conta:", error);
                if (error.response && error.response.data && error.response.data.errors) {
                    setErrors(error.response.data.errors); // Assuming backend sends structured validation errors
                } else {
                    setErrors({ general: error.message || "Ocorreu um erro ao criar a conta. Tente novamente." });
                }
            }
        } else { // Login mode
            const newErrors = {};
            if (!userData.email) newErrors.email = "Email é obrigatório.";
            if (!userData.senha) newErrors.senha = "Senha é obrigatória.";

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }

            try {
                const res = await loginUser({
                    email: userData.email,
                    senha: userData.senha,
                });

                const { token, dados } = res;

                if (!token || !dados) {
                    setErrors({ login: "Credenciais inválidas. Verifique seu email e senha." });
                    return;
                }

                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(dados));

                setPopupMessage("Login realizado com sucesso! Redirecionando...");
                setShowPopup(true);

                setTimeout(() => {
                    setShowPopup(false);
                    navigate('/'); // Navigate to home or dashboard after successful login
                }, 1500);
            } catch (error) {
                console.error("Erro ao fazer login:", error);
                setErrors({ login: "Email ou senha incorretos." }); // Generic error for security
            }
        }
    }

    // Dynamic padding for the main container based on form type
    const topPaddingClass = isRegister ? "pt-28 md:pt-32" : "pt-28 md:pt-40";
    const formHeightClass = isRegister ? "h-auto" : "h-[450px]"; // Adjust height for login vs register

    return (
        <div className={`min-h-screen bg-gradient-to-b from-black via-gray-950 to-black flex items-center justify-center px-4 text-gray-100 relative ${topPaddingClass} pb-16`}>
            <FloatingNavbar />

            {/* Global background glow */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-80 bg-purple-700/10 blur-3xl rounded-full pointer-events-none animate-pulse-slow z-0" />

            {/* Popup notification */}
            <AnimatePresence>
                {showPopup && (
                    <Popup message={popupMessage} onClose={() => setShowPopup(false)} />
                )}
            </AnimatePresence>

            {/* Main form container */}
            <motion.div
                key={isRegister ? "register" : "login"} // Key for AnimatePresence transition
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`relative z-10 w-full max-w-md p-8 rounded-xl backdrop-blur-md bg-gray-900/60 border border-gray-700/30 shadow-2xl transition-all duration-500 ease-in-out ${formHeightClass} flex flex-col justify-center`}
            >
                <div className="flex justify-center mb-6">
                    <img src={Logo} alt="Logo Precify" className="h-24 w-auto drop-shadow-lg" />
                </div>

                <h2 className="text-3xl font-bold text-center text-purple-400 mb-6">
                    {isRegister ? "Crie Sua Conta Grátis" : "Acesse Sua Conta Precify"}
                </h2>

                <form className="flex flex-col space-y-5" onSubmit={handleSubmit} noValidate>
                    <AnimatePresence mode="wait">
                        {isRegister && (
                            <motion.div
                                key="name-field"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <InputField
                                    id="nome"
                                    label="Nome Completo"
                                    type="text"
                                    value={userData.nome}
                                    onChange={(e) => handleChange("nome", e.target.value)}
                                    error={errors.nome}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

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

                    <AnimatePresence mode="wait">
                        {isRegister && (
                            <motion.div
                                key="confirm-password-field"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <InputField
                                    id="confirmPassword"
                                    label="Confirmar Senha"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    error={errors.confirmPassword}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {errors.login && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400 text-sm mt-1 text-center"
                        >
                            {errors.login}
                        </motion.p>
                    )}
                    {errors.general && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400 text-sm mt-1 text-center"
                        >
                            {errors.general}
                        </motion.p>
                    )}
                    {errors.fetchPlanos && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400 text-sm mt-1 text-center"
                        >
                            {errors.fetchPlanos}
                        </motion.p>
                    )}


                    <button
                        type="submit"
                        className="px-6 py-3 bg-purple-700 rounded-full shadow-lg hover:bg-purple-800 transition transform hover:scale-105 active:scale-95 font-semibold text-white text-lg mt-6"
                    >
                        {isRegister ? "Criar Minha Conta Grátis" : "Entrar na Precify"}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-400 mt-6">
                    {isRegister ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
                    <button
                        type="button"
                        onClick={() => {
                            setIsRegister(!isRegister);
                            setErrors({}); // Clear errors on toggle
                            setUserData({ // Reset form data on toggle
                                nome: "",
                                email: "",
                                plano_id: "", // Will be re-fetched if registering
                                status: true,
                                senha: "",
                                tentativas_gratis_restantes: 3,
                            });
                            setConfirmPassword("");
                        }}
                        className="text-purple-400 font-bold hover:underline transition transform hover:scale-105"
                    >
                        {isRegister ? "Faça Login" : "Cadastre-se Agora"}
                    </button>
                </p>
            </motion.div>
        </div>
    );
}

// Reusable InputField Component (Enhanced)
function InputField({ id, label, type, value, onChange, error }) {
    return (
        <div className="relative"> {/* Added relative for potential absolute positioning of error messages */}
            <label htmlFor={id} className="block text-sm text-gray-400 mb-1 font-medium">{label}</label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={`Seu ${label.toLowerCase()} aqui`} // More direct placeholder
                className={`w-full px-4 py-2.5 rounded-lg bg-gray-800/50 border ${error ? "border-red-500 focus:ring-red-500" : "border-gray-700/30 focus:ring-purple-500/50"
                    } focus:outline-none focus:ring-2 transition-all duration-300 text-gray-100 placeholder-gray-500 text-base`}
            />
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="text-red-400 text-xs mt-1 absolute left-0 bottom-[-18px]" // Positioned relative to input field
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}