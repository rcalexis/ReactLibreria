import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBooks } from "../hooks/useLibros";
import type { Libro } from "../types/types";

const DetailLibro: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { books, deleteBook, updateAvailability } = useBooks();

  const book: Libro | undefined = books.find(b => b.id === Number(id));

  if (!book)
    return (
      <p className="text-red-600 font-bold text-center mt-10 text-xl">
        Libro no encontrado.
      </p>
    );

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl p-8 mt-10 border border-gray-200">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
        {book.titulo}
      </h2>

      <div className="bg-gray-50 p-6 rounded-2xl space-y-4 text-gray-700">
        <p className="text-lg"><span className="font-semibold">Autor:</span> {book.autor}</p>
        <p className="text-lg"><span className="font-semibold">Genero:</span> {book.genero}</p>
        <p className="text-lg"><span className="font-semibold">Precio:</span> ${Number(book.precio).toFixed(2)}</p>
        <p className="text-lg"><span className="font-semibold">Paginas:</span> {book.paginas}</p>
        <p className="text-lg"><span className="font-semibold">ISBN:</span> {book.isbn}</p>
        <p className="text-lg"><span className="font-semibold">Editorial:</span> {book.editorial}</p>
        <p className="text-lg"><span className="font-semibold">Idioma:</span> {book.idioma}</p>
        <p
          className={`mt-2 text-xl font-bold ${
            book.disponible ? "text-green-600" : "text-red-600"
          }`}
        >
          {book.disponible ? "✅ Disponible" : "❌ No disponible"}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <button
          onClick={() => updateAvailability(book.id!)}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl text-white font-bold text-lg transition ${
            book.disponible ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {book.disponible ? "Marcar No Disponible" : "Marcar Disponible"}
        </button>

        <button
          onClick={() => navigate(`/libros/editar/${book.id}`)}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg transition"
        >
          Editar
        </button>

        <button
          onClick={() => {
            deleteBook(book.id!);
            navigate("/libros");
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-lg transition"
        >
          Eliminar
        </button>

        <button
          onClick={() => navigate("/libros")}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-500 hover:bg-gray-600 text-white font-bold text-lg transition"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default DetailLibro;
