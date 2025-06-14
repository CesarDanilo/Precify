import React from "react";
import { useNavigate } from "react-router-dom";

export default function PlanUpgradePrompt() {
    const navigate = useNavigate();

    const handleGoToPlans = () => {
        navigate("/assinatura"); // Redireciona para sua página de planos
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60">
            <div className="max-w-md w-full bg-gray-900/80 border border-purple-700/30 rounded-xl shadow-xl p-6 flex flex-col items-center text-center">
                {/* Ilustração Exemplo */}
                <img
                    src="https://cdn-icons-png.flaticon.com/512/1828/1828665.png"
                    alt="Acesso Restrito"
                    className="w-24 h-24 mb-4 opacity-90"
                />

                <h2 className="text-2xl font-bold text-purple-400 mb-2">Acesso Restrito</h2>
                <p className="text-gray-400 mb-4">
                    Este recurso está disponível apenas para usuários com um plano ativo.
                </p>

                <button
                    onClick={handleGoToPlans}
                    className="px-6 py-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-full transition shadow"
                >
                    Ver Planos
                </button>
            </div>
        </div>
    );
}
