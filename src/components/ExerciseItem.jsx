export default function ExerciseItem({ exercise, checked, onToggle, onOpenDetail }) {
  return (
    <li className={`exercise-item${checked ? " is-checked" : ""}`}>
      <button
        type="button"
        className="exercise-check"
        aria-label={checked ? `Marcar "${exercise.nombre}" como no hecho` : `Marcar "${exercise.nombre}" como hecho`}
        aria-pressed={checked}
        onClick={onToggle}
      >
        {checked && <span aria-hidden="true">✓</span>}
      </button>

      <button type="button" className="exercise-info" onClick={onOpenDetail}>
        <span className="exercise-name">{exercise.nombre}</span>
        <span className="exercise-meta">
          {exercise.detalle} · {exercise.series}
        </span>
      </button>

      <span className="exercise-chevron" aria-hidden="true">
        ›
      </span>
    </li>
  );
}
