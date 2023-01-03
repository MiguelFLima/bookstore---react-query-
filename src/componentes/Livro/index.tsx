import { obterUmAutor, obterUmLivro } from '../../http';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Loader from '../Loader';
import { AbGrupoOpcao, AbBotao, AbGrupoOpcoes } from 'ds-alurabooks';
import { AbInputQuantidade } from 'ds-alurabooks';
import './Livro.css';
import TituloPrincipal from '../TituloPrincipal';

const Livro = () => {
  const params = useParams();
  const { data: livro } = useQuery(['UmLivro', params.slug], () =>
    obterUmLivro(params.slug || '')
  );

  const { data: autor, isLoading } = useQuery(['UmAutor'], () =>
    obterUmAutor(params.slug || '')
  );

  const opcoes = [
    {
      id: 1,
      titulo: 'E-book',
      corpo: `R$ ${livro?.opcoesCompra[0].preco}`,
      rodape: '',
    },
    {
      id: 2,
      titulo: 'Impresso',
      corpo: `R$ ${livro?.opcoesCompra[1].preco}`,
      rodape: '',
    },
    {
      id: 3,
      titulo: 'Impresso + e-book',
      corpo: `R$ ${livro?.opcoesCompra[2].preco}`,
      rodape: '',
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  console.log('autor: ', autor);

  return (
    <>
      <TituloPrincipal titulo="Detalhes do livro" />
      <div className="container">
        <div className="container__Imagem--uau">
          <img
            className="livro__imagem"
            src={livro?.imagemCapa}
            alt="Capa do Livro"
          />
          <div className="">
            <h1 className="livro__titulo">{livro?.titulo}</h1>
            <h2 className="livro__descricao">{livro?.descricao}</h2>
            <h3 className="autor__nome">Por: {autor.nome}</h3>
            <p className="formatos">Selecione o formato de seu livro:</p>
            <div className="opcoes">
              <AbGrupoOpcoes opcoes={opcoes} />
            </div>
            <p className="lembrete">
              *Você terá acesso às futuras atualizações do livro.
            </p>
            <div className="input__qnt">
              <AbInputQuantidade />
            </div>
            <AbBotao texto="Comprar" />
          </div>
        </div>
        <div className="divp">
          <p className="autor__sobre">Sobre o autor</p>
          <div className="borda" />
          <p className="autor__conteudo">{autor.sobre}</p>
          <p className="autor__sobre">Sobre o livro</p>
          <div className="borda" />
          <p className="autor__conteudo">{livro?.sobre}</p>
        </div>
      </div>
    </>
  );
};

export default Livro;
