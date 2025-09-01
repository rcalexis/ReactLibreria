import { Outlet, NavLink } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            📚 Biblioteca Sanmiguelense
          </h1>
          
          <nav className="flex space-x-4 sm:space-x-6">
            <NavLink
              to="/libros"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-white font-semibold transition-all hover:bg-yellow-400 hover:text-gray-900 ${
                  isActive ? "bg-yellow-400 text-gray-900 shadow-lg" : ""
                }`
              }
            >
              Libros
            </NavLink>

            <NavLink
              to="/registro/nuevo"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-white font-semibold transition-all hover:bg-yellow-400 hover:text-gray-900 ${
                  isActive ? "bg-yellow-400 text-gray-900 shadow-lg" : ""
                }`
              }
            >
              Nuevo Libro
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
