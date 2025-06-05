import React from 'react';
import { useGetLibriInGiroQuery } from './services/prestitoApi';
import { Libro } from './types/Libro';
import './libri.css'; // se hai uno stile personalizzato

const LibriInGiro = () => {
  const { data: libri, isLoading, isError } = useGetLibriInGiroQuery();

  return (
    <div className="container">
      <h1>📚 Libri attualmente in prestito</h1>

      {isLoading && <p className="message">Caricamento in corso...</p>}
      {isError && <p className="message" style={{ color: 'red' }}>Errore durante il caricamento.</p>}

      {!isLoading && !isError && (
        <table>
          <thead>
            <tr>
              <th>Titolo</th>
              <th>Autore</th>
              <th>Inventario</th>
              <th>Collocazione</th>
              <th>Lettore</th>
              <th>Data Inizio</th>
              <th>Data Fine</th>
            </tr>
          </thead>
          <tbody>
            {libri?.map((libro: Libro, index: number) => (
              <tr key={index}>
                <td>{libro.titolo}</td>
                <td>{libro.autore}</td>
                <td>{libro.numeroInventario}</td>
                <td>{libro.collocazione}</td>
                <td>{libro.nome} {libro.cognome}</td>
                <td>{new Date(libro.dataInizioPrestito).toLocaleDateString()}</td>
                <td>{new Date(libro.dataFinePrestito).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LibriInGiro;
