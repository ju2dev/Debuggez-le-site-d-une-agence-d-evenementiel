import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Verif existence `data.focus`
  const byDateDesc = data?.focus
    ? [...data.focus].sort((evtA, evtB) =>
        new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
      )
    : []; // Si `data.focus` est vide ou non défini, on retourne un tableau vide.

  // Ajout de `clearTimeout` pour éviter l'accumulation de timeouts.
  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex(index < byDateDesc.length - 1 ? index + 1 : 0);
    }, 5000);

    // Nettoyage du timeout précédent à chaque rendu.
    return () => clearTimeout(timer);
  }, [index, byDateDesc.length]); // Ajout des dépendances `index` et `byDateDesc.length`.

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        // On utilise `event.id` si disponible, ou l'index `idx` comme dernier recours.
        <div key={event.id || idx}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          {index === idx && (  // si index -> à idx 
            <div className="SlideCard__paginationContainer">
              <div className="SlideCard__pagination">
                {byDateDesc.map((eventslide, radioIdx) => (
                  <input
                    key={`${eventslide.id || radioIdx}`} // On combine `id` ou `radioIdx` pour assurer l'unicité.
                    type="radio"
                    name="radio-button"
                    checked={idx === radioIdx}
                    readOnly
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Slider;
