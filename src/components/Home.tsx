import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => (
  <div className="home">
    <h1>Benvenuto nella Biblioteca Comunale</h1>
    <p>Gestisci i tuoi prestiti e consulta i libri disponibili con facilità.</p>
    <Link to="/registra-prestito" className="cta-button">
      Inizia ora
    </Link>
  </div>
);

export default Home;