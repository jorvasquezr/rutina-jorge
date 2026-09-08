import ExerciseItem from "./ExerciseItem.jsx";

export default function ExerciseList({ day, isChecked, onToggle, onOpenDetail }) {
  return (
    <ul className="exercise-list">
      {day.ejercicios.map((ex) => (
        <ExerciseItem
          key={ex.id}
          exercise={ex}
          checked={isChecked(day.id, ex.id)}
          onToggle={() => onToggle(ex.id)}
          onOpenDetail={() => onOpenDetail(ex)}
        />
      ))}
    </ul>
  );
}
