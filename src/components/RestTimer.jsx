import { useEffect, useRef, useState } from "react";

const ADJUST_STEP_SEC = 5;

function parseSeconds(descanso) {
  const nums = descanso?.match(/\d+/g)?.map(Number) ?? [];
  return nums.length ? Math.max(...nums) : 60;
}

function formatTime(ms) {
  const totalSeconds = Math.ceil(ms / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

// Tono generado con Web Audio API (sin archivo de audio externo). El
// AudioContext se crea/reanuda dentro del gesto de "Iniciar" (requisito de
// Safari/iOS para permitir audio); una vez desbloqueado, puede sonar más
// tarde -cuando el cronómetro llega a cero- sin necesitar un nuevo gesto.
function playBeep(ctx) {
  const now = ctx.currentTime;
  for (let i = 0; i < 3; i++) {
    const start = now + i * 0.35;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.35, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.3);
    osc.connect(gain).connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.32);
  }
  if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200]);
}

export default function RestTimer({ descanso }) {
  const durationSecInicial = parseSeconds(descanso);
  const [durationSec, setDurationSec] = useState(durationSecInicial);
  const [remainingMs, setRemainingMs] = useState(durationSecInicial * 1000);
  const [running, setRunning] = useState(false);

  const endTimeRef = useRef(null);
  const intervalRef = useRef(null);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      audioCtxRef.current?.close?.();
    };
  }, []);

  function tick() {
    const msLeft = Math.max(0, endTimeRef.current - Date.now());
    setRemainingMs(msLeft);
    if (msLeft <= 0) {
      clearInterval(intervalRef.current);
      setRunning(false);
      if (audioCtxRef.current) playBeep(audioCtxRef.current);
    }
  }

  function handleStart() {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }

    const startMs = remainingMs > 0 ? remainingMs : durationSec * 1000;
    endTimeRef.current = Date.now() + startMs;
    setRemainingMs(startMs);
    setRunning(true);
    intervalRef.current = setInterval(tick, 250);
  }

  function handlePause() {
    clearInterval(intervalRef.current);
    setRunning(false);
  }

  function handleReset() {
    clearInterval(intervalRef.current);
    setRunning(false);
    setRemainingMs(durationSec * 1000);
  }

  function adjust(deltaSec) {
    const newDuration = Math.max(5, durationSec + deltaSec);
    setDurationSec(newDuration);
    setRemainingMs(newDuration * 1000);
  }

  const isFresh = remainingMs === durationSec * 1000;
  const isDone = !running && remainingMs <= 0;
  const mainLabel = running ? "Pausar" : !isFresh && !isDone ? "Continuar" : "Iniciar";

  return (
    <div className={`rest-timer${isDone ? " is-done" : ""}`}>
      <span className="rest-timer-label">Descanso{descanso ? ` (${descanso})` : ""}</span>
      <div className="rest-timer-display">{formatTime(remainingMs)}</div>
      <div className="rest-timer-controls">
        <button
          type="button"
          className="timer-btn"
          onClick={() => adjust(-ADJUST_STEP_SEC)}
          disabled={running}
          aria-label="Restar 5 segundos"
        >
          −5s
        </button>
        <button
          type="button"
          className="timer-btn timer-btn-main"
          onClick={running ? handlePause : handleStart}
        >
          {mainLabel}
        </button>
        <button
          type="button"
          className="timer-btn"
          onClick={() => adjust(ADJUST_STEP_SEC)}
          disabled={running}
          aria-label="Sumar 5 segundos"
        >
          +5s
        </button>
      </div>
      {!isFresh && (
        <button type="button" className="link-btn" onClick={handleReset}>
          Reiniciar cronómetro
        </button>
      )}
    </div>
  );
}
