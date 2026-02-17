import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Next.js Starter
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400 mb-8 text-center max-w-2xl">
          เว็บไซต์ของคุณเริ่มต้นที่นี่
        </p>
        
        {/* CTA Buttons */}
        <div className="flex gap-4">
          <Link 
            href="#" 
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
          >
            เริ่มต้น
          </Link>
          <Link 
            href="#" 
            className="px-8 py-3 border border-neutral-600 hover:border-neutral-400 rounded-lg font-semibold transition-colors"
          >
            เรียนรู้เพิ่มเติม
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-neutral-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Fast", desc: "Next.js 16 with App Router" },
              { title: "Type Safe", desc: "TypeScript strict mode" },
              { title: "Stylish", desc: "Tailwind CSS 4" }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-neutral-800 rounded-xl text-center">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-neutral-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-neutral-500">
        <p>© 2026 Next.js Starter Template</p>
      </footer>
    </main>
  );
}
