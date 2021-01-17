import s from "./Timer.module.css";

function Timer({ ms }) {
  return (
    <div>
      <span className={s.timer}>
        {new Date(ms).toISOString().slice(11, 19)}
      </span>
    </div>
  );
}
