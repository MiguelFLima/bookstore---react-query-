import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../componentes/Loader';
import TituloPrincipal from '../../componentes/TituloPrincipal';
import http from '../../http';
import { ICategoria } from '../../interfaces/ICategoria';

const Categoria = () => {
  const [categoria, setCategoria] = useState<ICategoria>();
  const [loader, setLoader] = useState<boolean>(false);

  const params = useParams();

  // como direcionar para uma rota dinamica
  useEffect(() => {
    setLoader(true);
    http
      .get<ICategoria[]>('categorias', {
        params: {
          slug: params.slug,
        },
      })
      .then((res) => {
        setCategoria(res.data[0]);
        setLoader(false);
      })
      .catch((erro) => {
        console.log(erro);
        setLoader(false);
      });
  }, [params.slug]);

  if (loader) {
    return <Loader />;
  }

  return (
    <section>
      <TituloPrincipal titulo={categoria?.nome ?? ''} />
    </section>
  );
};

export default Categoria;
