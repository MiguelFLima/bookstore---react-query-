import './titulo.css';

interface TituloPrincipalProps {
  titulo: string;
}

const TituloPrincipal = ({ titulo }: TituloPrincipalProps) => {
  return <h1 className="titulo">{titulo}</h1>;
};

export default TituloPrincipal;
