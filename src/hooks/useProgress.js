import { useCallback, useEffect, useState } from "react";

const PROGRESS_KEY = "rutina_progress_v1";
const HISTORY_KEY = "rutina_history_v1";

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage no disponible (modo privado, cuota llena, etc.): se ignora.
  }
}

// El progreso se guarda por fecha (todayKey), así que cada vez que vuelves a
// entrenar un día (p.ej. "Día 1" la semana siguiente) el checklist empieza limpio.
export function useProgress(todayKey) {
  const [progress, setProgress] = useState(() => readJSON(PROGRESS_KEY, {}));
  const [history, setHistory] = useState(() => readJSON(HISTORY_KEY, {}));

  useEffect(() => writeJSON(PROGRESS_KEY, progress), [progress]);
  useEffect(() => writeJSON(HISTORY_KEY, history), [history]);

  const isChecked = useCallback(
    (dayId, exId) => Boolean(progress[todayKey]?.[dayId]?.includes(exId)),
    [progress, todayKey]
  );

  const countChecked = useCallback(
    (dayId) => progress[todayKey]?.[dayId]?.length ?? 0,
    [progress, todayKey]
  );

  const toggle = useCallback(
    (dayId, exId, allExerciseIds) => {
      setProgress((prev) => {
        const current = prev[todayKey]?.[dayId] ?? [];
        const next = current.includes(exId)
          ? current.filter((id) => id !== exId)
          : [...current, exId];

        if (allExerciseIds.length > 0 && allExerciseIds.every((id) => next.includes(id))) {
          setHistory((prevHistory) => ({ ...prevHistory, [dayId]: todayKey }));
        }

        return { ...prev, [todayKey]: { ...prev[todayKey], [dayId]: next } };
      });
    },
    [todayKey]
  );

  const resetDay = useCallback(
    (dayId) => {
      setProgress((prev) => ({ ...prev, [todayKey]: { ...prev[todayKey], [dayId]: [] } }));
    },
    [todayKey]
  );

  return { isChecked, toggle, resetDay, countChecked, history };
}
