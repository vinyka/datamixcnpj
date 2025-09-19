
import type { CnpjData } from '../types';

const API_BASE_URL = 'https://publica.cnpj.ws/cnpj';

export const fetchCnpjData = async (cnpj: string): Promise<CnpjData> => {
  const cleanedCnpj = cnpj.replace(/\D/g, ''); // Remove non-digit characters

  if (cleanedCnpj.length !== 14) {
    throw new Error('O CNPJ deve ter 14 dígitos.');
  }

  const response = await fetch(`${API_BASE_URL}/${cleanedCnpj}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('CNPJ não encontrado. Verifique o número digitado.');
    }
    throw new Error('Falha ao buscar os dados do CNPJ. Tente novamente.');
  }

  const data: CnpjData = await response.json();
  return data;
};
