'use client'
export default function WeatherLayout({
    title = " Welcome to WeatherX",
    subtitle = "Get weather information for any information",
    children,
}) {
    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-center text-3xl font-bold mb-2">{title}</h1>
            <p className="text-center text-gray-600 mb-6">{subtitle}</p>
            {children}
        </div>
    )
}