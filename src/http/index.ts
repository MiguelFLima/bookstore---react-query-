import axios from 'axios';
import { ICategoria } from '../interfaces/ICategoria';
import { ILivro } from '../interfaces/ILivro';

const http = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    Accept: 'application/json',
    Content: 'application/json',
  },
});

http.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = sessionStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    console.log('Erro no interceptor do axios');
    return Promise.reject(error);
  }
);

export default http;

export const obterCategoriaPorSlug = async (slug: string) => {
  const resposta = await http.get<ICategoria[]>('categorias', {
    params: {
      slug: slug,
    },
  });

  return resposta.data[0];
};

// export const obterMaisVendidos = async () => {
//   const resposta = await http.get<ILivro[]>('public/mais-vendidos');

//   return resposta.data;
// };

// export const obterLancamentos = async () => {
//   const resposta = await http.get<ILivro[]>('public/lancamentos');

//   return resposta.data;
// };

export const obterLivrosDestaque = async (tipo: string) => {
  const resposta = await http.get<ILivro[]>(`public/${tipo}`);
  return resposta.data;
};

export const obterLivrosDaCategoria = async (categoria: ICategoria) => {
  const resposta = await http.get<ILivro[]>('livros', {
    params: {
      categoria: categoria.id,
    },
  });

  return resposta.data;
};

export const obterUmLivro = async (slug: string) => {
  const resposta = await http.get<ILivro[]>('livros', {
    params: {
      slug: slug,
    },
  });

  return resposta.data[0];
};

export const obterUmAutor = async (slug: string) => {
  const resposta = await http.get<ILivro[]>('livros', {
    params: {
      slug: slug,
    },
  });

  let autorId = resposta.data[0].autor;

  const autor = await http.get(`autores/${autorId}`, {});

  return autor.data;
};
