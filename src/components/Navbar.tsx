import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => (
  <nav className="navbar">
    <NavLink to="/" end className="navbar-brand">
      📚 Biblioteca
    </NavLink>
    <ul className="navbar-links">
      <li>
        <NavLink to="/" end>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/libri-in-giro">
          Libri in giro
        </NavLink>
      </li>
      <li>
        <NavLink to="/registra-prestito">
          Registra un prestito
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navbar;