import SignatureCard from "../components/Signature-Cards";

export default function SubscriptionPage() {
    const plans = [
        {
            name: "Básico",
            price: "R$ 49/mês",
            features: [
                "Monitoramento básico de preços",
                "Alertas mensais",
                "Acesso limitado a relatórios"
            ],
            bgColor: "bg-gray-900/40"
        },
        {
            name: "Pro",
            price: "R$ 99/mês",
            features: [
                "Monitoramento avançado",
                "Alertas em tempo real",
                "Relatórios completos",
                "Suporte prioritário"
            ],
            bgColor: "bg-purple-700/70 border-purple-500/60"
        },
        {
            name: "Empresarial",
            price: "R$ 199/mês",
            features: [
                "Monitoramento ilimitado",
                "Alertas inteligentes",
                "Relatórios detalhados e customizados",
                "Suporte dedicado",
                "Integrações personalizadas"
            ],
            bgColor: "bg-gray-900/40"
        }
    ];

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-gray-200 px-4 py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-400 mb-4">Escolha seu Plano</h1>
            <p className="text-gray-400 max-w-2xl text-center mb-10">
                Comece hoje mesmo e maximize suas vendas com nosso Validador Inteligente!
            </p>

            <SignatureCard plans={plans} />
        </main>
    );
}
