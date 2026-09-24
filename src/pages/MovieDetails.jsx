import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import tmdbApi from '../api/tmdb';
import styles from './MovieDetails.module.css';

export function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                // Adicionado parâmetro para trazer dados em Português
                const response = await tmdbApi.get(`/movie/${id}`, {
                    params: { language: 'pt-BR' }
                });

                setMovie(response.data);
            } catch (error) {
                console.error('Erro ao buscar detalhes do filme', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    if (loading) return <p className={styles.loadingText}>Carregando dados do filme...</p>;
    if (!movie) return <p className={styles.loadingText}>Filme não encontrado.</p>;

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=Sem+Capa';

    const backdropUrl = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
        : null;

    const title = movie.title || movie.name || 'Título Desconhecido';
    const tagline = movie.tagline;
    const overview = movie.overview || 'Sinopse não disponível em português.';

    const genres = movie.genres?.length ? movie.genres.map((g) => g.name).join(', ') : 'N/A';

    // Evita problema de fuso horário que altera a data de lançamento em 1 dia
    const releaseDate = movie.release_date
        ? new Date(`${movie.release_date}T00:00:00`).toLocaleDateString('pt-BR')
        : 'N/A';

    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    const runtime = movie.runtime ? `${movie.runtime} min` : 'N/A';

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Link to="/" className={styles.backLink}>
                    &larr; Voltar para Explorar
                </Link>

                <div className={styles.content}>
                    <div className={styles.imagesContainer}>
                        <img src={posterUrl} alt={`Pôster de ${title}`} className={styles.poster} />

                        {backdropUrl && (
                            <div>
                                <h4 className={styles.coatTitle}>Imagem de Fundo</h4>
                                <img
                                    src={backdropUrl}
                                    alt={`Cena de ${title}`}
                                    className={styles.backdropImage}
                                />
                            </div>
                        )}
                    </div>

                    <div className={styles.infoContainer}>
                        <h1 className={styles.movieTitle}>{title}</h1>
                        {tagline && <p className={styles.tagline}>"{tagline}"</p>}

                        <div className={styles.badges}>
                            <span className={styles.ratingBadge}>⭐ {rating} / 10</span>
                            <span className={styles.runtimeBadge}>⏱️ {runtime}</span>
                        </div>

                        <div className={styles.overviewSection}>
                            <h3>Sinopse</h3>
                            <p>{overview}</p>
                        </div>

                        <div className={styles.detailsList}>
                            <div className={styles.detailItem}>
                                <strong className={styles.detailLabel}>📅 Lançamento:</strong>{' '}
                                <span className={styles.detailValue}>{releaseDate}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <strong className={styles.detailLabel}>🎬 Gêneros:</strong>{' '}
                                <span className={styles.detailValue}>{genres}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <strong className={styles.detailLabel}>🌐 Idioma Original:</strong>{' '}
                                <span className={styles.detailValue}>
                                    {movie.original_language?.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
