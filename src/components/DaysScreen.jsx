import { formatRelative } from "../utils/date.js";

export default function DaysScreen({ dias, suggestedDayId, history, countChecked, onSelect }) {
  return (
    <ul className="days-list">
      {dias.map((dia) => {
        const total = dia.ejercicios.length;
        const doneToday = countChecked(dia.id);
        const isSuggested = dia.id === suggestedDayId;
        const last = formatRelative(history[dia.id]);

        return (
          <li key={dia.id}>
            <button type="button" className="day-card" onClick={() => onSelect(dia.id)}>
              <div className="day-card-main">
                <span className="day-card-title">{dia.nombre}</span>
                <span className="day-card-subtitle">{dia.subtitulo}</span>
                {doneToday > 0 ? (
                  <span className="day-card-status is-progress">
                    {doneToday}/{total} hoy
                  </span>
                ) : (
                  isSuggested && <span className="day-card-status is-suggested">Sugerido para hoy</span>
                )}
                {doneToday === 0 && last && <span className="day-card-last">Último: {last}</span>}
              </div>
              <span className="day-card-chevron" aria-hidden="true">
                ›
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
