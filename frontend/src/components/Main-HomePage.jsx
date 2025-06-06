export default function MainHomePage() {
    return (
        <main className="flex-1 flex flex-col justify-center items-center text-center px-6 mt-40 text-gray-200">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-100">
                Transforme Visitantes em Clientes
            </h1>
            <p className="text-gray-400 max-w-2xl mb-8">
                Mostre o que seu produto tem de melhor com o
                <span className="text-purple-400 font-semibold"> Validador Inteligente de Preços</span>.
            </p>
            <button className="px-6 py-3 bg-purple-700 rounded-full shadow hover:bg-purple-800 transition font-semibold">
                Comece Agora
            </button>

            {/* Apresentação curta e divertida */}
            <div className="mt-20 w-full max-w-4xl p-6 rounded-xl backdrop-blur bg-gray-900/60 border border-gray-700/30 shadow-md text-left">
                <h2 className="text-2xl font-bold text-purple-400 mb-4">Por que usar o Validador?</h2>
                <p className="text-gray-400 mb-4">
                    📈 Chega de adivinhar preços! Nosso SaaS faz a mágica: analisa concorrência, te alerta de oportunidades e sugere o preço perfeito para turbinar suas vendas.
                </p>
                <p className="text-gray-400 mb-4">
                    ⏰ Economize horas de pesquisa manual e fature mais — enquanto o Validador faz o trabalho pesado por você.
                </p>
                <p className="text-gray-400">
                    💡 Quer ver tudo funcionando? Dá uma espiada no nosso Dashboard abaixo!
                </p>
            </div>

            {/* Simulação do produto em estilo "vidro" */}
            <div className="mt-16 w-full max-w-4xl p-6 rounded-xl backdrop-blur bg-gray-900/60 border border-gray-700/30 shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-purple-400">Dashboard do Validador</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/30">
                        <h3 className="text-purple-300 font-semibold">Análise de Preços</h3>
                        <p className="text-gray-400 text-sm">Descubra as melhores oportunidades em tempo real.</p>
                    </div>
                    <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/30">
                        <h3 className="text-purple-300 font-semibold">Alertas Rápidos</h3>
                        <p className="text-gray-400 text-sm">Receba avisos de mudanças no mercado, direto na sua mão.</p>
                    </div>
                    <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/30">
                        <h3 className="text-purple-300 font-semibold">Relatórios Simples</h3>
                        <p className="text-gray-400 text-sm">Acompanhe tendências e tome decisões confiantes.</p>
                    </div>
                </div>
            </div>
        </main>
    )
}
