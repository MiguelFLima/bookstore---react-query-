import { ICategoria } from '../../interfaces/ICategoria';
import { useQuery } from '@tanstack/react-query';
import { obterLivrosDaCategoria } from '../../http';
import CardLivro from '../Mini Card';
import './ListaLivros.css';

interface ListaLivrosProps {
  categoria: ICategoria;
}

const ListaLivros = ({ categoria }: ListaLivrosProps) => {
  const { data: livros } = useQuery(
    ['buscaDeLivrosPorCategoria', categoria],
    () => obterLivrosDaCategoria(categoria)
  );

  return (
    <section className="livros">
      {livros?.map((livro) => (
        <CardLivro livro={livro} key={livro.id} />
      ))}
    </section>
  );
};

export default ListaLivros;
