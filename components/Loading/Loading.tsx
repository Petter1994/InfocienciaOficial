export default function Loading() {
    return (
        <>
            <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.1}s` }}
                    />
                ))}
            </div>
        </>
    )
}