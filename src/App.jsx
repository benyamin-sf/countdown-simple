import { useEffect } from "react";

import Timer from "./Timer";

function App() {
  useEffect(() => {
    const duration = document.getElementById("duration-input");
    const start = document.getElementById("start");
    const pause = document.getElementById("pause");
    const circleTimer = document.getElementById("timer-svg");

    new Timer(duration, start, pause, circleTimer);
  }, []);

  return (
    <section
      id="timer-box"
      className="flex h-[40rem] w-[45rem] flex-col items-center justify-center gap-y-32 overflow-hidden rounded-[25px] bg-white-opaque--heavy shadow-base backdrop-blur-3xl transition duration-300 ease-in hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-base-dark"
    >
      <svg className="h-[30rem] w-[30rem]">
        <circle
          id="timer-svg"
          className="fill-transparent stroke-primary--dark-1 stroke-[8] transition-colors duration-500"
          r="125"
          cx="110"
          cy="150"
          strokeDasharray="785.39"
          strokeDashoffset="0"
          transform="rotate(-90 120 120)"
        />
      </svg>

      <input
        id="duration-input"
        type="number"
        min="0"
        // value="0"
        className="absolute top-[14.5rem] h-28 w-56 rounded-xl border-none bg-white-opaque--heavy text-center text-7xl text-black focus:outline-2 focus:outline-primary--tint-1"
      />

      <div className="absolute top-[31rem] flex gap-x-64">
        <button id="start" className="btn">
          Start
        </button>
        <button id="pause" className="btn">
          Pause
        </button>
      </div>
    </section>
  );
}

export default App;
