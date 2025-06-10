import { useState } from 'react';
import { CheckCircleIcon, ShieldCheckIcon, CreditCardIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const CheckoutPage = ({ selectedPlan = "Pro", planPrice = "R$ 99/mês" }) => {
    const [paymentMethod, setPaymentMethod] = useState('credit-card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <div className="bg-gray-800 p-8 rounded-xl shadow-sm max-w-md w-full text-center border border-gray-700">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-900">
                        <CheckCircleIcon className="h-6 w-6 text-green-400" />
                    </div>
                    <h2 className="mt-3 text-2xl font-bold text-white">Pagamento concluído!</h2>
                    <p className="mt-2 text-gray-300">
                        Seu plano <span className="font-semibold text-white">{selectedPlan}</span> foi ativado com sucesso.
                    </p>
                    <div className="mt-6 bg-gray-700 p-4 rounded-lg border border-gray-600">
                        <h3 className="text-lg font-medium text-white">Resumo do pedido</h3>
                        <dl className="mt-2 space-y-1">
                            <div className="flex justify-between">
                                <dt className="text-gray-300">Plano</dt>
                                <dd className="font-medium text-white">{selectedPlan}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-300">Valor</dt>
                                <dd className="font-medium text-white">{planPrice}</dd>
                            </div>
                        </dl>
                    </div>
                    <div className="mt-6">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="w-full flex justify-center items-center px-4 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                            Acessar minha conta <ArrowRightIcon className="ml-2 h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-sm overflow-hidden md:max-w-2xl border border-gray-700">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-white">Finalizar assinatura</h1>
                        <p className="mt-2 text-gray-300">Preencha seus dados para concluir o pagamento</p>
                    </div>

                    <div className="bg-indigo-900 bg-opacity-20 p-4 rounded-lg mb-6 border border-indigo-800 border-opacity-50">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-medium text-white">{selectedPlan}</h3>
                                <p className="text-gray-300">Assinatura mensal</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-indigo-400">{planPrice}</p>
                                <p className="text-sm text-gray-400">+ impostos aplicáveis</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-white mb-3">Informações de pagamento</h3>

                            <div className="space-y-3 mb-4">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="payment-method"
                                        value="credit-card"
                                        checked={paymentMethod === 'credit-card'}
                                        onChange={() => setPaymentMethod('credit-card')}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-500"
                                    />
                                    <span className="flex items-center text-gray-300">
                                        <CreditCardIcon className="h-5 w-5 text-gray-400 mr-2" />
                                        Cartão de crédito
                                    </span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="payment-method"
                                        value="pix"
                                        checked={paymentMethod === 'pix'}
                                        onChange={() => setPaymentMethod('pix')}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-500"
                                    />
                                    <span className="flex items-center text-gray-300">
                                        <svg className="h-5 w-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                        </svg>
                                        PIX
                                    </span>
                                </label>
                            </div>

                            {paymentMethod === 'credit-card' && (
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-300 mb-1">
                                            Número do cartão
                                        </label>
                                        <input
                                            type="text"
                                            id="card-number"
                                            placeholder="0000 0000 0000 0000"
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-300 mb-1">
                                                Validade
                                            </label>
                                            <input
                                                type="text"
                                                id="expiry-date"
                                                placeholder="MM/AA"
                                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-300 mb-1">
                                                CVV
                                            </label>
                                            <input
                                                type="text"
                                                id="cvv"
                                                placeholder="123"
                                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="card-name" className="block text-sm font-medium text-gray-300 mb-1">
                                            Nome no cartão
                                        </label>
                                        <input
                                            type="text"
                                            id="card-name"
                                            placeholder="Nome como está no cartão"
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {paymentMethod === 'pix' && (
                                <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                                    <div className="text-center">
                                        <svg className="mx-auto h-16 w-16 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                        </svg>
                                        <h4 className="mt-2 font-medium text-white">Pagamento via PIX</h4>
                                        <p className="mt-1 text-gray-300">Após confirmar, você receberá o QR Code para pagamento</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center mb-6">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-500 rounded bg-gray-700"
                                required
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                                Eu concordo com os <a href="#" className="text-indigo-400 hover:text-indigo-300">Termos de Serviço</a> e <a href="#" className="text-indigo-400 hover:text-indigo-300">Política de Privacidade</a>
                            </label>
                        </div>

                        <div className="bg-gray-700 p-4 rounded-lg mb-6 border border-gray-600">
                            <div className="flex justify-between">
                                <dt className="text-gray-300">Subtotal</dt>
                                <dd className="font-medium text-white">{planPrice}</dd>
                            </div>
                            <div className="flex justify-between mt-1">
                                <dt className="text-gray-300">Taxas</dt>
                                <dd className="font-medium text-white">R$ 0,00</dd>
                            </div>
                            <div className="border-t border-gray-600 mt-2 pt-2 flex justify-between">
                                <dt className="text-base font-medium text-white">Total</dt>
                                <dd className="text-base font-bold text-indigo-400">{planPrice}</dd>
                            </div>
                        </div>

                        <div className="flex items-center text-sm text-gray-400 mb-6">
                            <ShieldCheckIcon className="h-5 w-5 text-gray-500 mr-2" />
                            <span>Pagamento seguro criptografado</span>
                        </div>

                        <button
                            type="submit"
                            disabled={isProcessing}
                            className={`w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${isProcessing ? 'bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                        >
                            {isProcessing ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processando...
                                </>
                            ) : (
                                `Confirmar pagamento - ${planPrice}`
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;