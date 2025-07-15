export function Popup({ message }) {
    return (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] animate-bounce">
            {message}
        </div>
    );
}
