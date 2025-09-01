export type Libro ={
  id?: number;
  titulo: string;
  autor: string;
  genero: string;
  isbn: string;
  editorial: string;
  idioma: string;
  paginas: number;
  precio: number;
  disponible?: boolean;
}
export type FormProps = {
  initialData?: Libro;
  onSubmit: (book: Libro) => void;
  submitText: string;
};