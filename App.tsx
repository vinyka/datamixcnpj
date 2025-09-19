
import React, { useState, useCallback } from 'react';
import { fetchCnpjData } from './services/cnpjService';
import type { CnpjData } from './types';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import ResultCard from './components/ResultCard';

const App: React.FC = () => {
  const [cnpj, setCnpj] = useState<string>('');
  const [companyData, setCompanyData] = useState<CnpjData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Basic mask logic
    const value = e.target.value.replace(/\D/g, '');
    let formattedCnpj = value;
    if (value.length > 2) {
      formattedCnpj = `${value.slice(0, 2)}.${value.slice(2)}`;
    }
    if (value.length > 5) {
      formattedCnpj = `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5)}`;
    }
    if (value.length > 8) {
      formattedCnpj = `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5, 8)}/${value.slice(8)}`;
    }
     if (value.length > 12) {
      formattedCnpj = `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5, 8)}/${value.slice(8, 12)}-${value.slice(12, 14)}`;
    }
    setCnpj(formattedCnpj);
  };

  const handleSearch = useCallback(async () => {
    if (!cnpj) {
      setError('Por favor, digite um CNPJ.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setCompanyData(null);

    try {
      const data = await fetchCnpjData(cnpj);
      setCompanyData(data);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro inesperado.');
    } finally {
      setIsLoading(false);
    }
  }, [cnpj]);
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-in-out; }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-in-out; }
      `}</style>
      
      <main className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-brand-primary">Consulta de CNPJ</h1>
          <p className="text-lg text-brand-subtle mt-2">
            Obtenha informações públicas de empresas brasileiras de forma rápida.
          </p>
        </header>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={cnpj}
              onChange={handleCnpjChange}
              onKeyPress={handleKeyPress}
              placeholder="Digite o CNPJ (ex: 00.000.000/0000-00)"
              className="flex-grow w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition duration-200"
              maxLength={18}
            />
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
            >
              {isLoading ? 'Buscando...' : 'Consultar'}
            </button>
          </div>
        </div>

        <div className="mt-6">
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {companyData && <ResultCard data={companyData} />}
        </div>

        <footer className="text-center mt-12 text-sm text-gray-500">
          <p>Dados fornecidos pela API pública <a href="https://opencnpj.com/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">OpenCNPJ</a>.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
