export function ButtonAdd() {
    return (
        <button
            type="submit"
            className="flex items-center gap-2 bg-[#1447e6] hover:bg-[#0f3ac2] text-white font-medium px-5 py-2 rounded-xl shadow-md transition-all duration-200"
        >
            <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Adicionar
        </button>
    );
}
