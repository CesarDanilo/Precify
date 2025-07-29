import React, { useState } from 'react';
// Importando ícones de Heroicons para um visual consistente
import { CheckCircleIcon, ShieldCheckIcon, CreditCardIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
// Assumindo que você tem um FloatingNavbar para manter a consistência de navegação
import FloatingNavbar from '../components/Floating-Navbar';

const CheckoutPage = ({ selectedPlan = "Pro", planPrice = "R$ 99/mês" }) => {
    // Estados para gerenciar o método de pagamento selecionado, processamento e sucesso
    const [paymentMethod, setPaymentMethod] = useState('credit-card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Função para simular o processo de pagamento
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simula um delay de 2 segundos para processamento de pagamento
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
        }, 2000);
    };

    // Renderiza a tela de sucesso após o pagamento
    if (isSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black flex items-center justify-center p-4 font-sans text-gray-100">
                {/* Navbar flutuante para manter o design */}
                <FloatingNavbar />
                {/* Efeito de glow de fundo */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-60 bg-purple-700/10 blur-3xl rounded-full pointer-events-none z-0"></div>

                {/* Cartão de sucesso com estilo glassmorphism */}
                <div className="relative z-10 bg-gray-900/60 backdrop-blur-sm p-8 rounded-xl shadow-lg max-w-md w-full text-center border border-gray-700/30">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-800/50 backdrop-blur-sm border border-green-700/30 text-green-400 mb-4">
                        <CheckCircleIcon className="h-8 w-8" />
                    </div>
                    <h2 className="mt-3 text-3xl font-bold text-white mb-2">Pagamento Concluído!</h2>
                    <p className="mt-2 text-gray-300 text-lg">
                        Seu plano <span className="font-semibold text-purple-400">{selectedPlan}</span> foi ativado com sucesso.
                    </p>
                    <div className="mt-8 bg-gray-800/50 p-5 rounded-lg border border-gray-700/30">
                        <h3 className="text-xl font-medium text-white mb-3">Resumo do Pedido</h3>
                        <dl className="space-y-2 text-left">
                            <div className="flex justify-between">
                                <dt className="text-gray-300">Plano:</dt>
                                <dd className="font-medium text-white">{selectedPlan}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-300">Valor:</dt>
                                <dd className="font-medium text-purple-400">{planPrice}</dd>
                            </div>
                        </dl>
                    </div>
                    <div className="mt-8">
                        <button
                            onClick={() => window.location.href = '/'} // Redireciona para a home ou dashboard
                            className="w-full flex justify-center items-center px-4 py-3 bg-purple-700 text-white font-medium rounded-full hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors transform hover:scale-105"
                            aria-label="Acessar minha conta"
                        >
                            Acessar Minha Conta <ArrowRightIcon className="ml-3 h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Renderiza o formulário de checkout
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-100 relative">
            {/* Navbar flutuante */}
            <FloatingNavbar />
            {/* Efeito de glow de fundo */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-60 bg-purple-700/10 blur-3xl rounded-full pointer-events-none z-0"></div>

            {/* Cartão principal do formulário com estilo glassmorphism */}
            <div className="relative z-10 max-w-md mx-auto bg-gray-900/60 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden md:max-w-2xl border border-gray-700/30">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Finalizar Assinatura</h1>
                        <p className="mt-2 text-gray-300 text-lg">Preencha seus dados para concluir o pagamento.</p>
                    </div>

                    {/* Resumo do plano selecionado */}
                    <div className="bg-purple-900/20 p-5 rounded-lg mb-6 border border-purple-800/30 flex justify-between items-center transition-all duration-200 hover:shadow-xl">
                        <div>
                            <h3 className="text-xl font-medium text-white">{selectedPlan}</h3>
                            <p className="text-gray-300 text-sm">Assinatura mensal</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-purple-400">{planPrice}</p>
                            <p className="text-sm text-gray-400">+ impostos aplicáveis</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-8">
                            <h3 className="text-xl font-medium text-white mb-4">Informações de Pagamento</h3>

                            {/* Seleção do método de pagamento (Cartão de Crédito / PIX) */}
                            <div className="space-y-4 mb-6">
                                <label className={`flex items-center space-x-3 p-4 rounded-lg cursor-pointer transition-all duration-200 ${paymentMethod === 'credit-card' ? 'bg-indigo-700/30 border border-indigo-600/50 shadow-md' : 'bg-gray-800/50 border border-gray-700/30 hover:bg-gray-700/50'}`}>
                                    <input
                                        type="radio"
                                        name="payment-method"
                                        value="credit-card"
                                        checked={paymentMethod === 'credit-card'}
                                        onChange={() => setPaymentMethod('credit-card')}
                                        className="h-5 w-5 text-purple-500 focus:ring-purple-400 border-gray-500 bg-gray-700"
                                        aria-label="Selecionar Cartão de Crédito"
                                    />
                                    <span className="flex items-center text-lg text-gray-200">
                                        <CreditCardIcon className="h-6 w-6 text-purple-400 mr-3" />
                                        Cartão de Crédito
                                    </span>
                                </label>
                                <label className={`flex items-center space-x-3 p-4 rounded-lg cursor-pointer transition-all duration-200 ${paymentMethod === 'pix' ? 'bg-indigo-700/30 border border-indigo-600/50 shadow-md' : 'bg-gray-800/50 border border-gray-700/30 hover:bg-gray-700/50'}`}>
                                    <input
                                        type="radio"
                                        name="payment-method"
                                        value="pix"
                                        checked={paymentMethod === 'pix'}
                                        onChange={() => setPaymentMethod('pix')}
                                        className="h-5 w-5 text-purple-500 focus:ring-purple-400 border-gray-500 bg-gray-700"
                                        aria-label="Selecionar PIX"
                                    />
                                    <span className="flex items-center text-lg text-gray-200">
                                        {/* Ícone PIX (SVG inline para consistência e fallback) */}
                                        <svg className="h-6 w-6 text-green-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                        </svg>
                                        PIX
                                    </span>
                                </label>
                            </div>

                            {/* Campos do formulário para Cartão de Crédito (condicional) */}
                            {paymentMethod === 'credit-card' && (
                                <div className="space-y-4 bg-gray-800/50 p-5 rounded-lg border border-gray-700/30">
                                    <div>
                                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-300 mb-2">
                                            Número do Cartão
                                        </label>
                                        <input
                                            type="text"
                                            id="card-number"
                                            placeholder="0000 0000 0000 0000"
                                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400"
                                            required
                                            aria-label="Número do cartão de crédito"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-300 mb-2">
                                                Validade
                                            </label>
                                            <input
                                                type="text"
                                                id="expiry-date"
                                                placeholder="MM/AA"
                                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400"
                                                required
                                                aria-label="Data de validade do cartão"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-300 mb-2">
                                                CVV
                                            </label>
                                            <input
                                                type="text"
                                                id="cvv"
                                                placeholder="123"
                                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400"
                                                required
                                                aria-label="Código de segurança do cartão"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="card-name" className="block text-sm font-medium text-gray-300 mb-2">
                                            Nome no Cartão
                                        </label>
                                        <input
                                            type="text"
                                            id="card-name"
                                            placeholder="Nome como está no cartão"
                                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400"
                                            required
                                            aria-label="Nome completo no cartão"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Seção PIX (condicional) */}
                            {paymentMethod === 'pix' && (
                                <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700/30">
                                    <div className="text-center">
                                        {/* Ícone PIX maior */}
                                        <svg className="mx-auto h-20 w-20 text-green-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                        </svg>
                                        <h4 className="mt-2 font-medium text-white text-xl">Pagamento via PIX</h4>
                                        <p className="mt-2 text-gray-300">Após confirmar, você receberá um QR Code e o código Pix Copia e Cola para realizar o pagamento. Não se preocupe, a transação é segura e instantânea!</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Checkbox de Termos e Condições */}
                        <div className="flex items-center mb-8">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                className="h-5 w-5 text-purple-500 focus:ring-purple-400 border-gray-500 rounded bg-gray-700 cursor-pointer"
                                required
                                aria-label="Concordar com termos de serviço e política de privacidade"
                            />
                            <label htmlFor="terms" className="ml-3 block text-base text-gray-300">
                                Eu concordo com os <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors underline">Termos de Serviço</a> e <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors underline">Política de Privacidade</a>
                            </label>
                        </div>

                        {/* Resumo final do pedido (subtotal, taxas, total) */}
                        <div className="bg-gray-800/50 p-5 rounded-lg mb-8 border border-gray-700/30">
                            <h3 className="text-xl font-medium text-white mb-3">Total do Pedido</h3>
                            <div className="flex justify-between items-center">
                                <dt className="text-gray-300">Subtotal:</dt>
                                <dd className="font-medium text-white">{planPrice}</dd>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <dt className="text-gray-300">Taxas:</dt>
                                <dd className="font-medium text-white">R$ 0,00</dd> {/* Exemplo, pode ser dinâmico */}
                            </div>
                            <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between items-center">
                                <dt className="text-xl font-bold text-white">Total:</dt>
                                <dd className="text-2xl font-bold text-purple-400">{planPrice}</dd>
                            </div>
                        </div>

                        {/* Mensagem de segurança */}
                        <div className="flex items-center text-sm text-gray-400 mb-8 justify-center">
                            <ShieldCheckIcon className="h-6 w-6 text-gray-500 mr-2" />
                            <span>Pagamento seguro e criptografado</span>
                        </div>

                        {/* Botão de confirmar pagamento */}
                        <button
                            type="submit"
                            disabled={isProcessing}
                            className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-full shadow-lg text-white font-bold text-xl
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-105
                                ${isProcessing ? 'bg-purple-800 cursor-not-allowed' : 'bg-purple-700 hover:bg-purple-600'}`}
                            aria-label={isProcessing ? "Processando pagamento" : `Confirmar pagamento - ${planPrice}`}
                        >
                            {isProcessing ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processando...
                                </>
                            ) : (
                                `Confirmar Pagamento - ${planPrice}`
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
