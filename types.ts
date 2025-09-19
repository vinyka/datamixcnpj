
export interface CnpjData {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string | null;
  data_inicio_atividade: string;
  situacao_cadastral: string;
  cnae_fiscal_descricao: string;
  porte: {
    descricao: string;
  };
  natureza_juridica: {
    descricao: string;
  };
  estabelecimento: {
    tipo: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    ddd1: string;
    telefone1: string;
    email: string;
    cidade: {
      nome: string;
    };
    estado: {
      sigla: string;
    };
  };
}
