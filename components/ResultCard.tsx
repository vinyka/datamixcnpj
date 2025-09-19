
import React from 'react';
import type { CnpjData } from '../types';

interface ResultCardProps {
  data: CnpjData;
}

const InfoItem: React.FC<{ label: string; value: string | null | undefined }> = ({ label, value }) => (
  <div>
    <p className="text-sm text-brand-subtle">{label}</p>
    <p className="text-md text-brand-text font-medium">{value || 'Não informado'}</p>
  </div>
);

const ResultCard: React.FC<ResultCardProps> = ({ data }) => {
  const { estabelecimento } = data;
  const fullAddress = `${estabelecimento.logradouro}, ${estabelecimento.numero} ${estabelecimento.complemento || ''} - ${estabelecimento.bairro}, ${estabelecimento.cidade.nome} - ${estabelecimento.estado.sigla}, CEP: ${estabelecimento.cep}`;
  const fullPhone = estabelecimento.ddd1 && estabelecimento.telefone1 ? `(${estabelecimento.ddd1}) ${estabelecimento.telefone1}` : null;

  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg p-6 w-full animate-fade-in-up">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-2xl font-bold text-brand-primary">{data.razao_social}</h2>
        {data.nome_fantasia && <p className="text-lg text-brand-subtle">{data.nome_fantasia}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <InfoItem label="CNPJ" value={data.cnpj} />
        <InfoItem label="Situação Cadastral" value={data.situacao_cadastral} />
        <InfoItem label="Data de Início da Atividade" value={new Date(data.data_inicio_atividade).toLocaleDateString('pt-BR')} />
        <InfoItem label="Porte" value={data.porte.descricao} />
        <InfoItem label="Natureza Jurídica" value={data.natureza_juridica.descricao} />
        <InfoItem label="CNAE Principal" value={data.cnae_fiscal_descricao} />
      </div>

      <div className="mt-6 pt-4 border-t">
         <h3 className="text-lg font-semibold text-brand-primary mb-2">Endereço e Contato</h3>
         <div className="space-y-2">
            <InfoItem label="Endereço Completo" value={fullAddress} />
            <InfoItem label="E-mail" value={estabelecimento.email} />
            <InfoItem label="Telefone" value={fullPhone} />
         </div>
      </div>
    </div>
  );
};

export default ResultCard;
