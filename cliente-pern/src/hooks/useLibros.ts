import { useState, useEffect } from "react";
import axios from "axios";
import type { Libro } from "../types/types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export function useBooks() {
  const [books, setBooks] = useState<Libro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const GetBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/libros`);
      setBooks(
        res.data.data.map((b: Libro) => ({
          ...b,
          precio: Number(b.precio),
          paginas: Number(b.paginas),
        }))
      );
      setError(null);
    } catch (err) {
      console.error("Error en fetchBooks:", err);
      setError("Error al obtener libros");
    } finally {
      setLoading(false);
    }
  };

  const createBook = async (book: Libro): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await axios.post(`${API_URL}/libros`, book);
      const newBook = { ...res.data.data, precio: Number(res.data.data.precio), paginas: Number(res.data.data.paginas) };
      setBooks((prev) => [...prev, newBook]);
      setError(null);
      return { success: true };
    } catch (err: unknown) {
      let backendMessage = "Error al crear libro";
      if (axios.isAxiosError(err)) {
        backendMessage = err.response?.data?.error || backendMessage;
      }
      setError(backendMessage);
      return { success: false, message: backendMessage };
    }
  };

  const getBookById = async (id: number): Promise<Libro | null> => {
    try {
      const res = await axios.get(`${API_URL}/libros/${id}`);
      return { ...res.data.data, precio: Number(res.data.data.precio), paginas: Number(res.data.data.paginas) };
    } catch (err) {
      console.error("Error en getBookById:", err);
      setError("Error al obtener libro por ID");
      return null;
    }
  };

const updateBook = async (id: number, book: Partial<Libro>) => {
  try {
    
    const { id: _, createdAt, updatedAt, ...cleanBook } = book;

    const res = await axios.put(`${API_URL}/libros/${id}`, cleanBook);

    const updatedBook = { 
      ...res.data.data, 
      precio: Number(res.data.data.precio), 
      paginas: Number(res.data.data.paginas) 
    };

    setBooks((prev) => prev.map((b) => (b.id === id ? updatedBook : b)));
  } catch (err) {
    console.error("Error en updateBook:", err);
    setError("Error al actualizar libro");
  }
};


  const updateAvailability = async (id: number) => {
    try {
      const res = await axios.patch(`${API_URL}/libros/${id}/disponibilidad`);
      const updatedBook = { ...res.data.data, precio: Number(res.data.data.precio), paginas: Number(res.data.data.paginas) };
      setBooks((prev) => prev.map((b) => (b.id === id ? updatedBook : b)));
    } catch (err) {
      console.error("Error en toggleAvailability:", err);
      setError("Error al actualizar disponibilidad");
    }
  };

  const deleteBook = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/libros/${id}`);
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Error en deleteBook:", err);
      setError("Error al eliminar libro");
    }
  };

  useEffect(() => {
    GetBooks();
  }, []);

  return {
    books,
    loading,
    error,
    GetBooks,
    createBook,
    getBookById,
    updateBook,
    updateAvailability,
    deleteBook,
  };
}
