import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import './Home.css';
const Home = () => (_jsxs("div", { className: "home", children: [_jsx("h1", { children: "Benvenuto nella Biblioteca Comunale" }), _jsx("p", { children: "Gestisci i tuoi prestiti e consulta i libri disponibili con facilit\u00E0." }), _jsx(Link, { to: "/registra-prestito", className: "cta-button", children: "Inizia ora" })] }));
export default Home;