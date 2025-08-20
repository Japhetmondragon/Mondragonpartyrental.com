import { Outlet, Link } from "react-router-dom";


export default function App() {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
          <Link to="/" className="font-bold text-xl">LA Party & Catering</Link>
          <nav>
            <ul className="hidden md:flex gap-6" role="menubar">
              <li role="none"><Link role="menuitem" to="/" className="hover:underline">Home</Link></li>
            </ul>
          </nav>
          <Link to="/" className="rounded-lg bg-blue-600 text-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">Get a Quote</Link>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600">
          © {new Date().getFullYear()} LA Party & Catering • Los Angeles, CA
        </div>
      </footer>
    </div>
  );
}
