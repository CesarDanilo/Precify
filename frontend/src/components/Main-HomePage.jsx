export default function MainHomePage() {
    return (
        <main className="flex-1 flex flex-col justify-center items-center text-center px-6 mt-40">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-100">Transforme Visitantes em Clientes</h1>
            <p className="text-gray-400 max-w-2xl mb-8">
                Apresente seu produto de forma inteligente e aumente suas vendas com o
                <span className="text-purple-400 font-semibold"> Validador Inteligente de Preços</span>.
                Capture a atenção e direcione a ação do seu público.
            </p>
            <button className="px-6 py-3 bg-purple-700 rounded-full shadow hover:bg-purple-800 transition font-semibold">
                Comece Agora
            </button>

            {/* Simulação do produto em estilo "vidro" */}
            <div className="mt-16 w-full max-w-4xl p-6 rounded-xl backdrop-blur bg-gray-900/60 border border-gray-700/30 shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-purple-400">Dashboard do Validador</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/30">
                        <h3 className="text-purple-300 font-semibold">Análise de Preços</h3>
                        <p className="text-gray-400 text-sm">Veja insights em tempo real para otimizar suas margens de lucro.</p>
                    </div>
                    <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/30">
                        <h3 className="text-purple-300 font-semibold">Alertas Inteligentes</h3>
                        <p className="text-gray-400 text-sm">Receba notificações automáticas sobre oportunidades de mercado.</p>
                    </div>
                    <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/30">
                        <h3 className="text-purple-300 font-semibold">Relatórios Detalhados</h3>
                        <p className="text-gray-400 text-sm">Acompanhe e compare tendências de preços em seu setor.</p>
                    </div>
                </div>
            </div>
        </main>
    )
}