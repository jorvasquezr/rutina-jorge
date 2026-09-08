import { useMemo, useState } from "react";
import rutina from "./data/rutina.js";
import { useProgress } from "./hooks/useProgress.js";
import { getSuggestedDayId, getTodayKey } from "./utils/date.js";
import DaysScreen from "./components/DaysScreen.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import ExerciseList from "./components/ExerciseList.jsx";
import DetailModal from "./components/DetailModal.jsx";
import InfoModal from "./components/InfoModal.jsx";

export default function App() {
  const todayKey = useMemo(() => getTodayKey(), []);
  const suggestedDayId = useMemo(
    () => getSuggestedDayId(rutina.distribucionSemanal, rutina.dias[0].id),
    []
  );

  // selectedDayId === null → estamos en la pantalla de selección de día.
  const [selectedDayId, setSelectedDayId] = useState(null);
  const [detailExercise, setDetailExercise] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);

  const { isChecked, toggle, resetDay, countChecked, history } = useProgress(todayKey);

  const day = rutina.dias.find((d) => d.id === selectedDayId) ?? null;
  const allExerciseIds = useMemo(() => day?.ejercicios.map((e) => e.id) ?? [], [day]);

  function handleResetDay() {
    if (window.confirm(`¿Reiniciar el progreso de hoy en "${day.nombre}"?`)) {
      resetDay(day.id);
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-left">
          {day && (
            <button
              type="button"
              className="icon-btn"
              onClick={() => setSelectedDayId(null)}
              aria-label="Volver a los días"
            >
              ‹
            </button>
          )}
          <h1>{day ? day.nombre : rutina.titulo}</h1>
        </div>
        <button
          type="button"
          className="icon-btn"
          onClick={() => setInfoOpen(true)}
          aria-label="Información general de la rutina"
        >
          ℹ️
        </button>
      </header>

      {!day ? (
        <DaysScreen
          dias={rutina.dias}
          suggestedDayId={suggestedDayId}
          history={history}
          countChecked={countChecked}
          onSelect={setSelectedDayId}
        />
      ) : (
        <main className="main">
          <p className="day-subtitle">{day.subtitulo}</p>

          <ProgressBar
            done={countChecked(day.id)}
            total={allExerciseIds.length}
            onReset={handleResetDay}
          />

          <ExerciseList
            day={day}
            isChecked={isChecked}
            onToggle={(exId) => toggle(day.id, exId, allExerciseIds)}
            onOpenDetail={setDetailExercise}
          />
        </main>
      )}

      {detailExercise && (
        <DetailModal
          key={detailExercise.id}
          exercise={detailExercise}
          onClose={() => setDetailExercise(null)}
        />
      )}

      {infoOpen && <InfoModal rutina={rutina} onClose={() => setInfoOpen(false)} />}
    </div>
  );
}
