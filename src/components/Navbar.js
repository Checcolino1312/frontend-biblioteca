import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from 'react-router-dom';
import './Navbar.css';
const Navbar = () => (_jsxs("nav", { className: "navbar", children: [_jsx(NavLink, { to: "/", end: true, className: "navbar-brand", children: "\uD83D\uDCDA Biblioteca" }), _jsxs("ul", { className: "navbar-links", children: [_jsx("li", { children: _jsx(NavLink, { to: "/", end: true, children: "Home" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/libri-in-giro", children: "Libri in giro" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/registra-prestito", children: "Registra un prestito" }) })] })] }));
export default Navbar;