import React, { useState } from "react";

// Componente auxiliar para renderizar cada bandeira de pagamento
// Isso ajuda a gerenciar o estado de fallback para cada imagem individualmente
const PaymentFlagItem = ({ brand }) => {
    // Estado para controlar se o fallback (SVG) deve ser mostrado
    const [showFallback, setShowFallback] = useState(false);

    return (
        <div
            className="h-6 w-10 flex items-center justify-center transition-all duration-200 hover:scale-110"
            title={brand.name} // Tooltip ao passar o mouse
            aria-label={`Método de pagamento: ${brand.name}`} // Para acessibilidade
        >
            {showFallback ? (
                // Se showFallback for true, renderiza o SVG de fallback
                brand.fallback
            ) : (
                // Caso contrário, tenta renderizar a imagem
                <img
                    src={brand.icon}
                    alt={brand.name}
                    className="h-full w-full object-contain"
                    // No caso de erro ao carregar a imagem, define showFallback para true
                    onError={() => setShowFallback(true)}
                    loading="lazy" // Otimização: carrega a imagem apenas quando visível
                />
            )}
        </div>
    );
};

const PaymentFlags = () => {
    // Array de objetos com as marcas de cartão e métodos de pagamento.
    // Inclui a URL do ícone e um SVG de fallback para garantir que algo seja exibido.
    const cardBrands = [
        {
            name: 'Visa',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
            fallback: (
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-10">
                    <path d="M17.5 8H20L16 16H13.5L17.5 8Z" fill="#1A1F71" />
                    <path d="M10.5 8H13.75L9.75 16H7L10.5 8Z" fill="#1A1F71" />
                    <path d="M6 8H9L5 16H2L6 8Z" fill="#1A1F71" />
                </svg>
            )
        },
        {
            name: 'Mastercard',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
            fallback: (
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-10">
                    <circle cx="12" cy="12" r="8" fill="#EB001B" />
                    <circle cx="16" cy="12" r="8" fill="#F79E1B" />
                    <path d="M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z" fill="#FF5F00" />
                </svg>
            )
        },
        {
            name: 'PIX',
            icon: 'https://www.bcb.gov.br/content/estabilidadefinanceira/piximg/logo_pix.png',
            fallback: (
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-10">
                    <path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19H12V22C16.86 19.66 20 15 20 10.5C20 5.81 16.19 2 11.5 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#32BCAD" />
                </svg>
            )
        }
    ];

    return (
        // Container principal com estilo glassmorphism (blur, borda, sombra e fundo semitransparente)
        // Posicionado centralmente na parte inferior da página.
        <div className="max-w-xl mx-auto mb-8 p-4 rounded-xl backdrop-blur-sm bg-gray-900/60 border border-gray-700/30 shadow-lg text-center">
            {/* Título para a seção de métodos de pagamento */}
            <h3 className="text-gray-400 text-sm mb-4 font-semibold">Métodos de Pagamento Aceitos</h3>

            {/* Container flexível para as bandeiras, centralizando e adicionando espaçamento */}
            <div className="flex flex-wrap items-center justify-center gap-3">
                {cardBrands.map((brand) => (
                    // Renderiza cada bandeira usando o componente auxiliar PaymentFlagItem
                    <PaymentFlagItem key={brand.name} brand={brand} />
                ))}
            </div>
        </div>
    );
};

export default PaymentFlags;
