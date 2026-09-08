import { useMemo, useState } from "react";
import rutina from "./data/rutina.js";
import { useProgress } from "./hooks/useProgress.js";
import { getSuggestedDayId, getTodayKey } from "./utils/date.js";
import DaySelector from "./components/DaySelector.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import ExerciseList from "./components/ExerciseList.jsx";
import DetailModal from "./components/DetailModal.jsx";
import InfoModal from "./components/InfoModal.jsx";

const SELECTED_DAY_KEY = "rutina_selected_day_v1";

function getInitialDayId() {
  const stored = localStorage.getItem(SELECTED_DAY_KEY);
  if (stored && rutina.dias.some((d) => d.id === stored)) return stored;
  return getSuggestedDayId(rutina.distribucionSemanal, rutina.dias[0].id);
}

export default function App() {
  const todayKey = useMemo(() => getTodayKey(), []);
  const [selectedDayId, setSelectedDayId] = useState(getInitialDayId);
  const [detailExercise, setDetailExercise] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);

  const { isChecked, toggle, resetDay, countChecked, history } = useProgress(todayKey);

  const day = rutina.dias.find((d) => d.id === selectedDayId) ?? rutina.dias[0];
  const allExerciseIds = useMemo(() => day.ejercicios.map((e) => e.id), [day]);

  function handleSelectDay(dayId) {
    setSelectedDayId(dayId);
    localStorage.setItem(SELECTED_DAY_KEY, dayId);
  }

  function handleResetDay() {
    if (window.confirm(`¿Reiniciar el progreso de hoy en "${day.nombre}"?`)) {
      resetDay(day.id);
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <h1>{rutina.titulo}</h1>
        <button
          type="button"
          className="icon-btn"
          onClick={() => setInfoOpen(true)}
          aria-label="Información general de la rutina"
        >
          ℹ️
        </button>
      </header>

      <DaySelector
        dias={rutina.dias}
        selectedDayId={selectedDayId}
        onSelect={handleSelectDay}
        history={history}
      />

      <main className="main">
        <div className="day-header">
          <h2>{day.nombre}</h2>
          <p>{day.subtitulo}</p>
        </div>

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

      {detailExercise && (
        <DetailModal exercise={detailExercise} onClose={() => setDetailExercise(null)} />
      )}

      {infoOpen && <InfoModal rutina={rutina} onClose={() => setInfoOpen(false)} />}
    </div>
  );
}
