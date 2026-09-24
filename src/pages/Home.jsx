import { useEffect, useState } from 'react';
import tmdb from '../api/tmdb.js';
import { MovieCard } from '../components/MovieCard.jsx';
import { useFavorites } from '../hooks/useFavorites.js';
import styles from './Home.module.css';

const GENRES = [
    { id: 'popular', name: 'Populares', endpoint: '/movie/popular' },
    { id: '28', name: 'Ação', endpoint: '/discover/movie', params: { with_genres: 28 } },
    { id: '35', name: 'Comédia', endpoint: '/discover/movie', params: { with_genres: 35 } },
    { id: '18', name: 'Drama', endpoint: '/discover/movie', params: { with_genres: 18 } },
    { id: '10749', name: 'Romance', endpoint: '/discover/movie', params: { with_genres: 10749 } },
    {
        id: '878',
        name: 'Ficção Científica',
        endpoint: '/discover/movie',
        params: { with_genres: 878 },
    },
    {
        id: '10751',
        name: 'Infantil',
        endpoint: '/discover/movie',
        params: { with_genres: '16,10751' },
    },
];

export function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(GENRES[0]);

    // 🟢 Estados para controlo da paginação
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { isFavorite, toggleFavorite } = useFavorites();

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                // Passa os parâmetros da requisição incluindo a página atual
                const response = await tmdb.get(activeTab.endpoint, {
                    params: {
                        ...(activeTab.params || {}),
                        page: page, // Envia o número da página para a API
                    },
                });

                setMovies(response.data.results || []);
                // O TMDB limita o máximo a 500 páginas na API
                setTotalPages(
                    response.data.total_pages ? Math.min(response.data.total_pages, 500) : 1,
                );
            } catch (error) {
                console.error('Erro ao buscar filmes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [activeTab, page]);

    // 🟢 Muda de categoria e reinicia para a página 1
    const handleTabChange = (genre) => {
        setActiveTab(genre);
        setPage(1);
    };

    // 🟢 Função para mudar de página e subir para o topo
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="home-page">
            <div className={styles.tabsContainer}>
                {GENRES.map((discover) => (
                    <button
                        key={discover.id}
                        className={`${styles.tabBtn} ${activeTab.id === discover.id ? styles.active : ''}`}
                        onClick={() => handleTabChange(discover)}>
                        {discover.name}
                    </button>
                ))}
            </div>

            <h1 className={styles.title}>Explorando: {activeTab.name}</h1>

            {loading ? (
                <p className={styles.grid}>Carregando filmes...</p>
            ) : (
                <div className={styles.grid}>
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            isFavorite={isFavorite(movie.id)}
                            onToggleFavorite={toggleFavorite}
                        />
                    ))}
                </div>
            )}

            {/* Controlo de Paginação */}
            <div className={styles.paginationContainer}>
                <button
                    className={styles.pageBtn}
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}>
                    ←
                </button>

                <span className={styles.pageInfo}>
                    Página {page} de {totalPages}
                </span>

                <button
                    className={styles.pageBtn}
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= totalPages}>
                    →
                </button>
            </div>
        </div>
    );
}
