// import { HomeIcon, ShoppingBagIcon, UserGroupIcon } from '@heroicons/react/24/outline';

// export function Sidebar({ setSelectItem }) {

// const links = [
//     { name: 'dashboard', label: 'Dashboard', icon: HomeIcon },
//     { name: 'usuarios', label: 'Usuarios', icon: UserGroupIcon },
//     { name: 'planos', label: 'Planos', icon: ShoppingBagIcon },
// ]
//     return (
//         <div>
//             <nav className="bg-gray-500/20 text-gray-800 h-screen w-64">
//                 <div className="p-4">
//                     <h1 className="text-xl font-bold">Admin Panel</h1>
//                 </div>
//                 <ul className="mt-4">
//                     {links.map(link => (
//                         <li key={link.name} onClick={() => setSelectItem(link.name)} className="px-4 py-2 hover:bg-blue-700 text-gray-800 hover:text-white cursor-default ">
//                             <div className="flex items-center ">
//                                 <link.icon className="w-5 h-5 mr-2" />
//                                 {link.label}
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             </nav>
//         </div>
//     )
// }

// src/components/Sidebar.jsx
import React from 'react';
// Importe ícones do Heroicons para um visual consistente e substitua os emojis se preferir
import { HomeIcon, ShoppingBagIcon, UserGroupIcon, UserCircleIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';

export function Sidebar({ setSelectItem, selectedItem }) {
    // Array de objetos para definir os links de navegação da sidebar.
    // Cada objeto inclui o 'name' (para controle de estado e key), 'label' (texto visível) e 'icon' (componente do Heroicons).
    // Mantive os links originais fornecidos por você: 'dashboard', 'usuarios', 'planos'.
    const links = [
        { name: 'dashboard', label: 'Dashboard', icon: HomeIcon },
        { name: 'usuarios', label: 'Usuários', icon: UserGroupIcon }, // Corrigido 'Usuarios' para 'Usuários' para melhor PT-BR
        { name: 'planos', label: 'Planos', icon: ShoppingBagIcon },
    ];

    return (
        // Container principal da Sidebar.
        // Aplica o efeito glassmorphism com:
        // - Fundo semi-transparente MAIS ESCURO (bg-gray-950/50)
        // - Efeito de desfoque (backdrop-blur-md)
        // - Borda à direita (border-r border-gray-800/50) para separação sutil e mais escura
        // - Sombra (shadow-xl) para profundidade
        // - REMOVIDAS as bordas arredondadas (sem rounded-r-2xl) para um visual mais reto e minimalista.
        // - Altura total (h-full) e layout flexível em coluna.
        <div className="flex flex-col h-full bg-black backdrop-blur-md border-r border-gray-800/50 p-6 shadow-xl">
            {/* Seção do Logo ou Título do Dashboard */}
            {/* Texto em negrito com cor roxa para destaque, alinhado ao centro. */}
            <div className="mb-10 text-center py-2">
                <h1 className="text-3xl font-extrabold text-purple-400 drop-shadow-md">Validador Admin</h1>
            </div>

            {/* Navegação Principal da Sidebar */}
            {/* Utiliza `space-y-3` para espaçamento vertical entre os itens. */}
            <nav className="flex-1 space-y-3">
                {links.map((link) => (
                    // Cada item de navegação é um botão para melhor semântica e acessibilidade.
                    <button
                        key={link.name}
                        onClick={() => setSelectItem(link.name)}
                        // Classes dinâmicas para o estilo do item selecionado vs. não selecionado.
                        // Item selecionado: fundo roxo translúcido, texto branco, sombra.
                        // Item não selecionado: texto cinza, hover com fundo cinza escuro e texto branco.
                        className={`
                            w-full flex items-center p-3 rounded-lg text-lg font-medium transition-all duration-200
                            ${selectedItem === link.name
                                ? 'bg-purple-700/70 text-white shadow-md'
                                : 'text-gray-300 hover:bg-gray-800/70 hover:text-white'
                            }
                        `}
                        aria-current={selectedItem === link.name ? 'page' : undefined}
                    >
                        {/* Renderiza o ícone do Heroicons */}
                        <link.icon className="h-6 w-6 mr-4 flex-shrink-0" />
                        {link.label}
                    </button>
                ))}
            </nav>

            {/* Seção Inferior da Sidebar (ex: Perfil do Usuário, Logout) */}
            {/* Separado por uma borda superior sutil e com padding. */}
            <div className="mt-auto pt-6 border-t border-gray-800/50"> {/* Borda também mais escura */}
                <button
                    className="w-full flex items-center p-3 rounded-lg text-lg font-medium text-gray-400 hover:bg-gray-800/70 hover:text-white transition-all duration-200"
                    aria-label="Acessar meu perfil"
                >
                    <UserCircleIcon className="h-6 w-6 mr-4 flex-shrink-0" />
                    Meu Perfil
                </button>
                {/* Botão de Logout adicionado e ativado */}
                <button
                    className="w-full flex items-center p-3 rounded-lg text-lg font-medium text-gray-400 hover:bg-gray-800/70 hover:text-white transition-all duration-200 mt-2"
                    aria-label="Sair da conta"
                >
                    <ArrowRightStartOnRectangleIcon className="h-6 w-6 mr-4 flex-shrink-0" />
                    Sair
                </button>
            </div>
        </div>
    );
}

