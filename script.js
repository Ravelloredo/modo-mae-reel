const screens = {
  loading: document.getElementById("loading"),
  detect: document.getElementById("detect"),
  monitor: document.getElementById("monitor"),
  modes: document.getElementById("modes"),
  generation: document.getElementById("generation"),
  teaser: document.getElementById("teaser")
};

const startModeButton = document.getElementById("startModeButton");
const generationButton = document.getElementById("generationButton");
const movementButton = document.getElementById("movementButton");
const bpmNumber = document.getElementById("bpmNumber");
const phoneGlow = document.getElementById("phoneGlow");

let beatInterval = null;
let bpmInterval = null;
let flowTimeouts = [];

function clearFlowTimeouts() {
  flowTimeouts.forEach(clearTimeout);
  flowTimeouts = [];
}

function showScreen(target) {
  Object.values(screens).forEach((screen) => {
    screen.classList.remove("active");
  });

  target.classList.add("active");
}

function pulseGlow() {
  phoneGlow.classList.add("beat");
  setTimeout(() => {
    phoneGlow.classList.remove("beat");
  }, 120);
}

function startHeartbeatEffects() {
  stopHeartbeatEffects();

  beatInterval = setInterval(() => {
    pulseGlow();
  }, 364);

  bpmInterval = setInterval(() => {
    const values = [163, 164, 165, 166, 167];
    const randomValue = values[Math.floor(Math.random() * values.length)];
    bpmNumber.textContent = `${randomValue} BPM`;
  }, 700);
}

function stopHeartbeatEffects() {
  if (beatInterval) {
    clearInterval(beatInterval);
    beatInterval = null;
  }

  if (bpmInterval) {
    clearInterval(bpmInterval);
    bpmInterval = null;
  }
}

function startInitialFlow() {
  clearFlowTimeouts();
  stopHeartbeatEffects();

  bpmNumber.textContent = "165 BPM";

  showScreen(screens.loading);

  flowTimeouts.push(
    setTimeout(() => {
      showScreen(screens.detect);

      flowTimeouts.push(
        setTimeout(() => {
          showScreen(screens.monitor);
          startHeartbeatEffects();
        }, 2000)
      );
    }, 3000)
  );
}

function resetFlow() {
  clearFlowTimeouts();
  stopHeartbeatEffects();
  bpmNumber.textContent = "165 BPM";
  startInitialFlow();
}

startModeButton.addEventListener("click", () => {
  stopHeartbeatEffects();
  showScreen(screens.modes);
});

generationButton.addEventListener("click", () => {
  showScreen(screens.generation);
});

movementButton.addEventListener("click", () => {
  showScreen(screens.teaser);

  flowTimeouts.push(
    setTimeout(() => {
      resetFlow();
    }, 3000)
  );
});

startInitialFlow();