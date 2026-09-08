export default function InfoModal({ rutina, onClose }) {
  const { info, distribucionSemanal, guiaGeneral } = rutina;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" role="dialog" aria-modal="true" aria-label="Información general" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Información general</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
        </div>

        <div className="modal-body info-body">
          <section>
            <h3>Objetivo</h3>
            <p>{info.objetivo}</p>
            <p>
              <strong>Duración inicial:</strong> {info.duracionInicial}
            </p>
            <p>
              <strong>Descanso general:</strong> {info.descansoGeneral}
            </p>
            <p>
              <strong>Intensidad:</strong> {info.intensidad}
            </p>
          </section>

          <section>
            <h3>Distribución semanal</h3>
            <ul className="modal-list">
              {distribucionSemanal.map((d) => (
                <li key={d.diaSemana}>
                  <strong>{d.diaSemana}:</strong> {d.etiqueta}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Cómo escoger el peso</h3>
            <p>{guiaGeneral.comoEscogerElPeso.texto}</p>
            <ul className="modal-list">
              {guiaGeneral.comoEscogerElPeso.puntos.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
            <p>{guiaGeneral.comoEscogerElPeso.aumentarPeso}</p>
            <p>{guiaGeneral.comoEscogerElPeso.reducirPeso}</p>
          </section>

          <section>
            <h3>Descansos</h3>
            <table className="info-table">
              <tbody>
                {guiaGeneral.descansos.map((d, i) => (
                  <tr key={i}>
                    <td>{d.ejercicio}</td>
                    <td>{d.descanso}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>{guiaGeneral.descansoExtra}</p>
          </section>

          <section>
            <h3>Cardio</h3>
            <p>{guiaGeneral.cardio.texto}</p>
            <ul className="modal-list">
              {guiaGeneral.cardio.niveles.map((n, i) => (
                <li key={i}>
                  <strong>{n.nivel}:</strong> {n.detalle}
                </li>
              ))}
            </ul>
            <p>{guiaGeneral.cardio.nota}</p>
          </section>

          <section>
            <h3>Progresión de cardio</h3>
            <ul className="modal-list">
              {guiaGeneral.progresionCardio.map((p, i) => (
                <li key={i}>
                  <strong>{p.semanas}:</strong> {p.detalle}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Primera semana</h3>
            <p>{guiaGeneral.primeraSemana}</p>
          </section>

          <section>
            <h3>Irritación por sudor</h3>
            <p>{guiaGeneral.irritacionSudor.texto}</p>
            <ul className="modal-list">
              {guiaGeneral.irritacionSudor.puntos.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
            <ul className="modal-list">
              {guiaGeneral.irritacionSudor.extra.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Duración de esta rutina</h3>
            <p>{guiaGeneral.duracionRutina}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
