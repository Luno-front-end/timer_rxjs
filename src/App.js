import { useEffect, useState } from "react";
import { interval, fromEvent } from "rxjs";
import { filter, buffer } from "rxjs/operators";

import Container from "./components/Container/Container";
import Timer from "./components/Timer/Timer";
import sBtn from "./components/Button/Button.module.css";
import s from "./components/Timer/Timer.module.css";

const timer$ = interval(1000);

function App() {
  const [ms, setMs] = useState(0);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      const sub = timer$.subscribe(() => setMs((state) => state + 1000));
      return () => sub.unsubscribe();
    }
  }, [isActive, ms]);

  useEffect(() => {
    const btnEl = document.getElementById("dubleClickMe");

    const click$ = fromEvent(btnEl, "click")
      .pipe(
        buffer(interval(300)),
        filter((clicks) => clicks.length === 2)
      )
      .subscribe(() => pauseTimer());
    return () => click$.unsubscribe();
  }, []);

  const startTimer = () => timer$.subscribe(setIsActive(true));

  const pauseTimer = () => timer$.subscribe(setIsActive(false));

  const resetTimer = () => timer$.subscribe(setMs(0));

  const stopTimer = () => {
    resetTimer();
    pauseTimer();
  };

  return (
    <Container>
      <Timer ms={ms} />

      <div className={s.containerBtn}>
        <button
          className={sBtn.button}
          onClick={isActive ? stopTimer : startTimer}
        >
          {isActive ? `STOP` : `START`}
        </button>

        <button className={sBtn.button} id="dubleClickMe" disabled={!isActive}>
          Wait
        </button>

        <button
          className={sBtn.button}
          onClick={resetTimer}
          disabled={!isActive}
        >
          Reset
        </button>
      </div>
    </Container>
  );
}

export default App;
