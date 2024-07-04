import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CommonStyles.css'; // Importa o arquivo de estilos comuns

const PesquisarMedicos = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // Aqui você pode enviar a consulta de pesquisa para o backend ou fazer ações necessárias
        console.log('Pesquisando médicos por:', searchQuery);
        // Exemplo: navigate('/resultado-pesquisa-medicos') para uma página de resultados
    };

    return (
        <div className="container">
            <h2>Pesquisar Médicos</h2>
            <form onSubmit={handleSearch} className="form">
                <div className="form-group">
                    <label htmlFor="searchQuery">Nome ou CRM:</label>
                    <input
                        type="text"
                        id="searchQuery"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <button type="submit" className="btn-submit">Pesquisar</button>
            </form>
        </div>
    );
};

export default PesquisarMedicos;
