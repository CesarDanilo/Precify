export default function SignatureCard({ plans }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
            {plans.map((plan, index) => (
                <div
                    key={index}
                    className={`
                        rounded-xl border border-gray-700/30 backdrop-blur p-6 shadow-lg
                        ${plan.bgColor} flex flex-col justify-between transition transform
                        ${index === 1 ? "md:scale-110 hover:scale-115 border-2" : "hover:scale-105"}
                    `}
                >
                    <h2 className="text-2xl font-semibold mb-2 text-purple-400">{plan.name}</h2>
                    <p className="text-xl font-bold mb-4">{plan.price}</p>
                    <ul className="flex-1 space-y-2 mb-4">
                        {plan.features.map((feature, idx) => (
                            <li key={idx} className="text-sm text-gray-300">• {feature}</li>
                        ))}
                    </ul>
                    <button className="px-4 py-2 rounded-full bg-purple-700 hover:bg-purple-800 transition text-white font-semibold shadow">
                        Assinar
                    </button>
                </div>
            ))}
        </div>
    )
}
