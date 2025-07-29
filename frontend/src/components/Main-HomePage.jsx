import SignatureCard from "../components/Signature-Cards"; // Assuming SignatureCard is correctly styled for full height alignment

export default function MainHomePage() {
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
            price: "R$ 9,90/mês",
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
            price: "R$ 19,90/mês",
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
        // Main container adjusted for full height and vertical centering of content sections
        <div className="min-h-screen flex flex-col items-center pt-24 pb-16 bg-gradient-to-b from-black via-gray-950 to-black text-gray-100 relative overflow-hidden">

            {/* Subtle background glow for visual interest */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-96 md:h-96 bg-purple-700/10 blur-3xl rounded-full pointer-events-none animate-pulse-slow"></div>

            {/* Hero Section - Clean, focused on value */}
            <section className="relative z-10 flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto mb-20">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg">
                    Domine Seu Mercado. Otimize Seus Preços.
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
                    Com o <strong className="text-purple-400 font-bold">Precify</strong>, você não apenas vende, você <strong className="text-purple-400 font-bold">conquista</strong>.
                    Análise em tempo real, alertas precisos e decisões que <strong className="text-purple-400 font-bold">impulsionam seu lucro</strong>.
                </p>
                <button className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:bg-purple-700 transition transform hover:scale-105 active:scale-95 text-lg">
                    Comece a Vencer Agora!
                </button>
            </section>

            {/* "Why Use It" Section - Short, punchy, problem/solution */}
            <section className="relative z-10 w-full max-w-3xl p-6 rounded-xl backdrop-blur-md bg-gray-900/60 border border-gray-700/30 shadow-2xl text-left mx-auto mb-20">
                <h2 className="text-3xl font-bold text-purple-400 mb-5 text-center">
                    Pare de Chutar Preços. **Comece a Vender Mais.**
                </h2>
                <div className="space-y-4 text-gray-300 text-lg">
                    <p>
                        📈 Nosso SaaS **elimina as incertezas**. Analise a concorrência, receba alertas de oportunidades e **descubra o preço ideal** para cada produto. Com dados em mãos, você **define estratégias vencedoras**.
                    </p>
                    <p>
                        ⏰ **Poupe horas** de pesquisa manual. Deixe o Validador fazer o trabalho pesado enquanto você foca no que realmente importa: **escalar seu negócio** e **maximizar lucros**.
                    </p>
                    <p className="text-purple-300 font-medium mt-6">
                        ✨ Curioso? **Explore o potencial** do Validador no nosso painel abaixo:
                    </p>
                </div>
            </section>

            {/* Simulated Dashboard - Visually appealing, hints at value */}
            <div className="relative z-10 w-full max-w-4xl p-8 rounded-2xl backdrop-blur-lg bg-gray-800/50 border border-gray-600/50 shadow-2xl text-center mx-auto mb-20">
                <h2 className="text-2xl font-bold mb-6 text-purple-300">Seu Dashboard, Seus Ganhos</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-5 bg-gray-900/40 rounded-xl border border-gray-700/40 shadow-inner hover:shadow-purple-500/20 transition-all duration-300">
                        <h3 className="text-purple-300 font-semibold text-xl mb-2">Análise Inteligente</h3>
                        <p className="text-gray-400 text-sm">Identifique as melhores margens e evite perdas.</p>
                    </div>
                    <div className="p-5 bg-gray-900/40 rounded-xl border border-gray-700/40 shadow-inner hover:shadow-purple-500/20 transition-all duration-300">
                        <h3 className="text-purple-300 font-semibold text-xl mb-2">Alertas Estratégicos</h3>
                        <p className="text-gray-400 text-sm">Receba avisos instantâneos para agir rápido.</p>
                    </div>
                    <div className="p-5 bg-gray-900/40 rounded-xl border border-gray-700/40 shadow-inner hover:shadow-purple-500/20 transition-all duration-300">
                        <h3 className="text-purple-300 font-semibold text-xl mb-2">Relatórios Acionáveis</h3>
                        <p className="text-gray-400 text-sm">Tome decisões com dados claros e confiáveis.</p>
                    </div>
                </div>
            </div>

            {/* Plan Selection Section - Emphasized and persuasive */}
            <section className="relative z-10 flex flex-col items-center justify-center py-16 px-4 w-full">
                <h2 className="text-4xl md:text-5xl font-bold text-purple-400 mb-6 drop-shadow-md">Escolha a Assinatura Certa Para Você</h2>
                <p className="text-xl text-gray-300 max-w-2xl text-center mb-12 leading-relaxed">
                    De um monitoramento essencial a uma análise completa, temos um plano que se encaixa perfeitamente nas <strong className="text-purple-400">suas necessidades e seu bolso</strong>.
                </p>
                <SignatureCard plans={plans} />
            </section>
        </div>
    );
}