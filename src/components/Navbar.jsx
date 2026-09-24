import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

export function Navbar() {
    const location = useLocation();

    return (
        <nav className={styles.menuNav}>
            <div className={styles.logo}>
                <Link to="/" className={styles.tituloPrincipal}>
                    PobreFlix🎞️
                </Link>
            </div>
            <ul className={styles.navLinks}>
                <li>
                    <Link
                        to="/"
                        className={`${styles.navItem} ${location.pathname === '/' ? styles.active : ''}`}>
                        Catálogo
                    </Link>
                </li>

                <li>
                    <Link
                        to="/favorites"
                        className={`${styles.navItem} ${location.pathname === '/favorites' ? styles.active : ''}`}>
                        Meus Filmes
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
