import { formatRelative } from "../utils/date.js";

export default function DaySelector({ dias, selectedDayId, onSelect, history }) {
  return (
    <nav className="day-selector" aria-label="Selector de día de entrenamiento">
      {dias.map((dia) => {
        const isActive = dia.id === selectedDayId;
        const last = formatRelative(history[dia.id]);
        return (
          <button
            key={dia.id}
            type="button"
            className={`day-chip${isActive ? " is-active" : ""}`}
            onClick={() => onSelect(dia.id)}
            aria-pressed={isActive}
          >
            <span className="day-chip-title">{dia.nombre}</span>
            <span className="day-chip-subtitle">{dia.subtitulo}</span>
            {last && <span className="day-chip-last">{last}</span>}
          </button>
        );
      })}
    </nav>
  );
}
