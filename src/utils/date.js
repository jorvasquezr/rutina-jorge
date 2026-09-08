const WEEKDAYS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export function getWeekdayName(date = new Date()) {
  return WEEKDAYS[date.getDay()];
}

export function getTodayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getSuggestedDayId(distribucionSemanal, fallbackId) {
  const weekday = getWeekdayName();
  const entry = distribucionSemanal.find((d) => d.diaSemana === weekday);
  return entry?.diaId ?? fallbackId;
}

export function formatRelative(dateKey) {
  if (!dateKey) return null;
  const [y, m, d] = dateKey.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.round((today - date) / 86400000);
  if (diffDays <= 0) return "Hoy";
  if (diffDays === 1) return "Ayer";
  return `Hace ${diffDays} días`;
}
