import React, { useState } from "react";
import { useCreaPrestitoMutation } from "../services/prestitoApi";
import type { SerializedError } from "@reduxjs/toolkit";
import type { PrestitoLibroDto } from "../types/PrestitoLibroDto";
import "./PrestitoForm.css";

const PrestitoForm: React.FC = () => {
  const [creaPrestito, { isLoading, isError }] = useCreaPrestitoMutation();

  const [utente, setUtente] = useState({
    nome: "",
    cognome: "",
    indirizzo: "",
    cellulare: "",
    email: "",
    nomeVolontario: "",
  });

  const [libri, setLibri] = useState([
    { titolo: "", autore: "", numeroInventario: "", collocazione: "" },
  ]);

  const handleUtenteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUtente({ ...utente, [e.target.name]: e.target.value });
  };

  const handleLibroChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const nuoviLibri = [...libri];
    nuoviLibri[index][e.target.name as keyof typeof nuoviLibri[number]] = e.target.value;

    setLibri(nuoviLibri);
  };

  const aggiungiLibro = () => {
    setLibri([...libri, { titolo: "", autore: "", numeroInventario: "", collocazione: "" }]);
  };

  const rimuoviLibro = (index: number) => {
    const nuoviLibri = libri.filter((_, i) => i !== index);
    setLibri(nuoviLibri);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: PrestitoLibroDto = { ...utente, libri };

    try {
      const blob = await creaPrestito(payload).unwrap();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `prestito_${utente.nome}_${utente.cognome}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "data" in err &&
        (err as { data: unknown }).data instanceof Blob
      ) {
        const blob = (err as { data: Blob }).data;
        blob.text().then((text) => console.error("❌ Errore dal backend:", text));
      } else {
        console.error("⚠️ Errore sconosciuto:", err as SerializedError);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="prestito-form">
      <h2>Registra un Prestito</h2>

      {/* Dati utente */}
      <fieldset>
        <legend>Dati Utente</legend>
        {Object.entries(utente).map(([key, value]) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>{key}</label>
            <input
              type="text"
              id={key}
              name={key}
              value={value}
              onChange={handleUtenteChange}
              required
            />
          </div>
        ))}
      </fieldset>

      {/* Libri */}
      <fieldset>
        <legend>Libri</legend>
        {libri.map((libro, index) => (
          <div key={index} className="libro-card">
            <h4>Libro {index + 1}</h4>
            {Object.entries(libro).map(([key, value]) => (
              <div className="form-group" key={key}>
                <label htmlFor={`${key}-${index}`}>{key}</label>
                <input
                  type="text"
                  id={`${key}-${index}`}
                  name={key}
                  value={value}
                  onChange={(e) => handleLibroChange(index, e)}
                  required
                />
              </div>
            ))}
            {libri.length > 1 && (
              <button type="button" onClick={() => rimuoviLibro(index)} className="remove-btn">
                Rimuovi
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={aggiungiLibro} className="add-btn">
          ➕ Aggiungi Libro
        </button>
      </fieldset>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Invio in corso..." : "Salva e Scarica PDF"}
      </button>

      {isError && <p className="error">Errore durante il salvataggio.</p>}
    </form>
  );
};

export default PrestitoForm;
