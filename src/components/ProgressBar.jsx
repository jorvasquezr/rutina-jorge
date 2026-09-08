export default function ProgressBar({ done, total, onReset }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const isComplete = total > 0 && done === total;

  return (
    <div className="progress">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="progress-row">
        <span className="progress-label">
          {isComplete ? "¡Día completado! 🎉" : `${done} / ${total} ejercicios`}
        </span>
        {done > 0 && (
          <button type="button" className="link-btn" onClick={onReset}>
            Reiniciar día
          </button>
        )}
      </div>
    </div>
  );
}
