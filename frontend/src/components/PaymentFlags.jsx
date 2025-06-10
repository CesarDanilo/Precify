const PaymentFlags = () => {
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
        // {
        //     name: 'Elo',
        //     icon: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Elo_logo.png',
        //     fallback: (
        //         <svg viewBox="0 0 24 24" fill="none" className="h-6 w-10">
        //             <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="#00A4E0" />
        //             <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" fill="white" />
        //         </svg>
        //     )
        // },
        // {
        //     name: 'American Express',
        //     icon: 'https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg',
        //     fallback: (
        //         <svg viewBox="0 0 24 24" fill="none" className="h-6 w-10">
        //             <path d="M5 8H19V16H5V8Z" fill="#016FD0" />
        //             <path d="M8 10L6 12L8 14H10L8 12L10 10H8Z" fill="white" />
        //             <path d="M14 10L12 12L14 14H16L14 12L16 10H14Z" fill="white" />
        //         </svg>
        //     )
        // },
        // {
        //     name: 'Hipercard',
        //     icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Hipercard_logo.svg',
        //     fallback: (
        //         <svg viewBox="0 0 24 24" fill="none" className="h-6 w-10">
        //             <path d="M12 8L6 16H18L12 8Z" fill="#EE2A7B" />
        //             <path d="M12 11L9.5 15H14.5L12 11Z" fill="white" />
        //         </svg>
        //     )
        // },
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
        <div className="flex flex-wrap items-center justify-center gap-3 py-4">
            <span className="text-sm text-gray-400 mr-2">Aceitamos:</span>

            {cardBrands.map((brand) => (
                <div
                    key={brand.name}
                    className="h-6 w-10 flex items-center justify-center"
                    title={brand.name}
                >
                    <img
                        src={brand.icon}
                        alt={brand.name}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.parentNode.innerHTML = '';
                            e.target.parentNode.appendChild(brand.fallback);
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default PaymentFlags;