// src/utils/formatador-moeda.ts
export const formatador = Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
});
