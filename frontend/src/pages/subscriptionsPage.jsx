import SignatureCard from "../components/Signature-Cards";
import PaymentFlags from "../components/PaymentFlags"; // Assuming this component shows trust signals

export default function SubscriptionPage() {
    const plans = [
        {
            name: "Grátis",
            price: "R$ 0/mês",
            features: [
                "Monitoramento de 1 produto",
                "Alertas semanais via e-mail",
                "Histórico de 30 dias",
                "Suporte básico"
            ],
            // bgColor: "bg-gray-900/40" // Minimalist, less emphasized
        },
        {
            name: "Pro Essencial", // Renamed for better perception
            price: "R$ 29/mês",
            features: [
                "Monitore até 50 produtos",
                "Alertas diários (e-mail & push)",
                "Relatórios completos e insights",
                "Histórico de 90 dias",
                "Suporte prioritário"
            ],
            bgColor: "bg-purple-700/70 border-purple-500/60" // Highlighted
        },
        {
            name: "Pro Ilimitado", // Renamed for ultimate perception
            price: "R$ 99/mês",
            features: [
                "Monitoramento ILIMITADO",
                "Alertas em tempo real (e-mail, push, SMS)",
                "Relatórios avançados e personalizados",
                "Histórico de preços VITALÍCIO",
                "Suporte 24/7 exclusivo",
                "Análise de concorrência profunda"
            ],
            // bgColor: "bg-purple-700/70 border-purple-500/60" // Highlighted
        }
    ];

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-gray-200 px-4 py-16 sm:py-24 relative overflow-hidden">
            {/* Subtle background glow for visual interest, similar to MainHomePage */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-700/10 blur-3xl rounded-full pointer-events-none animate-pulse-slow"></div>

            <section className="relative z-10 text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-6">
                    Pronto para Maximizar Seus Ganhos?
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    Escolha o plano que impulsiona suas vendas e garanta a melhor estratégia de preços com o **Precify**.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    *Todos os planos podem ser cancelados a qualquer momento.*
                </p>
            </section>

            <section className="relative z-10 w-full max-w-6xl mb-12">
                <SignatureCard plans={plans} />
            </section>

            {/* Payment Flags - Trust Signal */}
            <section className="relative z-10 mt-8">
                <PaymentFlags />
            </section>
        </main>
    );
}