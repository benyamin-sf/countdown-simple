export default class {
  constructor(durationInput, startBtn, pauseBtn, timerSvg) {
    this.durationInput = durationInput;
    this.startBtn = startBtn;
    this.pauseBtn = pauseBtn;
    this.timerSvg = timerSvg;
    this.ctArea = parseFloat(window.getComputedStyle(timerSvg).strokeDasharray);
    this.circleTimerStyle = timerSvg.style;
    this.interval = null;
    this.paused = false;
    this.tickRate;

    // Event Listeners
    this.startBtn.addEventListener("click", this.start.bind(this));
    this.pauseBtn.addEventListener("click", this.pause.bind(this));
    this.durationInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.start();
    });

    this.pauseBtn.classList.add("disabled-btn");
  }

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time;
  }

  start() {
    if (typeof this.timeRemaining === "number") {
      // changing styles
      document.body.classList.remove("body-finish");
      this.timerSvg.classList.remove("timer-finish");
      document.body.classList.add("body-start");
      this.timerSvg.classList.add("timer-start");
      this.pauseBtn.classList.remove("disabled-btn");
      this.startBtn.classList.add("disabled-btn");

      if (this.paused) {
        this.startBtn.innerText = "Start";
      }

      if (!this.tickRate)
        this.tickRate =
          this.ctArea / parseFloat(this.durationInput.value) / 100;

      this.tick();

      if (this.paused || !this.interval) {
        this.interval = setInterval(() => this.tick(), 10);
        this.paused = false;
      }
    }
  }

  pause() {
    this.paused = true;
    this.startBtn.classList.remove("disabled-btn");
    this.pauseBtn.classList.add("disabled-btn");
    if (this.interval) {
      clearInterval(this.interval);
      if (this.timeRemaining !== 0) this.startBtn.innerText = "Resume";
    }
  }

  tick() {
    let time = this.timeRemaining;
    if (time <= 0) {
      // changing styles
      document.body.classList.replace("body-start", "body-finish");
      this.timerSvg.classList.replace("timer-start", "timer-finish");

      this.pause();
      this.circleTimerStyle.strokeDashoffset = 0;
      this.tickRate = 0;
      this.interval = null;
      this.paused = false;
      this.durationInput.focus();
    } else {
      time -= 0.01;
      this.circleTimerStyle.strokeDashoffset -= this.tickRate;
    }
    if (time >= 0) this.timeRemaining = time.toFixed(2);
  }
}
