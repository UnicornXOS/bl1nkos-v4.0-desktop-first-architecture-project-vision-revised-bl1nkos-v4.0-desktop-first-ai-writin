// apps/desktop/src-web/app/page.tsx

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          bl1nkOS v4.0
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400 mb-8 text-center max-w-2xl">
          AI-powered writing platform with desktop-first architecture
        </p>
        <div className="flex gap-4">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
            Get Started
          </button>
          <button className="px-8 py-3 border border-neutral-600 hover:border-neutral-400 rounded-lg font-semibold transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </main>
  );
}
