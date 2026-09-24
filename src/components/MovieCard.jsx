import { Link } from 'react-router-dom';
import styles from './MovieCard.module.css';

export function MovieCard({ movie, onToggleFavorite, isFavorite }) {
    const imageUrl = movie?.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=Sem+Capa';

    const title = movie?.title || movie?.name || 'Título Desconhecido';

    const genre = movie?.genres?.[0]?.name || movie?.genre_names?.[0] || 'Sem gênero';

    return (
        <div className={styles['Movie-card']}>
            <div className={styles['image-container']}>
                <img src={imageUrl} alt={title} />
                <button
                    className={styles['favorite-btn']}
                    onClick={(e) => {
                        e.preventDefault();
                        onToggleFavorite?.(movie);
                    }}
                    title={isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos favoritos'}>
                    {isFavorite ? '★' : '☆'}
                </button>
                <div className={styles.overlay}>
                    <h3>{title}</h3>
                    <p>{genre}</p>
                    <Link to={`/filme/${movie?.id}`} className={styles['details-btn']}>
                        Ver Detalhes
                    </Link>
                </div>
            </div>
        </div>
    );
}
