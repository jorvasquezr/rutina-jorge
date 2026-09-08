export default function DetailModal({ exercise, onClose }) {
  const videoSearchUrl = exercise.videoQuery
    ? `https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.videoQuery)}`
    : null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" role="dialog" aria-modal="true" aria-label={exercise.nombre} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{exercise.nombre}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-meta">
            {exercise.detalle} · {exercise.series}
            {exercise.descanso ? ` · Descanso ${exercise.descanso}` : ""}
          </p>

          {exercise.indicaciones?.length > 0 && (
            <ul className="modal-list">
              {exercise.indicaciones.map((linea, i) => (
                <li key={i}>{linea}</li>
              ))}
            </ul>
          )}

          {videoSearchUrl && (
            <a
              className="video-link"
              href={videoSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span aria-hidden="true">▶</span>
              Ver ejemplos en YouTube
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
