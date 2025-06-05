import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useCreaPrestitoMutation } from "../services/prestitoApi";
import "./PrestitoForm.css";
const PrestitoForm = () => {
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
    const handleUtenteChange = (e) => {
        setUtente({ ...utente, [e.target.name]: e.target.value });
    };
    const handleLibroChange = (index, e) => {
        const nuoviLibri = [...libri];
        nuoviLibri[index][e.target.name] = e.target.value;
        setLibri(nuoviLibri);
    };
    const aggiungiLibro = () => {
        setLibri([...libri, { titolo: "", autore: "", numeroInventario: "", collocazione: "" }]);
    };
    const rimuoviLibro = (index) => {
        const nuoviLibri = libri.filter((_, i) => i !== index);
        setLibri(nuoviLibri);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { ...utente, libri };
        try {
            const blob = await creaPrestito(payload).unwrap();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `prestito_${utente.nome}_${utente.cognome}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
        catch (err) {
            if (typeof err === "object" &&
                err !== null &&
                "data" in err &&
                err.data instanceof Blob) {
                const blob = err.data;
                blob.text().then((text) => console.error("❌ Errore dal backend:", text));
            }
            else {
                console.error("⚠️ Errore sconosciuto:", err);
            }
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "prestito-form", children: [_jsx("h2", { children: "Registra un Prestito" }), _jsxs("fieldset", { children: [_jsx("legend", { children: "Dati Utente" }), Object.entries(utente).map(([key, value]) => (_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: key, children: key }), _jsx("input", { type: "text", id: key, name: key, value: value, onChange: handleUtenteChange, required: true })] }, key)))] }), _jsxs("fieldset", { children: [_jsx("legend", { children: "Libri" }), libri.map((libro, index) => (_jsxs("div", { className: "libro-card", children: [_jsxs("h4", { children: ["Libro ", index + 1] }), Object.entries(libro).map(([key, value]) => (_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: `${key}-${index}`, children: key }), _jsx("input", { type: "text", id: `${key}-${index}`, name: key, value: value, onChange: (e) => handleLibroChange(index, e), required: true })] }, key))), libri.length > 1 && (_jsx("button", { type: "button", onClick: () => rimuoviLibro(index), className: "remove-btn", children: "Rimuovi" }))] }, index))), _jsx("button", { type: "button", onClick: aggiungiLibro, className: "add-btn", children: "\u2795 Aggiungi Libro" })] }), _jsx("button", { type: "submit", disabled: isLoading, children: isLoading ? "Invio in corso..." : "Salva e Scarica PDF" }), isError && _jsx("p", { className: "error", children: "Errore durante il salvataggio." })] }));
};
export default PrestitoForm;
