import React, { useState } from "react";
import type { Libro, FormProps } from "../types/types";

const Form: React.FC<FormProps> = ({ initialData, onSubmit, submitText }) => {
  const [formData, setFormData] = useState<Libro>({
    titulo: "",
    autor: "",
    genero: "",
    isbn: "",
    editorial: "",
    idioma: "",
    paginas: 0,
    precio: 0,
    disponible: true,
    ...initialData,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? 0 : Number(value),
    }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, disponible: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow space-y-4"
    >
      <div>
        <label className="block font-semibold">Título</label>
        <input
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          className="border rounded w-full p-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Autor</label>
        <input
          name="autor"
          value={formData.autor}
          onChange={handleChange}
          className="border rounded w-full p-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Género</label>
        <input
          name="genero"
          value={formData.genero}
          onChange={handleChange}
          className="border rounded w-full p-2"
        />
      </div>

      <div>
        <label className="block font-semibold">ISBN</label>
        <input
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          className="border rounded w-full p-2"
        />
      </div>

      <div>
        <label className="block font-semibold">Editorial</label>
        <input
          name="editorial"
          value={formData.editorial}
          onChange={handleChange}
          className="border rounded w-full p-2"
        />
      </div>

      <div>
        <label className="block font-semibold">Idioma</label>
        <input
          name="idioma"
          value={formData.idioma}
          onChange={handleChange}
          className="border rounded w-full p-2"
        />
      </div>

     
      <div>
        <label className="block font-semibold">Páginas</label>
        <input
          name="paginas"
          type="text" // 
          value={formData.paginas || ""}
          onChange={handleNumberChange}
          className="border rounded w-full p-2"
          placeholder="Numero de paginas"
        />
      </div>

     
      <div>
        <label className="block font-semibold">Precio</label>
        <input
          name="precio"
          type="text" 
          value={formData.precio || ""}
          onChange={handleNumberChange}
          className="border rounded w-full p-2"
          placeholder="precio"
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={formData.disponible}
          onChange={handleCheckbox}
        />
        <label>Disponible</label>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {submitText}
      </button>
    </form>
  );
};

export default Form;
